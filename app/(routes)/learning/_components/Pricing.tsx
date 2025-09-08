import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Coins, CreditCard } from 'lucide-react'
import React from 'react'
// import { loadStripe } from "@stripe/stripe-js";

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const creditPackages = [
    {
        credits: 100,
        price: 49,
        popular: false,
        description: "Perfect for getting started",
        savings: "Basic package"
    },
    {
        credits: 500,
        price: 199,
        popular: true,
        description: "Most value for your learning journey",
        savings: "Save 20%"
    },
    {
        credits: 1000,
        price: 349,
        popular: false,
        description: "For dedicated learners",
        savings: "Save 30%"
    }
];

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

const Pricing = () => {
    const handleBuyCredits = async (credits: number, price: number) => {
        try {
            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ credits, price }),
            });

            const session = await response.json();
            // const stripe = await stripePromise;

            // if (stripe) {
            //     const { error } = await stripe.redirectToCheckout({
            //         sessionId: session.id,
            //     });
            //     if (error) console.error(error);
            // }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.3 }}
            className="mb-12"
        >
            <Card className="p-8 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-0 shadow-lg">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className="p-4 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                            <Coins className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">750 Credits</h2>
                            <p className="text-lg text-muted-foreground">Available for your learning journey</p>
                        </div>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-6 text-lg"
                                size="lg"
                            >
                                <CreditCard className="mr-2 h-5 w-5" />
                                Buy More Credits
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[520px] rounded-2xl shadow-xl bg-background border border-border animate-in fade-in slide-in-from-bottom-10">
                            <DialogHeader className="mb-4">
                                <DialogTitle className="text-3xl font-extrabold text-center tracking-tight">🎓 Choose Your Learning Package</DialogTitle>
                                <DialogDescription className="text-center text-muted-foreground text-base mt-2">
                                    Invest in your growth with our flexible, AI-boosted credit plans.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="grid gap-5 py-2">
                                {creditPackages.map((pkg: any) => (
                                    <motion.div
                                        key={pkg.credits}
                                        whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(128, 90, 213, 0.4)" }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        className="relative rounded-xl overflow-hidden group"
                                    >
                                        <Button
                                            variant="ghost"
                                            onClick={() => handleBuyCredits(pkg.credits, pkg.price)}
                                            className={cn(
                                                "w-full h-auto px-6 py-5 text-left bg-card hover:bg-card/90 transition-colors duration-300 border border-border",
                                                "group-hover:ring-1 group-hover:ring-purple-500/60 group-hover:ring-offset-2"
                                            )}
                                        >
                                            {/* Glowing Hover Layer */}
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
                                            />
                                            <div className="flex flex-col relative z-10">
                                                <span className="text-lg sm:text-xl font-semibold mb-1">{pkg.credits} Credits</span>
                                                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">${pkg.price}</span>
                                                <span className="text-muted-foreground text-sm">{pkg.description}</span>
                                                {pkg.savings && (
                                                    <span className="text-sm font-medium text-green-600 dark:text-green-400 mt-1">{pkg.savings}</span>
                                                )}
                                            </div>

                                            {pkg.popular && (
                                                <span className="absolute top-2 right-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-md z-10">
                                                    🌟 Most Popular
                                                </span>
                                            )}
                                        </Button>
                                    </motion.div>
                                ))}
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </Card>
        </motion.div>
    )
}

export default Pricing