import { Boxes, Globe, RefreshCcw, Shield } from "lucide-react";

export const ENTERPRISE_FEATURES = [
  {
    icon: Globe,
    label: "Global Edge Network",
    desc: "Blazing-fast performance powered by intelligent edge routing around the globe.",
  },
  {
    icon: Shield,
    label: "Enterprise-Grade Security",
    desc: "Fortified with bank-level encryption and real-time threat detection.",
  },
  {
    icon: RefreshCcw,
    label: "True Real-Time Sync",
    desc: "Experience seamless updates across every device, without lifting a finger.",
  },
  {
    icon: Boxes,
    label: "Limitless Cloud Storage",
    desc: "Save everything—from quick snippets to full-scale applications, without restrictions.",
  },
];

export const FEATURES = {
  development: [
    "Intelligent AI Assistant for coding and refactoring",
    "Custom UI theme creator with live preview",
    "Powerful debugging suite with breakpoints and logs",
    "Support for 20+ programming languages and frameworks",
  ],
  collaboration: [
    "Live pair-programming with voice & cursor sync",
    "Shared team workspaces with role-based access",
    "Built-in Git integration for version tracking",
    "Inline code reviews and threaded discussions",
  ],
  deployment: [
    "Deploy with a single click to your favorite platforms",
    "Integrated CI/CD pipeline with status monitoring",
    "Full Docker & container support for portability",
    "Connect your own domain with SSL in seconds",
  ],
};
