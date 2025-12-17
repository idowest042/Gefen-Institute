import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BookOpen, MessageCircle, Award, Clock, Users, Video, Headphones, Mic, BookMarked, Languages, TrendingUp, Check } from 'lucide-react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import { Link } from 'react-router-dom';

export default function PortugueseClasses({ onEnroll }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Class offerings data
  const classes = [
    {
      id: 1,
      name: "Beginner Portuguese",
      description: "Start your Portuguese journey with foundational grammar, essential vocabulary, and basic conversation skills for everyday situations.",
      duration: "8 weeks",
      format: "Online & In-person",
      icon: BookOpen,
      color: "bg-emerald-50"
    },
    {
      id: 2,
      name: "Intermediate Portuguese",
      description: "Build fluency with complex grammar structures, expanded vocabulary, and practical conversation practice for academic and professional contexts.",
      duration: "10 weeks",
      format: "Online & In-person",
      icon: MessageCircle,
      color: "bg-blue-50"
    },
    {
      id: 3,
      name: "Advanced / Fluency Training",
      description: "Master advanced Portuguese with native-level fluency training, idiomatic expressions, and cultural nuances for complete immersion.",
      duration: "12 weeks",
      format: "Online & In-person",
      icon: TrendingUp,
      color: "bg-purple-50"
    },
    {
      id: 4,
      name: "Exam Preparation (CELPE-Bras)",
      description: "Intensive preparation for Brazil's official Portuguese proficiency exam with practice tests, exam strategies, and expert guidance.",
      duration: "6 weeks",
      format: "Online",
      icon: Award,
      color: "bg-amber-50"
    },
    {
      id: 5,
      name: "One-on-One Private Lessons",
      description: "Personalized Portuguese instruction tailored to your goals, schedule, and learning pace with dedicated expert tutors.",
      duration: "Flexible",
      format: "Online & In-person",
      icon: Users,
      color: "bg-rose-50"
    },
    {
      id: 6,
      name: "Group Zoom Classes",
      description: "Interactive live classes with small groups, real-time feedback, and collaborative learning from anywhere in the world.",
      duration: "8 weeks",
      format: "Online",
      icon: Video,
      color: "bg-cyan-50"
    }
  ];

  // Learning outcomes
  const learningOutcomes = [
    { skill: "Listening", description: "Understand native Portuguese speakers in various contexts", icon: Headphones },
    { skill: "Speaking", description: "Communicate confidently in Portuguese conversations", icon: Mic },
    { skill: "Grammar", description: "Master Portuguese grammar rules and sentence structures", icon: BookMarked },
    { skill: "Pronunciation", description: "Develop authentic Brazilian Portuguese accent", icon: Languages },
    { skill: "Vocabulary", description: "Build extensive vocabulary for academic and daily use", icon: BookOpen },
    { skill: "Conversational Fluency", description: "Engage naturally in complex discussions", icon: MessageCircle }
  ];

  // Animation variants - staggered container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  // Fade-up animation for elements
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  // Card hover animation
  const cardHoverVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Handle enrollment
  const handleEnroll = (className) => {
    if (onEnroll && typeof onEnroll === 'function') {
      onEnroll(className);
    } else {
      console.log(`Enrolling in: ${className}`);
    }
  };

  return (
    <>
    <Navbar />
    <section 
      id="classes" 
      ref={sectionRef}
      aria-labelledby="portuguese-classes"
      className="py-20 px-6 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            id="portuguese-classes"
            variants={fadeUpVariants}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4"
          >
            Portuguese <span className="text-[#00923F]">Language Classes</span>
          </motion.h2>
          <motion.p
            variants={fadeUpVariants}
            className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Master Portuguese at your own pace with expert instructors and flexible schedules.
          </motion.p>
        </motion.div>

        {/* Class Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {classes.map((classItem) => {
            const IconComponent = classItem.icon;
            return (
              <motion.article
                key={classItem.id}
                variants={fadeUpVariants}
                whileHover="hover"
                className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col"
              >
                <motion.div variants={cardHoverVariants}>
                  {/* Icon Header */}
                  <div className={`${classItem.color} p-6 flex items-center justify-center`}>
                    <div className="bg-white rounded-full p-4 shadow-lg">
                      <IconComponent 
                        className="w-8 h-8 text-[#00923F]" 
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {classItem.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4 flex-grow">
                      {classItem.description}
                    </p>

                    {/* Meta Information */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-100">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" aria-hidden="true" />
                        <span>{classItem.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Video className="w-4 h-4" aria-hidden="true" />
                        <span>{classItem.format}</span>
                      </div>
                    </div>

                    {/* Enroll Button */}
                    <Link to="/contact">
                    <motion.button
                      onClick={() => handleEnroll(classItem.name)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full px-6 py-3 bg-[#00923F] text-white font-semibold rounded-full hover:bg-[#007a35] transition-colors duration-300 flex items-center justify-center gap-2"
                      aria-label={`Enroll in ${classItem.name}`}
                    >
                      Enroll Now
                      <svg 
                        className="w-5 h-5" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M13 7l5 5m0 0l-5 5m5-5H6" 
                        />
                      </svg>
                    </motion.button>
                    </Link>
                  </div>
                </motion.div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* What You'll Learn Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="bg-white rounded-3xl shadow-xl p-8 sm:p-12"
        >
          <motion.h3
            variants={fadeUpVariants}
            className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center"
          >
            What You'll <span className="text-[#0037A3]">Learn</span>
          </motion.h3>
          <motion.p
            variants={fadeUpVariants}
            className="text-lg text-gray-600 text-center mb-10 max-w-2xl mx-auto"
          >
            Our comprehensive Portuguese language courses cover all essential skills 
            to prepare you for academic success and professional opportunities in Brazil.
          </motion.p>

          <motion.ul
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {learningOutcomes.map((outcome, index) => {
              const OutcomeIcon = outcome.icon;
              return (
                <motion.li
                  key={index}
                  variants={fadeUpVariants}
                  className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300"
                >
                  <div className="flex-shrink-0 bg-[#00923F] rounded-full p-3">
                    <OutcomeIcon 
                      className="w-6 h-6 text-white" 
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 text-lg">
                      {outcome.skill}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {outcome.description}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center bg-gradient-to-r from-[#0037A3] to-[#00923F] rounded-2xl p-10 sm:p-12"
        >
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Learn Portuguese?
          </h3>
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have successfully learned Portuguese 
            with Gefen Institute and achieved their dreams of studying in Brazil.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#0037A3] font-semibold rounded-full hover:bg-gray-100 transition-colors duration-300 text-lg"
            >
              Get Started Today
              <Check className="w-5 h-5 ml-2" aria-hidden="true" />
            </motion.a>
            <motion.a
              href="https://wa.me/2348141254595"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white hover:bg-white hover:text-[#0037A3] transition-all duration-300 text-lg"
            >
              <svg 
                className="w-5 h-5 mr-2" 
                fill="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Contact Us on WhatsApp
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
    <Footer />
    </>
  );
}