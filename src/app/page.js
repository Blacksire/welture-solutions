import HeaderBanner from "./home-component/header-banner-section";
import AboutSection from "./home-component/about-section";
import SetUsApartSection from "./home-component/sets-us-apart-section";
import ServicesSection from "./home-component/services-section";
import HowWeWorkSection from "./home-component/how-we-work-section";
import FaqSection from "./home-component/faq-section";
import ContactUsSection from "./home-component/contact-us-section";

export const metadata = {
  title:
    "Welture Solutions Drives Business Growth with Strategic Sales & Digital Transformation",
  description:
    "We deliver tailored sales strategies, custom app development, and tech-driven solutions—from cloud computing to cybersecurity—designed to streamline operations and expand your market reach.",
};

export default function Home() {
  return (
    <div>
      <HeaderBanner />
      <AboutSection />
      <SetUsApartSection />
      <ServicesSection />
      <HowWeWorkSection />
      <FaqSection />
      <ContactUsSection />
    </div>
  );
}
