"use client";

import { z } from "zod";
import Link from "next/link";
import Image from "next/image";

import { auth } from "@/firebase/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { signIn, signUp } from "@/lib/actions/auth.action";
import FormField from "./FormField";
import toast from "react-hot-toast";

const authFormSchema = (type: FormType) =>
    z.object({
        name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(3),
    });

const AuthForm = ({ type }: { type: FormType }) => {
    const router = useRouter();
    const formSchema = authFormSchema(type);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            if (type === "sign-up") {
                const { name, email, password } = data;
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                const result = await signUp({
                    uid: userCredential.user.uid,
                    name: name!,
                    email,
                    password,
                });

                if (!result.success) {
                    toast.error(result.message);
                    return;
                }

                toast.success("Account created successfully. Please sign in.");
                router.push("/hr-interviews/sign-in");
            } else {
                const { email, password } = data;
                const userCredential = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                const idToken = await userCredential.user.getIdToken();
                if (!idToken) {
                    toast.error("Sign in Failed. Please try again.");
                    return;
                }

                await signIn({ email, idToken });
                toast.success("Signed in successfully.");
                router.push("/hr-interviews");
            }
        } catch (error) {
            console.error(error);
            toast.error(`There was an error: ${error}`);
        }
    };

    const isSignIn = type === "sign-in";

    return (
        <div className="bg-gradient-to-b from-gray-200 to-gray-100 dark:from-[#2B2B2B] dark:to-[#1C1C1C] p-1 rounded-2xl shadow-xl flex-1 sm:basis-1/2 w-full h-auto lg:min-w-[566px] transition-all duration-300">
            <div className="bg-white dark:bg-[#121212] rounded-2xl p-8 sm:p-10 flex flex-col gap-6">
                <div className="flex justify-center items-center gap-2">
                    <Image
                        src="/logo.png"
                        alt="logo"
                        height={36}
                        width={42}
                        className="drop-shadow-lg"
                    />
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Astra Learn</h2>
                </div>

                <h3 className="text-center text-lg font-medium text-gray-700 dark:text-gray-300">
                    Practice job interviews with AI
                </h3>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6 w-full"
                    >
                        {!isSignIn && (
                            <FormField
                                control={form.control}
                                name="name"
                                label="Name"
                                placeholder="Your Name"
                                type="text"
                            />
                        )}

                        <FormField
                            control={form.control}
                            name="email"
                            label="Email"
                            placeholder="Your email address"
                            type="email"
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                        />

                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-tr from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-700 text-white font-medium py-2 rounded-xl transition duration-200"
                        >
                            {isSignIn ? "Interview Dashboard" : "Start an Interview"}
                        </Button>
                    </form>
                </Form>

                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                    {isSignIn ? "No account yet?" : "Have an account already?"}
                    <Link
                        href={!isSignIn ? "/hr-interviews/sign-in" : "/hr-interviews/sign-up"}
                        className="ml-1 font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        {!isSignIn ? "Sign In" : "Sign Up"}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default AuthForm;
