import React from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Home, 
  BookOpen, 
  Globe, 
  School,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import Footer from '../component/Footer';
import Navbar from '../component/Navbar';

const PECGUndergraduate = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const benefits = [
    {
      icon: GraduationCap,
      title: "Full Tuition Coverage",
      description: "Study at top Brazilian public universities at no cost.",
      color: "text-blue-600"
    },
    {
      icon: Home,
      title: "Accommodation Support",
      description: "Housing assistance throughout your studies.",
      color: "text-green-600"
    },
    {
      icon: BookOpen,
      title: "Portuguese Language Support",
      description: "Language preparation to help you succeed academically.",
      color: "text-yellow-600"
    },
    {
      icon: Globe,
      title: "International Student Support",
      description: "Dedicated support for foreign students adjusting to life in Brazil.",
      color: "text-purple-600"
    },
    {
      icon: School,
      title: "Top-Ranked Universities",
      description: "Access to some of Latin America's best public institutions.",
      color: "text-red-600"
    }
  ];

  const eligibilityPoints = [
    "Open to international students",
    "Undergraduate (Bachelor's degree)",
    "Academic merit–based",
    "Willingness to study in Portuguese"
  ];

  return (
    <>
    <Navbar />
    <section className="w-full bg-gradient-to-b from-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8 mt-8">
      <article className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            PEC-G Undergraduate Program
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A fully funded opportunity to earn your bachelor's degree at top public universities in Brazil.
          </p>
        </motion.div>

        {/* Program Overview */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="max-w-4xl mx-auto mb-16"
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            About the Program
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed text-center">
            The PEC-G (Programa de Estudantes-Convênio de Graduação) is a Brazilian government scholarship program 
            designed specifically for international students seeking fully funded bachelor's degrees. This prestigious 
            initiative offers comprehensive support throughout your undergraduate journey, conducted in partnership with 
            Brazil's leading public universities, making it one of the most sought-after opportunities for students 
            looking to study in Brazil.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-800 mb-10 text-center">
            Scholarship Benefits
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className={`${benefit.color} mb-4`}>
                  <benefit.icon size={36} />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h4>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Eligibility and CTA Container */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Eligibility Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={containerVariants}
              className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl shadow-lg p-8 border border-blue-100"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                Eligibility Snapshot
              </h3>
              <ul className="space-y-4">
                {eligibilityPoints.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="text-green-600 mt-1 mr-3 flex-shrink-0" size={20} />
                    <span className="text-gray-700 text-lg">{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
                <p className="text-gray-600 italic">
                  This program is ideal for students seeking a fully funded bachelor's degree in Brazil 
                  through a government-backed scholarship for international students.
                </p>
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={containerVariants}
              className="flex flex-col justify-center items-center bg-gradient-to-r from-blue-600 to-green-600 rounded-xl shadow-lg p-8 text-white"
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Start Your Brazilian Education Journey
                </h3>
                <p className="text-blue-100 mb-8 text-lg">
                  Join hundreds of international students who have successfully earned their 
                  undergraduate degrees in Brazil through the PEC-G program.
                </p>
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center bg-white text-blue-600 font-semibold text-lg px-8 py-4 rounded-full hover:bg-gray-50 transition-colors duration-300 shadow-lg"
                >
                  Start your Journey
                  <ArrowRight className="ml-3" size={20} />
                </motion.a>
                <p className="mt-6 text-blue-100 text-sm">
                  Complete guidance on application process, documentation, and preparation provided
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
          className="mt-16 max-w-4xl mx-auto text-center"
        >
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Why Choose the PEC-G Program?
            </h3>
            <p className="text-gray-700 mb-6">
              As one of Brazil's most prestigious scholarship programs for international students, 
              the PEC-G Undergraduate Program offers more than just financial support. It provides 
              a comprehensive educational experience in a culturally rich environment, preparing 
              students for global careers while immersed in Brazilian academic excellence.
            </p>
            <p className="text-gray-700">
              Studying in Brazil through this fully funded scholarship opens doors to Latin American 
              opportunities, Portuguese language mastery, and a unique international perspective 
              valued by employers worldwide.
            </p>
          </div>
        </motion.div>
      </article>
    </section>
    <Footer />
    </>
  );
};

export default PECGUndergraduate;