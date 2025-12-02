import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
// import GoogleReviews from "@/components/GoogleReviews"; // Verfügbar, aber nicht aktiv genutzt

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Features />
      <Testimonials />
      {/* <GoogleReviews /> */}
    </>
  );
}