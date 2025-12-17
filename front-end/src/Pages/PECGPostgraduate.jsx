import React from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  DollarSign, 
  Microscope,
  Globe,
  BookOpen,
  University,
  Award,
  CheckCircle,
  Calendar,
  ArrowRight
} from 'lucide-react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';

const PECPGPostgraduate = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const coverageItems = [
    {
      icon: GraduationCap,
      title: "Full Tuition Coverage",
      description: "Study at top Brazilian public universities with complete tuition waiver.",
      color: "text-blue-700"
    },
    {
      icon: DollarSign,
      title: "Monthly Stipend",
      description: "Financial support covering living expenses throughout your program.",
      color: "text-green-700"
    },
    {
      icon: Microscope,
      title: "Research & Academic Support",
      description: "Access to laboratories, libraries, supervisors, and research funding.",
      color: "text-purple-700"
    },
    {
      icon: Globe,
      title: "International Student Support",
      description: "Assistance with documentation, residency, and cultural adaptation.",
      color: "text-amber-700"
    },
    {
      icon: BookOpen,
      title: "Portuguese Language Training",
      description: "Language preparation for academic and research success in Brazil.",
      color: "text-red-700"
    },
    {
      icon: University,
      title: "World-Class Institutions",
      description: "Admission into highly ranked Brazilian research universities.",
      color: "text-teal-700"
    }
  ];

  const degreeLevels = [
    {
      title: "Master's Degree (MSc / MA)",
      duration: "2 years",
      description: "Advanced coursework + thesis research",
      icon: Award,
      color: "from-blue-600 to-blue-500"
    },
    {
      title: "Doctoral Degree (PhD)",
      duration: "4 years",
      description: "Original research + dissertation",
      icon: Microscope,
      color: "from-green-600 to-green-500"
    }
  ];

  const eligibilityPoints = [
    "Bachelor's degree (for Master's applicants)",
    "Master's degree (for PhD applicants)",
    "Strong academic and research background",
    "Research interests aligned with Brazilian institutions",
    "Willingness to study and research in Portuguese"
  ];

  return (
    <>
    <Navbar />
    <section className="w-full bg-gradient-to-b from-slate-50 to-white py-16 px-4 sm:px-6 lg:px-8 mt-8">
      <article className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            PEC-PG Postgraduate Program
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Fully funded Master's and Doctoral degrees at leading research universities in Brazil.
          </p>
        </motion.div>

        {/* Program Overview */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="max-w-5xl mx-auto mb-20"
        >
          <h3 className="text-2xl font-semibold text-slate-800 mb-6 text-center">
            Program Overview
          </h3>
          <p className="text-lg text-slate-700 leading-relaxed text-center">
            The PEC-PG (Programa de Estudantes-Convênio de Pós-Graduação) is a Brazilian government postgraduate 
            scholarship program designed for international students pursuing advanced degrees. This prestigious 
            initiative provides comprehensive support for Master's (MSc) and Doctoral (PhD) studies, conducted in 
            partnership with Brazil's top public research universities. The program includes Portuguese language 
            preparation to ensure academic and research success, offering one of the most competitive 
            fully funded postgraduate scholarship opportunities for international students in Brazil.
          </p>
        </motion.div>

        {/* Degree Levels */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20"
        >
          {degreeLevels.map((degree, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`bg-gradient-to-br ${degree.color} rounded-2xl shadow-xl p-8 text-white`}
            >
              <div className="flex items-start justify-between mb-6">
                <degree.icon size={40} className="opacity-90" />
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <span className="font-semibold">{degree.duration}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">{degree.title}</h3>
              <p className="text-white/90 text-lg">{degree.description}</p>
              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="flex items-center text-white/80">
                  <Calendar size={18} className="mr-2" />
                  <span className="font-medium">Full scholarship coverage</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scholarship Coverage */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold text-slate-800 mb-10 text-center">
            Comprehensive Scholarship Coverage
          </h3>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {coverageItems.map((item, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border border-slate-100"
              >
                <div className={`${item.color} mb-5`}>
                  <item.icon size={36} />
                </div>
                <h4 className="text-xl font-semibold text-slate-900 mb-3">
                  {item.title}
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Eligibility & CTA Container */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Eligibility */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={containerVariants}
              className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl shadow-lg p-8 border border-slate-200"
            >
              <h3 className="text-2xl font-semibold text-slate-800 mb-8">
                Eligibility Requirements
              </h3>
              <ul className="space-y-5">
                {eligibilityPoints.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="text-green-600 mt-1 mr-4 flex-shrink-0" size={22} />
                    <span className="text-slate-700 text-lg">{point}</span>
                  </li>
                ))}
              </ul>
              
              {/* Language Note */}
              <div className="mt-10 p-6 bg-white rounded-xl border border-slate-300">
                <div className="flex items-center mb-3">
                  <BookOpen className="text-blue-600 mr-3" size={24} />
                  <h4 className="text-xl font-semibold text-slate-800">
                    Portuguese Language Preparation
                  </h4>
                </div>
                <p className="text-slate-600">
                  Don't have Portuguese proficiency? Our comprehensive language training program prepares 
                  international students for academic success in Brazil. The PEC-PG program includes 
                  language support to ensure you're ready for graduate-level research and coursework.
                </p>
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={containerVariants}
              className="flex flex-col justify-center bg-gradient-to-r from-slate-900 to-blue-900 rounded-2xl shadow-xl p-10 text-white"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">
                  Begin Your Research Journey in Brazil
                </h3>
                <p className="text-slate-200 text-lg mb-8 leading-relaxed">
                  Join a global community of researchers and scholars pursuing advanced degrees through 
                  Brazil's premier postgraduate scholarship for international students.
                </p>
                
                {/* Application Timeline */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
                  <h4 className="text-xl font-semibold mb-4">Application Timeline</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-300">Feb - Apr</div>
                      <div className="text-sm text-slate-300">Application Period</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-300">Aug - Sep</div>
                      <div className="text-sm text-slate-300">Program Start</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="text-center">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg px-10 py-5 rounded-full hover:shadow-2xl transition-all duration-300"
                >
                   Start your Journey
                  <ArrowRight className="ml-3" size={22} />
                </motion.a>
                <p className="mt-6 text-slate-300 text-sm">
                  Complete guidance on research proposals, academic documentation, and interview preparation
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* SEO Rich Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="mt-20 max-w-5xl mx-auto"
        >
          <div className="bg-gradient-to-b from-slate-100 to-white rounded-2xl p-10 border border-slate-300 shadow-lg">
            <h3 className="text-2xl font-semibold text-slate-800 mb-6 text-center">
              Why Choose PEC-PG for Your Postgraduate Studies?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-slate-700 leading-relaxed">
                  The PEC-PG Postgraduate Program represents Brazil's commitment to international academic 
                  exchange and research collaboration. As a fully funded scholarship for graduate students, 
                  it provides not only financial security but also access to Brazil's rich research ecosystem.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  This Brazil postgraduate scholarship is particularly valuable for students interested in 
                  fields where Brazilian universities excel, including agriculture, renewable energy, 
                  tropical medicine, and environmental sciences.
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-slate-700 leading-relaxed">
                  A Master's degree in Brazil or PhD scholarship in Brazil through PEC-PG opens doors to 
                  Latin American research networks, Portuguese language proficiency, and unique cultural 
                  perspectives that enhance any academic career.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  The program's comprehensive support system ensures international students can focus on 
                  their research while adapting successfully to academic life in Brazil, making it one of 
                  the most attractive fully funded graduate study opportunities available today.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </article>
    </section>
    <Footer />
    </>
  );
};

export default PECPGPostgraduate;