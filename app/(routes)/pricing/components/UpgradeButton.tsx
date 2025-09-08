import { Zap } from "lucide-react";
import Link from "next/link";

export default function UpgradeButton() {
    const CHEKOUT_URL =
        "https://codewithpravin.lemonsqueezy.com/buy/a7fb3347-75cf-4125-aa1c-9b25bbd2f219";

    return (
        <Link
            href={CHEKOUT_URL}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-black dark:text-white 
        bg-gradient-to-r from-blue-200 to-blue-300
        hover:from-blue-200 hover:to-blue-200 dark:from-blue-500 dark:to-blue-600 rounded-lg 
        dark:hover:from-blue-600 dark:hover:to-blue-700 transition-all"
        >
            <Zap className="w-5 h-5" />
            Upgrade to Pro
        </Link>
    );
}