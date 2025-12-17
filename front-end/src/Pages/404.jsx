import { motion } from 'framer-motion';
import { Home, Search, Mail, ArrowLeft, BookOpen, GraduationCap } from 'lucide-react';

export default function NotFound() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Quick links for navigation
  const quickLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Scholarships', href: '/scholarships', icon: GraduationCap },
    { name: 'Portuguese Classes', href: '/classes', icon: BookOpen },
    { name: 'Contact Us', href: '/contact', icon: Mail }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4 sm:px-6 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="404-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="2" fill="#00923F" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#404-pattern)" />
        </svg>
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        {/* Animated 404 Number */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="mb-8"
        >
          <h1 className="font-serif text-9xl sm:text-[12rem] md:text-[14rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00923F] to-[#0037A3] leading-none">
            404
          </h1>
        </motion.div>

        {/* Error Message */}
        <motion.div variants={itemVariants} className="mb-8">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Oops! It seems the page you're looking for has taken a trip to Brazil without us. 
            Don't worry, we'll help you find your way back to your scholarship journey.
          </p>
        </motion.div>

        {/* Search Suggestion */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-3 text-gray-500 mb-3">
              <Search className="w-5 h-5" aria-hidden="true" />
              <span className="text-sm font-medium">Looking for something specific?</span>
            </div>
            <p className="text-gray-600 text-sm">
              Try navigating to our main sections below or use the links at the top of the page.
            </p>
          </div>
        </motion.div>

        {/* Quick Links Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {quickLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <motion.a
                key={link.name}
                href={link.href}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center gap-3"
              >
                <div className="bg-[#00923F] rounded-full p-3">
                  <IconComponent className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <span className="font-semibold text-gray-900 text-sm">{link.name}</span>
              </motion.a>
            );
          })}
        </motion.div>

        {/* Primary CTA */}
        <motion.div variants={itemVariants} className="space-y-4">
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#00923F] to-[#0037A3] text-white font-semibold rounded-full hover:shadow-lg transition-shadow duration-300 text-lg"
          >
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
            Back to Home
          </motion.a>

          <p className="text-gray-500 text-sm">
            or contact us if you believe this is an error
          </p>
        </motion.div>

        {/* Helpful Info */}
        <motion.div
          variants={itemVariants}
          className="mt-16 bg-gradient-to-r from-[#00923F]/10 to-[#0037A3]/10 rounded-2xl p-8 max-w-2xl mx-auto"
        >
          <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3">
            Still Need Help?
          </h3>
          <p className="text-gray-700 mb-6">
            Our team is always ready to assist you with scholarship applications, 
            Portuguese language classes, or any questions about studying in Brazil.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#00923F] font-semibold rounded-full hover:bg-gray-50 transition-colors duration-300 shadow-md"
            >
              <Mail className="w-5 h-5" aria-hidden="true" />
              Contact Support
            </motion.a>
            <motion.a
              href="https://wa.me/2348141254595"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#00923F] text-white font-semibold rounded-full hover:bg-[#007a35] transition-colors duration-300"
            >
              <svg 
                className="w-5 h-5" 
                fill="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp Us
            </motion.a>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          variants={itemVariants}
          className="mt-12 text-gray-500 text-sm"
        >
          Error Code: 404 | Page Not Found | Gefen Institute
        </motion.p>
      </motion.div>
    </div>
  );
}