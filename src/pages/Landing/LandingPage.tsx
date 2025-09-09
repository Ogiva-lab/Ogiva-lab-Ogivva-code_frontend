import About from "./components/About"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Hero from "./components/Hero"
import Waitlist from "./components/Waitlist"
import WhyChooseOgivva from "./components/WhyOgivva"


export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col" id="home">
        <Header />
        <Hero />
        <About />
        <WhyChooseOgivva />
        <Waitlist />
        <Footer />
    </div>
  )
}
