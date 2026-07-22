import Footer from "../components/layout/Footer";
import Hero from "../components/home/Hero";
import Navbar from "../components/layout/Navbar";
import Services from "../components/home/Services";
import Testimonials from "../components/home/Testimonials";
import WhyChooseUs from "../components/home/WhyChooseUs";

type Props = {
  searchParams: {
    pickupLocation?: string;
    returnLocation?: string;
    pickupDate?: string;
    pickupTime?: string;
    returnDate?: string;
    returnTime?: string;
    category?: string;
  };
};

export default function Home({ searchParams }: Props) {
  return (
    <main>
      <Navbar />
      <Hero initialSearch={searchParams} />
      <Services />
      <WhyChooseUs />
      <Testimonials />
      <Footer />
    </main>
  );
}
