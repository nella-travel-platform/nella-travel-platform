import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import Services from "../components/home/Services";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Testimonials from "../components/home/Testimonials";
import Footer from "../components/layout/Footer";

export default function HomePage() {
  return (
    <main className="home-page">
      <Navbar />
      <Hero />
      <Services />
      <WhyChooseUs />
      <Testimonials />
      <Footer />
    </main>
  );
}
