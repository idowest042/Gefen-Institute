import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import { assets } from '../assets/assets';
export default function Testimonials() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Real testimonials from Nigerian students studying in Brazil
  const testimonials = [
      {
        id: 1,
        name: "Ekezie Basil Chukwudi",
        course: "Medical Student",
        university: "Universidade Federal da Grande Dourados (UFGD).",
        image: assets.chukwu,
        text: "I chose to study in Brazil because the education here is something else. The country is really invested in education, and they make sure students don’t struggle while studying. As an international student, I even get free check-ups, free drugs, and health support that make life easier. Before coming, I trained with Gefen Institute in Nigeria, and the lessons I received there made my transition smoother. When I arrived in Brazil, everything was clearer and it helped me interact better with people. At my university, all the learning materials are provided, the library has everything we need and academic support is to the fullest. What I love most is that the school also gives us opportunities to take part in international activities and sponsors students to travel abroad for these programs.",
        rating: 5
      },
      {
        id: 2,
        name: "Nkemjika Precious",
        course: "Nursing Student",
        university: "Universidade Federal de Tocantins, Palmas.",
        image: assets.precious,
        text: "Brazil is such a welcoming country with diverse cultures, and studying here has truly changed the way I view the world. My nursing program is special because I get to do a lot of practicals, and the professors are very professional, patient, and attentive, especially with foreigners. I’ve met so many international students, and the environment here really brings out the best in you. I am very grateful to Gefen Institute and Professor Godson for facilitating my journey to Brazil and helping me settle in smoothly.",
        rating: 5
      },
      {
        id: 3,
        name: "Bethel Ofoehwe",
        course: "Nursing",
        university: "Universidade Federal da Fronteira SulChapeco campus (UFFS)",
        image: assets.bethel,
        text: "What I cherish most about studying in brazil is connecting with people from different countries, speaking portuguese with locals, enjoying brazilian food, and building a better life, not just for myself but also to support my family and friends.",
        rating: 5
      },
    ];

  // Auto-rotate carousel every 7 seconds (unless paused)
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);

  // Navigate to previous testimonial
  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Navigate to next testimonial
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
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

  // Animation variants for testimonial cards (slide and fade)
  const cardVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const [direction, setDirection] = useState(0);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    if (newDirection === 1) {
      handleNext();
    } else {
      handlePrevious();
    }
  };

  return (
    <>
    <Navbar />
    <section 
      id="testimonials" 
      ref={sectionRef}
      aria-labelledby="testimonials-heading"
      className="py-20 px-4 sm:px-6 bg-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headerVariants}
          className="text-center mb-16"
        >
          <h2
            id="testimonials-heading"
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4"
          >
            Student <span className="text-[#00923F]">Testimonials</span>
          </h2>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto">
            Hear what Nigerian students in Brazil are saying about their journey.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div 
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.article
              key={currentIndex}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl p-8 sm:p-12 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-8 left-8 opacity-10">
                <Quote className="w-20 h-20 text-[#00923F]" aria-hidden="true" />
              </div>

              <div className="relative z-10">
                {/* Student Info Header */}
                <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                  {/* Profile Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={`${testimonials[currentIndex].name} - ${testimonials[currentIndex].course} student`}
                      className="w-24 h-24 rounded-full object-cover border-4 border-[#00923F] shadow-lg"
                    />
                  </div>

                  {/* Student Details */}
                  <div className="text-center sm:text-left">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {testimonials[currentIndex].name}
                    </h3>
                    <p className="text-[#00923F] font-semibold text-lg mb-1">
                      {testimonials[currentIndex].course}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {testimonials[currentIndex].university}
                    </p>
                    
                    {/* Star Rating */}
                    <div className="flex items-center justify-center sm:justify-start gap-1 mt-2">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="w-5 h-5 fill-[#F6D500] text-[#F6D500]" 
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-lg text-gray-700 leading-relaxed italic">
                  "{testimonials[currentIndex].text}"
                </blockquote>
              </div>
            </motion.article>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              onClick={() => paginate(-1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-[#00923F] text-white p-3 rounded-full shadow-lg hover:bg-[#007a35] transition-colors duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" aria-hidden="true" />
            </motion.button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? 'bg-[#00923F] w-8 h-3'
                      : 'bg-gray-300 w-3 h-3 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-current={index === currentIndex ? 'true' : 'false'}
                />
              ))}
            </div>

            <motion.button
              onClick={() => paginate(1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-[#00923F] text-white p-3 rounded-full shadow-lg hover:bg-[#007a35] transition-colors duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" aria-hidden="true" />
            </motion.button>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
            Join hundreds of successful Nigerian students already studying in Brazil. 
            Your <strong>PEC-G scholarship story</strong> starts with Gefen Institute.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center px-8 py-4 bg-[#00923F] text-white font-semibold rounded-full hover:bg-[#007a35] transition-colors duration-300 text-lg shadow-lg"
          >
            Start Your Journey Today
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
        </motion.div>

        {/* SEO-rich footer text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 text-center text-gray-600 text-sm max-w-4xl mx-auto"
        >
          <p className="leading-relaxed">
            These <strong>Brazil student experiences</strong> showcase the transformative power of 
            international education. Our <strong>Nigerian students in Brazil</strong> have successfully 
            navigated the <strong>PEC-G scholarship</strong> process and are thriving academically and 
            personally. Read more <strong>student success stories</strong> and discover how Gefen Institute 
            can help you achieve your dream of <strong>studying in Brazil</strong>.
          </p>
        </motion.div>
      </div>
    </section>
    <Footer/>
    </>
  );
}