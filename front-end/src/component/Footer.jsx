import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  Instagram, 
  Facebook, 
  MessageCircle,
  GraduationCap,
  DollarSign,
  Heart,
  Globe,
  BookOpen,
  MapPin,
  Check
} from 'lucide-react';
import { assets } from '../assets/assets';

export default function Footer() {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-50px" });

  const currentYear = new Date().getFullYear();

  // Quick navigation links
  const quickLinks = [
    { name: 'Home', href: '/home' },
    { name: 'Scholarship Programs', href: '/scholarships' },
    { name: 'Portuguese Classes', href: '/classes' },
    { name: 'Why Brazil', href: '/why-brazil' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Contact', href: '/contact' }
  ];

  // Scholarship benefits with icons
  const benefits = [
    { text: 'Free or affordable tuition', icon: GraduationCap },
    { text: 'Stipends for postgraduate students', icon: DollarSign },
    { text: 'Free/low-cost healthcare', icon: Heart },
    { text: 'Cultural diversity', icon: Globe },
    { text: 'Strong research institutions', icon: BookOpen },
    { text: 'Affordable cost of living', icon: MapPin }
  ];

  // Social media links
  const socialLinks = [
    { 
      name: 'Instagram', 
      icon: Instagram, 
      href: 'https://www.instagram.com/gefen.institute?igsh=MXY4ZHpjeDk2d3V6eQ==',
      color: 'hover:text-pink-500'
    },
    { 
      name: 'Facebook', 
      icon: Facebook, 
      href: 'https://www.facebook.com/share/17G3ZUvMaU/',
      color: 'hover:text-blue-600'
    },
    { 
      name: 'WhatsApp', 
      icon: MessageCircle, 
      href: 'https://wa.me/2348141254595',
      color: 'hover:text-[#00923F]'
    }
  ];

  // Animation variants - staggered container
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

  // Fade-up animation for sections
  const fadeUpVariants = {
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

  return (
    <footer 
      ref={footerRef}
      className="bg-gradient-to-b from-gray-50 to-gray-100 border-t-4 border-[#00923F]"
    >
      {/* Main Footer Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto px-6 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About Section */}
          <motion.section variants={fadeUpVariants} className="lg:col-span-1">
            <div className="mb-4">
              <img 
                src={assets.logo}
                alt="Gefen Institute Logo" 
                className="h-12 w-auto mb-4"
              />
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3">
                Study in <span className="text-[#00923F]">Brazil</span>
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm mb-4">
              Gefen Institute connects international students with fully funded 
              <strong> scholarships in Brazil</strong>. We provide comprehensive support for 
              students seeking <strong>Brazil postgraduate opportunities</strong> and undergraduate 
              programs through PEC-G and PEC-PG scholarship programs.
            </p>
            <p className="text-gray-600 text-sm">
              Empowering Nigerian students to <strong>study in Brazil</strong> since 2014.
            </p>
          </motion.section>

          {/* Quick Links */}
          <motion.nav 
            variants={fadeUpVariants} 
            aria-label="Footer navigation"
            className="lg:col-span-1"
          >
            <h3 className="font-serif text-xl font-bold text-gray-900 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className="text-gray-600 hover:text-[#00923F] transition-colors duration-200 text-sm flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" aria-hidden="true" />
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Scholarship Benefits */}
          <motion.section variants={fadeUpVariants} className="lg:col-span-1">
            <h3 className="font-serif text-xl font-bold text-gray-900 mb-4">
              Scholarship Benefits
            </h3>
            <ul className="space-y-3">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <IconComponent 
                      className="w-5 h-5 text-[#00923F] flex-shrink-0 mt-0.5" 
                      aria-hidden="true"
                    />
                    <span className="text-gray-600">{benefit.text}</span>
                  </li>
                );
              })}
            </ul>
            <p className="text-xs text-gray-500 mt-4 italic">
              Discover <strong>affordable studies in Brazil</strong> with comprehensive 
              <strong> Brazil postgraduate benefits</strong>.
            </p>
          </motion.section>

          {/* Contact & Social */}
          <motion.section variants={fadeUpVariants} className="lg:col-span-1">
            <h3 className="font-serif text-xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h3>
            
            {/* Contact Information */}
            <div className="space-y-3 mb-6">
              <a 
                href="mailto:info@gefeninstitute.com"
                className="flex items-center gap-3 text-gray-600 hover:text-[#00923F] transition-colors duration-200 text-sm"
              >
                <Mail className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                <span>gefeninstitute51@gmail.com</span>
              </a>
              
              <a 
                href="tel:+2348141254595"
                className="flex items-center gap-3 text-gray-600 hover:text-[#00923F] transition-colors duration-200 text-sm"
              >
                <Phone className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                <span>+234 814 125 4595</span>
              </a>
            </div>

            {/* Social Media Icons */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Follow Us</h4>
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      className={`text-gray-600 ${social.color} transition-colors duration-200`}
                      aria-label={`Follow us on ${social.name}`}
                    >
                      <IconComponent className="w-6 h-6" aria-hidden="true" />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <motion.a
              href="https://wa.me/2348141254595"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-[#00923F] text-white text-sm font-semibold rounded-full hover:bg-[#007a35] transition-colors duration-300"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              Chat with Us
            </motion.a>
          </motion.section>
        </div>
      </motion.div>

      {/* Bottom Copyright Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="bg-gray-900 text-gray-300 py-6 px-6"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-center md:text-left">
            © {currentYear} <strong className="text-white">Gefen Institute</strong>. All rights reserved.
          </p>
          <p className="text-center md:text-right">
            <strong className="text-white">Study in Brazil</strong> – International Student Portal
          </p>
        </div>

        {/* SEO-rich footer text */}
        <div className="max-w-7xl mx-auto mt-4 pt-4 border-t border-gray-800">
          <p className="text-xs text-gray-400 text-center leading-relaxed">
            <strong>Brazil scholarships for international students</strong> | 
            PEC-G Undergraduate Scholarships | 
            PEC-PG Postgraduate Funding | 
            Portuguese Language Training | 
            <strong> Affordable studies in Brazil</strong> | 
            Free Tuition Universities | 
            Student Success Stories
          </p>
        </div>
      </motion.div>
    </footer>
  );
}