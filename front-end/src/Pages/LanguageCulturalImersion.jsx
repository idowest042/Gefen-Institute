import React from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  GraduationCap,
  Globe,
  Users,
  Monitor,
  Heart,
  CheckCircle,
  Calendar,
  ArrowRight,
  Flag
} from 'lucide-react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';

const LanguageCulturalImmersion = () => {
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
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  const programFeatures = [
    {
      icon: MessageSquare,
      title: "Intensive Portuguese Classes",
      description: "Focused training in speaking, listening, reading, and writing for daily communication.",
      color: "text-emerald-600"
    },
    {
      icon: GraduationCap,
      title: "Academic Portuguese Preparation",
      description: "Language skills tailored for university lectures, exams, and research writing.",
      color: "text-blue-600"
    },
    {
      icon: Globe,
      title: "Cultural Orientation",
      description: "Learn Brazilian customs, social norms, and daily life practices for smooth integration.",
      color: "text-amber-600"
    },
    {
      icon: Users,
      title: "Experienced Instructors",
      description: "Professional teachers with expertise in teaching Portuguese to international students.",
      color: "text-purple-600"
    },
    {
      icon: Monitor,
      title: "Flexible Learning Formats",
      description: "Online and in-person options designed to fit different schedules and learning styles.",
      color: "text-rose-600"
    },
    {
      icon: Heart,
      title: "Confidence & Integration Support",
      description: "Build confidence to communicate and integrate smoothly into Brazilian academic and social life.",
      color: "text-teal-600"
    }
  ];

  const targetAudience = [
    "Students preparing for PEC-G or PEC-PG scholarships",
    "Beginners with no prior Portuguese knowledge",
    "Intermediate learners seeking academic fluency",
    "Professionals planning to work or study in Brazil",
    "Researchers needing Portuguese for fieldwork",
    "Anyone planning long-term stay in Brazil"
  ];

  const immersionTimeline = [
    { phase: "Foundational", duration: "4-8 weeks", focus: "Basic communication skills" },
    { phase: "Intermediate", duration: "8-12 weeks", focus: "Academic vocabulary & grammar" },
    { phase: "Advanced", duration: "12-16 weeks", focus: "Cultural fluency & integration" }
  ];

  return (
    <>
    <Navbar />
    <section className="w-full bg-gradient-to-b from-emerald-50/50 to-white py-16 px-4 sm:px-6 lg:px-8 mt-8">
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
            Language & Cultural Immersion
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Intensive Portuguese training and cultural orientation to help you thrive academically and socially in Brazil.
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
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-emerald-100">
            <h3 className="text-2xl font-semibold text-slate-800 mb-6 text-center">
              Program Overview
            </h3>
            <p className="text-lg text-slate-700 leading-relaxed">
              Our comprehensive Portuguese language program combines intensive language instruction with 
              essential cultural orientation, specifically designed for international students. We focus 
              on developing academic, conversational, and professional Portuguese skills while providing 
              insights into Brazilian culture to ease your integration into society. This program is 
              ideal for students preparing for PEC-G, PEC-PG scholarships, or anyone planning to study, 
              work, or conduct research in Brazil.
            </p>
          </div>
        </motion.div>

        {/* Timeline Badge */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-center mb-4">
              <Calendar className="mr-3" size={24} />
              <h3 className="text-xl font-bold">Program Duration: 4-16 Weeks</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              {immersionTimeline.map((stage, index) => (
                <div key={index} className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-lg font-semibold">{stage.phase}</div>
                  <div className="text-sm opacity-90">{stage.duration}</div>
                  <div className="text-xs opacity-80 mt-1">{stage.focus}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Program Features */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold text-slate-800 mb-10 text-center">
            Comprehensive Program Features
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
            {programFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-emerald-50"
              >
                <div className={`${feature.color} mb-5`}>
                  <feature.icon size={36} />
                </div>
                <h4 className="text-xl font-semibold text-slate-900 mb-3">
                  {feature.title}
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Target Audience & CTA Container */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Target Audience */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={containerVariants}
            >
              <div className="bg-gradient-to-br from-slate-50 to-emerald-50 rounded-2xl shadow-lg p-8 border border-slate-200 mb-8">
                <h3 className="text-2xl font-semibold text-slate-800 mb-8">
                  Who This Program Is For
                </h3>
                <ul className="space-y-4">
                  {targetAudience.map((audience, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="text-emerald-600 mt-1 mr-4 flex-shrink-0" size={20} />
                      <span className="text-slate-700 text-lg">{audience}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Before You Arrive Highlight */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={containerVariants}
                className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl shadow-lg p-8 border border-blue-200"
              >
                <div className="flex items-center mb-4">
                  <Flag className="text-blue-600 mr-3" size={24} />
                  <h4 className="text-xl font-semibold text-slate-800">
                    Before You Arrive in Brazil
                  </h4>
                </div>
                <p className="text-slate-700 mb-4">
                  Our program prepares you not just linguistically but also culturally for your Brazilian journey. 
                  You'll learn practical skills like navigating public transportation, understanding Brazilian 
                  academic culture, and building social connections.
                </p>
                <div className="text-sm text-slate-600 italic">
                  Recommended: Start language training 3-6 months before your planned arrival for optimal integration.
                </div>
              </motion.div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={containerVariants}
              className="flex flex-col justify-center bg-gradient-to-br from-emerald-700 to-blue-700 rounded-2xl shadow-xl p-10 text-white"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">
                  Begin Your Brazilian Journey with Confidence
                </h3>
                <p className="text-emerald-100 text-lg mb-8 leading-relaxed">
                  Join hundreds of international students who have successfully navigated academic 
                  and social life in Brazil through our comprehensive Portuguese language and cultural 
                  immersion program.
                </p>

                {/* Program Benefits */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-xl font-bold">4+</div>
                    <div className="text-sm">Language Levels</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-xl font-bold">20+</div>
                    <div className="text-sm">Cultural Topics</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-xl font-bold">98%</div>
                    <div className="text-sm">Success Rate</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-xl font-bold">Flexible</div>
                    <div className="text-sm">Start Dates</div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="text-center">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center bg-white text-emerald-700 font-bold text-lg px-10 py-5 rounded-full hover:shadow-2xl transition-all duration-300 hover:bg-emerald-50"
                >
                  Start Language & Cultural Training
                  <ArrowRight className="ml-3" size={22} />
                </motion.a>
                <p className="mt-6 text-emerald-200 text-sm">
                  Personalized learning path assessment + free trial lesson included
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
          <div className="bg-white rounded-2xl p-10 border border-emerald-200 shadow-lg">
            <h3 className="text-2xl font-semibold text-slate-800 mb-6 text-center">
              Why Language & Cultural Immersion is Essential for Brazil
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-slate-700 leading-relaxed">
                  A dedicated Portuguese language program is more than just vocabulary and grammar—it's 
                  your gateway to academic success and meaningful social connections in Brazil. International 
                  students who complete our immersion program report significantly higher academic performance 
                  and smoother cultural adaptation.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  Learning Portuguese in Brazil through our structured program ensures you develop not only 
                  language skills but also cultural intelligence, preparing you for everything from university 
                  lectures to everyday interactions in Brazilian society.
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-slate-700 leading-relaxed">
                  Our Language and Cultural Immersion program is specifically designed for international 
                  students planning to study and live in Brazil. We address the unique challenges foreign 
                  students face, from understanding academic expectations to navigating social situations.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  Whether you're preparing for a scholarship program like PEC-G or PEC-PG, planning independent 
                  research, or considering professional opportunities in Brazil, our program provides the 
                  comprehensive preparation you need to thrive in your Brazilian academic and personal journey.
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

export default LanguageCulturalImmersion;