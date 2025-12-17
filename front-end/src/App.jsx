import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from "./Pages/HomePage"
import FAQ from './Pages/FAQ'
import Contact from './Pages/Contact'
import About from './Pages/About'
import Testimonials from './Pages/Testimonials'
import PortgueseClasses from './Pages/PortgueseClasses'
import ScholarshipPrograms from './Pages/ScholarshipPrograms'
import NotFound from './Pages/404'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PECGUndergraduate from './Pages/PECGUndergraduate'
import PECPGPostgraduate from './Pages/PECGPostgraduate'
import LanguageCulturalImmersion from './Pages/LanguageCulturalImersion'
import WhyBrazil from './Pages/WhyBrazil'
const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/classes" element={<PortgueseClasses />} />
        <Route path="/scholarships" element={<ScholarshipPrograms />} />
        <Route path="/undergraduate" element={<PECGUndergraduate />} />
        <Route path='/postgraduate' element={<PECPGPostgraduate />} />
        <Route path='/cultural-immersion' element={<LanguageCulturalImmersion />} />
        <Route path='/why-brazil' element={<WhyBrazil/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App