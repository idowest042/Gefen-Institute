import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  MessageCircle,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import {axiosInstance} from '../lib/axios'; // ✅ ADD THIS IMPORT
import {toast }from 'react-toastify'; // ✅ ADD THIS IMPORT

export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Form state
  const [formData, setFormData] = useState({
    FullName: '',
    Email: '',
    Mobile_Number: '',
    Subject: '',
    Message: ''
  });

  // ✅ REMOVE duplicate states - keep only one
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ REMOVE formStatus - you're using toast instead
  // const [formStatus, setFormStatus] = useState({...});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
   
    try {
      const response = await axiosInstance.post('/user/message', formData);
      
      if (response.data) {
        toast.success('Message sent successfully! We\'ll get back to you soon.');
        
        // Reset form after submission
        setFormData({
          FullName: '',
          Email: '',
          Subject: '',
          Message: '',
          Mobile_Number: Number(formData.Mobile_Number),
        });
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Contact form error:', error?.response?.data || error.message);
      toast.error(
        error?.response?.data?.message || 
        error?.response?.data?.msg || 
        'Failed to send message. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Contact information
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      content: 'Lagos, Nigeria',
      link: null
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+234 814 125 4595',
      link: 'tel:+2348141254595'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'gefeninstitute51@gmail.com',
      link: 'mailto:gefeninstitute51@gmail.com'
    }
  ];

  // Social media links
  const socialLinks = [
    { 
      name: 'Instagram', 
      icon: Instagram, 
      href: 'https://www.instagram.com/gefen.institute?igsh=MXY4ZHpjeDk2d3V6eQ==',
      color: 'hover:bg-pink-500'
    },
    { 
      name: 'WhatsApp', 
      icon: MessageCircle, 
      href: 'https://wa.me/2348141254595',
      color: 'hover:bg-[#00923F]'
    },
    { 
      name: 'Facebook', 
      icon: Facebook, 
      href: 'https://www.facebook.com/share/17G3ZUvMaU/',
      color: 'hover:bg-blue-600'
    },
  ];

  // Animation variants
  const headerVariants = {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <>
      <Navbar />
      <section 
        id="contact" 
        ref={sectionRef}
        aria-labelledby="contact-heading"
        className="py-20 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
      >
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="contact-pattern" width="50" height="50" patternUnits="userSpaceOnUse">
                <circle cx="25" cy="25" r="2" fill="#00923F" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#contact-pattern)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={headerVariants}
            className="text-center mb-16"
          >
            <h2
              id="contact-heading"
              className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4"
            >
              Contact <span className="text-[#00923F]">Us</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              We're here to help you start your journey to study in Brazil.
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {/* Contact Form - Left Column */}
            <motion.div variants={itemVariants}>
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Send us a Message
                </h3>

                <div className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label 
                      htmlFor="FullName" 
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="FullName"
                      name="FullName"
                      value={formData.FullName}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#00923F] focus:outline-none transition-colors duration-300 disabled:bg-gray-50 disabled:cursor-not-allowed"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label 
                      htmlFor="Email" 
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="Email"
                      name="Email"
                      value={formData.Email}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#00923F] focus:outline-none transition-colors duration-300 disabled:bg-gray-50 disabled:cursor-not-allowed"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label 
                      htmlFor="Mobile_Number" 
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="Mobile_Number"
                      name="Mobile_Number"
                      value={formData.Mobile_Number}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#00923F] focus:outline-none transition-colors duration-300 disabled:bg-gray-50 disabled:cursor-not-allowed"
                      placeholder="+234 XXX XXX XXXX"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label 
                      htmlFor="Subject" 
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Subject *
                    </label>
                    <select
                      id="Subject"
                      name="Subject"
                      value={formData.Subject}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#00923F] focus:outline-none transition-colors duration-300 disabled:bg-gray-50 disabled:cursor-not-allowed"
                    >
                      <option value="">Select a subject</option>
                      <option value="scholarship">Scholarship Inquiry</option>
                      <option value="portuguese">Portuguese Classes</option>
                      <option value="admission">Admission Guidance</option>
                      <option value="general">General Support</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label 
                      htmlFor="Message" 
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="Message"
                      name="Message"
                      value={formData.Message}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      rows={5}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#00923F] focus:outline-none transition-colors duration-300 resize-none disabled:bg-gray-50 disabled:cursor-not-allowed"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className={`w-full px-6 py-4 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                      isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-[#00923F] hover:bg-[#007a35]'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" aria-hidden="true" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Contact Information - Right Column */}
            <motion.div variants={itemVariants} className="space-y-6">
              {/* Contact Info Cards */}
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  const content = info.link ? (
                    <a 
                      href={info.link}
                      className="text-gray-700 hover:text-[#00923F] transition-colors duration-200"
                    >
                      {info.content}
                    </a>
                  ) : (
                    <span className="text-gray-700">{info.content}</span>
                  );

                  return (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4"
                    >
                      <div className="flex-shrink-0 bg-[#00923F] rounded-full p-3">
                        <IconComponent className="w-6 h-6 text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{info.title}</h4>
                        {content}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Follow Us</h4>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social) => {
                    const IconComponent = social.icon;
                    return (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-3 bg-gray-100 text-gray-700 rounded-lg transition-all duration-300 ${social.color} hover:text-white`}
                        aria-label={`Follow us on ${social.name}`}
                      >
                        <IconComponent className="w-6 h-6" aria-hidden="true" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-gradient-to-br from-[#00923F] to-[#0037A3] rounded-xl shadow-md p-6 text-white">
                <h4 className="font-serif text-2xl font-bold mb-3">
                  Quick Response Guaranteed
                </h4>
                <p className="text-white/90 mb-4">
                  We typically respond to all <strong>Brazil student inquiries</strong> within 24 hours. 
                  For urgent matters regarding <strong>Brazil scholarships</strong> or 
                  <strong> study in Brazil support</strong>, contact us via WhatsApp for immediate assistance.
                </p>
                <motion.a
                  href="https://wa.me/2348141254595"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#00923F] font-semibold rounded-full hover:bg-gray-100 transition-colors duration-300"
                >
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                  Chat Now
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
}