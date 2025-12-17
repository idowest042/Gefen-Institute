import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
export default function FAQ() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // FAQ data with SEO-rich content
  const faqs = [
    {
      id: 1,
      question: "Do I need to speak Portuguese to study in Brazil?",
      answer: "While some graduate programs offer courses in English, most undergraduate programs require Portuguese proficiency. Gefen Institute provides comprehensive Portuguese language training to prepare you for the CELPE-Bras proficiency exam, which is required for admission. Our intensive courses ensure you achieve the necessary language skills before starting your academic journey in Brazil. Many students start with basic Portuguese and become fluent within 6-12 months of dedicated study."
    },
    {
      id: 2,
      question: "Are scholarships fully funded or partially funded?",
      answer: "Brazil scholarships vary by program. PEC-G (undergraduate) scholarships cover tuition fees completely, but students are responsible for living expenses. PEC-PG (postgraduate) scholarships typically include both tuition waiver and monthly stipends ranging from R$1,500 to R$3,000, depending on the program level. CAPES and CNPq scholarships for master's and doctoral students provide full funding including stipends, health insurance, and research allowances. Gefen Institute helps you identify and apply for the best fully funded options available."
    },
    {
      id: 3,
      question: "How long does it take to get a Brazil student visa?",
      answer: "The Brazil student visa application process typically takes 4-8 weeks from submission to approval. However, you should start the process at least 3 months before your intended travel date to account for document preparation, authentication, and any potential delays. Required documents include your admission letter, proof of financial means, police clearance, and health certificate. Gefen Institute provides step-by-step guidance throughout the Brazil student visa application process to ensure smooth processing."
    },
    {
      id: 4,
      question: "Is healthcare free for international students in Brazil?",
      answer: "Yes! International students studying in Brazil have access to the country's public healthcare system (SUS - Sistema Único de Saúde) at no cost. This includes medical consultations, emergency care, vaccinations, and hospital treatments. Additionally, many universities provide on-campus health centers specifically for students. This is one of the major benefits of studying in Brazil compared to other countries where international student health insurance can be expensive."
    },
    {
      id: 5,
      question: "What documents do I need for scholarship application?",
      answer: "The international student requirements for Brazil scholarship applications typically include: high school diploma or bachelor's degree (authenticated and translated to Portuguese), academic transcripts, birth certificate, passport copy, Portuguese proficiency certificate (CELPE-Bras), letters of recommendation, statement of purpose, proof of financial means, medical certificate, and police clearance certificate. Some programs may require additional documents like research proposals or portfolio. Gefen Institute provides a comprehensive checklist and helps you prepare all required documentation correctly."
    },
    {
      id: 6,
      question: "How much does it cost to live in Brazil as a student?",
      answer: "Affordable living in Brazil makes it an attractive destination for international students. Monthly living costs typically range from R$1,500 to R$3,000 (approximately $300-$600 USD) depending on the city. This includes accommodation, food, transportation, and personal expenses. Major cities like São Paulo and Rio de Janeiro are more expensive, while smaller university towns offer very affordable options. Shared student housing costs around R$600-1,200 monthly, meals at university cafeterias cost R$5-15, and public transportation passes are around R$150-200. Many postgraduate scholarships provide stipends that comfortably cover these expenses."
    },
    {
      id: 7,
      question: "Can I work while studying in Brazil?",
      answer: "International students in Brazil on a student visa are generally not permitted to work off-campus during their studies. However, you may participate in internships, research assistantships, or teaching assistantships related to your field of study, which often come with modest stipends. Many postgraduate programs include funded research positions. After graduation, you can apply for a work visa if you secure employment. It's important to focus on your studies during your scholarship program to maintain good academic standing."
    },
    {
      id: 8,
      question: "What is the academic calendar in Brazil?",
      answer: "The Brazilian academic year typically runs from February to December, divided into two semesters. The first semester starts in late February or early March and ends in June/July, followed by a winter break. The second semester runs from August to December, with a longer summer break from December to February. Some universities operate on a trimester system. Most PEC-G and PEC-PG programs have application deadlines in the preceding year (September-November) for admission the following February. Gefen Institute helps you plan your application timeline to meet all important deadlines."
    },
    {
      id: 9,
      question: "Do Brazilian universities accept international students easily?",
      answer: "Brazilian federal universities actively welcome international students through government programs like PEC-G and PEC-PG. These programs are specifically designed to promote educational exchange with developing countries, particularly African nations. Admission requirements focus on academic merit, Portuguese proficiency, and meeting program-specific criteria. Competition varies by program and university, but with proper preparation, strong academic records, and guidance from Gefen Institute, Nigerian students have excellent acceptance rates. Many universities have dedicated international offices to support foreign students throughout their studies."
    },
    {
      id: 10,
      question: "How do stipends for postgraduate students work?",
      answer: "Brazil postgraduate funding through PEC-PG, CAPES, or CNPq scholarships provides monthly stipends deposited directly to your Brazilian bank account. Master's students typically receive R$1,500-2,000 monthly, while doctoral students receive R$2,200-3,000. These stipends are tax-free and designed to cover living expenses including accommodation, food, transportation, and study materials. Payments begin once you're enrolled and continue for the duration of your program (24 months for master's, 48 months for doctorate). Some programs also provide additional allowances for research materials, conference attendance, or fieldwork expenses."
    }
  ];

  // Filter FAQs based on search query
  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Toggle accordion
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Animation variants for section header
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

  // Staggered container for FAQ items
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

  // Fade-up animation for FAQ items
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
      id="faq" 
      ref={sectionRef}
      aria-labelledby="faq-heading"
      className="py-20 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="faq-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="2" fill="#00923F" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#faq-pattern)" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headerVariants}
          className="text-center mb-12"
        >
          <h2
            id="faq-heading"
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4"
          >
            Frequently Asked <span className="text-[#00923F]">Questions</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Everything you need to know about studying in Brazil as an international student.
          </p>

          {/* Search Bar */}
          <motion.div
            variants={headerVariants}
            className="relative max-w-xl mx-auto"
          >
            <Search 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-full focus:border-[#00923F] focus:outline-none transition-colors duration-300 text-gray-700"
              aria-label="FAQ search"
            />
          </motion.div>
        </motion.div>

        {/* FAQ Accordion List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-4"
        >
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <motion.article
                key={faq.id}
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                {/* Question Button */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${faq.id}`}
                  aria-label={`Toggle answer for: ${faq.question}`}
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown 
                      className="w-6 h-6 text-[#00923F]" 
                      aria-hidden="true"
                    />
                  </motion.div>
                </button>

                {/* Answer Content with Animation */}
                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      id={`faq-answer-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: "auto", 
                        opacity: 1,
                        transition: {
                          height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                          opacity: { duration: 0.3, delay: 0.1 }
                        }
                      }}
                      exit={{ 
                        height: 0, 
                        opacity: 0,
                        transition: {
                          height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                          opacity: { duration: 0.2 }
                        }
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2">
                        <p className="text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-500 text-lg">
                No questions found matching "{searchQuery}". Try different keywords.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center bg-gradient-to-r from-[#00923F] to-[#0037A3] rounded-2xl p-8 sm:p-10"
        >
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">
            Still Have Questions?
          </h3>
          <p className="text-lg text-white/90 mb-6">
            Our team is ready to provide personalized guidance for your study abroad journey.
          </p>
          <motion.a
            href="https://wa.me/2348141254595"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#00923F] font-semibold rounded-full hover:bg-gray-100 transition-colors duration-300 text-lg"
          >
            Chat with Us on WhatsApp
            <svg 
              className="w-5 h-5 ml-2" 
              fill="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
    <Footer />
    </>
  );
}