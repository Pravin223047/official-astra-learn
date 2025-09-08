import { Navbar } from "@/components/hero/navbar";
import { FeaturesSection } from "@/components/hero/features-section";
import { WhyChooseUs } from "@/components/hero/why-choose-us";
import { Testimonials } from "@/components/hero/testimonials";
import { TechStack } from "@/components/hero/tech-stack";
import { FAQSection } from "@/components/hero/faq-section";
import { ContactSection } from "@/components/hero/contact-section";
import { Footer } from "@/components/hero/footer";
import HeroSection from "@/components/hero/hero-section";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <WhyChooseUs />
      <Testimonials />
      <TechStack />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  );
}