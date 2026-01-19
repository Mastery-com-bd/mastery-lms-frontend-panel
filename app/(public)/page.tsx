import BenefitsSection from "@/components/public/home/benefits-section";
import DownloadApp from "@/components/public/home/download-app-section";
import ExploreCourse from "@/components/public/home/explore-course";
import FaqSection from "@/components/public/home/faq-section";
import FreeSkill from "@/components/public/home/free-skill";
import HomePage from "@/components/public/home/hero-section";
import NewsLetter from "@/components/public/home/newsletter-section";
import SocialProve from "@/components/public/home/social-prove";
import Testimonials from "@/components/public/home/testimonials-section";

const Page = () => {
  return (
    <div>
      <HomePage />
      <BenefitsSection />
      <ExploreCourse />
      <SocialProve />
      <NewsLetter />
      <Testimonials />
      <FaqSection />
      <DownloadApp />
      <FreeSkill />
    </div>
  );
};

export default Page;
