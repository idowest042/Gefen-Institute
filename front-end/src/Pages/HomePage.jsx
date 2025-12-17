import React from 'react'
import Navbar from "../component/Navbar"
import Hero from '../component/HeroSection'
import About from '../component/About'
import ScholarshipPrograms from '../component/ScholarshipPrograms'
import PortugueseClasses from '../component/PortgueseClasses'
import WhyBrazil from '../component/WhyBrazil'
import Testimonials from '../component/Testimonials'
import Footer from '../component/Footer'
import Contact from '../component/Contact'

const HomePage = () => {
  return (
    <div>
        <Navbar />
        <Hero />
        <About />
        <ScholarshipPrograms/>
        <PortugueseClasses />
        <WhyBrazil />
        <Testimonials />
        <Contact />
        <Footer />
    </div>
  )
}

export default HomePage