import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  GraduationCap, 
  DollarSign, 
  Heart, 
  Award, 
  Shield, 
  Home,
  Globe,
  BookOpen,
  Users,
  Plane
} from 'lucide-react';

export default function WhyBrazil() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Benefits data with SEO-rich content
  const benefits = [
    {
      id: 1,
      icon: GraduationCap,
      title: "Free Tuition at Federal Universities",
      description: "World-class education with zero tuition fees for accepted international students at Brazil's prestigious federal universities.",
      color: "bg-emerald-50"
    },
    {
      id: 2,
      icon: DollarSign,
      title: "Stipend for Postgraduate Students",
      description: "Many postgraduate programs through PEC-PG and CAPES/CNPq scholarships provide monthly stipends covering living expenses.",
      color: "bg-blue-50"
    },
    {
      id: 3,
      icon: Heart,
      title: "Free Healthcare for Students",
      description: "International students get complete access to Brazil's public healthcare system (SUS) at no cost throughout their studies.",
      color: "bg-rose-50"
    },
    {
      id: 4,
      icon: Award,
      title: "High Quality of Education",
      description: "Brazil's federal universities rank among the strongest in Latin America, offering rigorous academic programs and research opportunities.",
      color: "bg-amber-50"
    },
    {
      id: 5,
      icon: Shield,
      title: "Safe, Welcoming Student Environment",
      description: "Known for cultural diversity and friendliness toward foreigners, Brazil creates a supportive atmosphere for international students.",
      color: "bg-purple-50"
    },
    {
      id: 6,
      icon: Home,
      title: "Low Cost of Living",
      description: "Affordable housing, feeding, and transportation in most Brazilian cities make student life comfortable and budget-friendly.",
      color: "bg-cyan-50"
    },
    {
      id: 7,
      icon: Globe,
      title: "Immersive Portuguese Language Growth",
      description: "Students develop fluency in Portuguese, a global language spoken across continents, opening doors to international opportunities.",
      color: "bg-indigo-50"
    },
    {
      id: 8,
      icon: BookOpen,
      title: "PEC-G Scholarships for Undergraduates",
      description: "Special agreements through Brazil's PEC-G program support African students academically and socially throughout their bachelor's degree.",
      color: "bg-teal-50"
    },
    {
      id: 9,
      icon: Users,
      title: "Full Access to University Resources",
      description: "Free labs, libraries, materials, sports facilities, and comprehensive academic support services available to all enrolled students.",
      color: "bg-orange-50"
    },
    {
      id: 10,
      icon: Plane,
      title: "International Exchange Opportunities",
      description: "Some federal universities fund travel programs for academic exchanges abroad, expanding your global education experience.",
      color: "bg-pink-50"
    }
  ];

  // Animation variants - staggered container for cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Fade-up animation for text and cards
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

  // Card hover effect - gentle scale and shadow
  const cardHoverVariants = {
    hover: {
      y: -6,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      id="why-brazil" 
      ref={sectionRef}
      aria-labelledby="why-brazil-heading"
      className="py-20 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="#00923F" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            id="why-brazil-heading"
            variants={fadeUpVariants}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4"
          >
            Why Study in <span className="text-[#00923F]">Brazil</span>?
          </motion.h2>
          
          <motion.p
            variants={fadeUpVariants}
            className="text-xl sm:text-2xl text-gray-600 font-medium mb-6 max-w-3xl mx-auto"
          >
            Discover the unique opportunities Brazil offers to international students.
          </motion.p>

          <motion.p
            variants={fadeUpVariants}
            className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto"
          >
            Brazil has become one of the most attractive destinations for international students 
            seeking <strong>fully funded scholarships</strong> and world-class education. Through 
            programs like <strong>PEC-G (undergraduate scholarships)</strong> and <strong>PEC-PG 
            (postgraduate funding)</strong>, Nigerian students can access <strong>free education in Brazil</strong> at 
            prestigious federal universities while experiencing rich cultural diversity and professional growth.
          </motion.p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {benefits.map((benefit) => {
            const IconComponent = benefit.icon;
            return (
              <motion.article
                key={benefit.id}
                variants={fadeUpVariants}
                whileHover="hover"
                className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col"
              >
                <motion.div 
                  variants={cardHoverVariants}
                  className="h-full flex flex-col"
                >
                  {/* Icon Header with colored background */}
                  <div className={`${benefit.color} p-6 flex items-center justify-center`}>
                    <div className="bg-white rounded-full p-4 shadow-lg">
                      <IconComponent 
                        className="w-8 h-8 text-[#00923F]" 
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Bottom Summary Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-16 bg-gradient-to-r from-[#0037A3] to-[#00923F] rounded-2xl p-8 sm:p-12 text-center"
        >
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
            Your Gateway to Global Education Starts Here
          </h3>
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join thousands of international students who have transformed their lives through 
            <strong> Brazil scholarships for international students</strong>. With comprehensive 
            support from Gefen Institute, you'll navigate the application process smoothly and 
            succeed in one of the world's most vibrant academic environments.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="/scholarships"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#0037A3] font-semibold rounded-full hover:bg-gray-100 transition-colors duration-300 text-lg"
            >
              Explore Scholarship Programs
              <svg 
                className="w-5 h-5 ml-2" 
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
            </motion.a>
            <motion.a
              href="/classes"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white hover:bg-white hover:text-[#0037A3] transition-all duration-300 text-lg"
            >
              Start Portuguese Classes
              <BookOpen className="w-5 h-5 ml-2" aria-hidden="true" />
            </motion.a>
          </div>
        </motion.div>

        {/* SEO-rich footer text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-12 text-center text-gray-600 text-sm max-w-4xl mx-auto"
        >
          <p className="leading-relaxed">
            <strong>Benefits of studying in Brazil</strong> extend beyond academics. Students gain 
            access to <strong>Brazil free education</strong> programs, develop Portuguese fluency, 
            experience cultural immersion, and build international networks. Whether pursuing 
            undergraduate degrees through <strong>PEC-G scholarships</strong> or advanced studies with 
            <strong> Brazil postgraduate funding</strong>, Gefen Institute provides comprehensive guidance 
            throughout your journey to academic excellence in Brazil.
          </p>
        </motion.div>
      </div>
    </section>
  );
}