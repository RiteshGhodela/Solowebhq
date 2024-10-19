import AboutUsSection from "./components/Aboutus";
import CommissionOpportunity from "./components/Commision";
import ContactSection from "./components/Contact";
import FAQ from "./components/Faq";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Processcom from "./components/Processcom";
import Services from "./components/Services";
import Trail from "./components/Trail";
import WhyChooseUs from "./components/whychoose";
import './globals.css'



const logos = [
  '/images/html5.svg',
  '/images/css3.svg',
  '/images/javascript.svg',
  '/images/react.svg',
  '/images/nextjs.svg',
  '/images/aftereffects.svg',
  '/images/premierepro.svg',
  '/images/facebook.svg',
  '/images/express.svg',
  '/images/babel.svg',
  '/images/nodejs.svg',
  '/images/jquery.svg',
  '/images/mongoose.svg',
  '/images/nodemon.svg',
  '/images/npm.svg',
  '/images/wordpress.svg',
  '/images/webflow.svg',
  '/images/viteJs.svg',
  '/images/typescript.svg',
  '/images/threejs.svg',
  '/images/tailwindcss.svg',
  '/images/sass.svg',
  '/images/redux.svg',
  '/images/reactbootstrap.svg'
];

export default function Home() {
  return (
    <>
    <Trail/>
    <Hero/>
    <div className="w-full py-20 bg-black">
      <Marquee logos={logos} speed={30} />
    </div>
    <Services/>
    <AboutUsSection/>
    <WhyChooseUs/>
    <Processcom/>
    <FAQ/>
    <CommissionOpportunity/>
    <ContactSection/>
    <Footer/>
    </>
  );
}
