"use client";
import { db } from "@/configs/db";
import { USER_TABLE } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { eq } from "drizzle-orm";
import { useEffect } from "react";

export default function LearningProviderLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const { user } = useUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress;

    useEffect(() => {
        CheckIsNewUser();
    }, [userEmail]);

    const CheckIsNewUser = async () => {
        // if (!userEmail) return;
        // const result = await db.select().from(USER_TABLE).where(
        //     eq(USER_TABLE.email, userEmail)
        // );

        // if (result.length === 0) {
        //     const userResponse = await db.insert(USER_TABLE).values({
        //         userName: user?.fullName || "New User",
        //         email: userEmail,
        //         isMember: false,
        //     }).returning({
        //         id: USER_TABLE.id,
        //     });

        //     console.log("User inserted:", userResponse);
        // }

        const result = await axios.post("/api/create-user", {
            user: user,
        });
        console.log("User created:", result.data);
    };

    return (
        <div>
            {children}
        </div>
    );
}