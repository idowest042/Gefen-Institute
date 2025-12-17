import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { assets } from '../assets/assets';

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Update document meta tags for SEO
  useEffect(() => {
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Learn about Gefen Institute — helping Nigerian students access fully funded scholarships in Brazil through PEC-G and PEC-PG programs, with expert Portuguese language training by Professor Godson Igwe.'
      );
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'About Gefen Institute | Study in Brazil Scholarships & Portuguese Training');
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 
        'Gefen Institute connects Nigerian students to Brazilian scholarships and provides expert Portuguese training under Professor Godson Igwe\'s guidance.'
      );
    }

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      ogImage.setAttribute('content', assets.professor);
    }
  }, []);

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 px-6 bg-gray-50"
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
            variants={fadeUpVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4"
          >
            About <span className="text-[#00923F]">Gefen Institute</span>
          </motion.h2>
          <motion.p
            variants={fadeUpVariants}
            className="text-xl sm:text-2xl text-gray-600 font-medium"
          >
            Empowering Students to Study in Brazil and Succeed Globally
          </motion.p>
        </motion.div>

        {/* Main Content - Two Column Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
        >
          {/* Left - Image */}
          <motion.div
            variants={imageVariants}
            className="order-2 lg:order-1"
          >
            <img
              src={assets.student}
              alt="Students learning Portuguese at Gefen Institute"
              className="w-full h-auto rounded-2xl shadow-2xl object-cover"
            />
          </motion.div>

          {/* Right - Text Content */}
          <motion.div
            variants={fadeUpVariants}
            className="order-1 lg:order-2 space-y-6"
          >
            <p className="text-lg text-gray-700 leading-relaxed">
              Gefen Institute is an educational organization dedicated to helping students 
              access <strong>fully funded scholarships in Brazil</strong> while preparing them 
              with <strong>Portuguese language training</strong> for study, work, and global opportunities.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Founded by <strong>Professor Godson Igwe</strong>, a renowned Portuguese language 
              expert and cultural ambassador, Gefen Institute has guided countless Nigerian students 
              through Brazil's <strong>PEC-G (Undergraduate)</strong> and <strong>PEC-PG (Postgraduate)</strong> scholarship 
              programs.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Our mission is to simplify your journey to Brazil — providing step-by-step 
              scholarship guidance, intensive language training, and cultural orientation that 
              ensures you not only gain admission but thrive academically and professionally in Brazil.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              We believe that <strong>studying in Brazil</strong> isn't just about education — 
              it's about growth, opportunity, and global exposure.
            </p>
          </motion.div>
        </motion.div>

        {/* Founder Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="bg-white rounded-2xl shadow-xl p-8 sm:p-12"
        >
          <motion.h3
            variants={fadeUpVariants}
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center"
          >
            Meet Our Founder — <span className="text-[#0037A3]">Professor Godson Igwe</span>
          </motion.h3>

          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Founder Image */}
            <motion.div
              variants={imageVariants}
              className="flex-shrink-0"
            >
              <img
                src={assets.professor}
                alt="Professor Godson Igwe - Founder of Gefen Institute"
                className="w-48 h-48 rounded-full object-cover shadow-lg border-4 border-[#00923F]"
              />
            </motion.div>

            {/* Founder Bio */}
            <motion.div
              variants={fadeUpVariants}
              className="flex-1 text-center md:text-left"
            >
              <h4 className="text-2xl font-bold text-gray-900 mb-2">
                Professor Godson Igwe
              </h4>
              <p className="text-[#00923F] font-semibold mb-4 text-lg">
                Founder & Portuguese Language Expert
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Professor Godson Igwe's passion for education and cultural exchange has helped 
                hundreds of students secure scholarships and integrate into Brazilian life successfully. 
                With years of experience in Portuguese language instruction and deep connections 
                within Brazil's academic community, he has become a trusted guide for Nigerian 
                students seeking world-class education abroad.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8"
        >
          <motion.div
            variants={fadeUpVariants}
            className="text-center p-6 bg-white rounded-xl shadow-md"
          >
            <div className="text-4xl sm:text-5xl font-bold text-[#00923F] mb-2">500+</div>
            <p className="text-gray-600 font-medium">Students Guided</p>
          </motion.div>

          <motion.div
            variants={fadeUpVariants}
            className="text-center p-6 bg-white rounded-xl shadow-md"
          >
            <div className="text-4xl sm:text-5xl font-bold text-[#0037A3] mb-2">10+</div>
            <p className="text-gray-600 font-medium">Years of Experience</p>
          </motion.div>

          <motion.div
            variants={fadeUpVariants}
            className="text-center p-6 bg-white rounded-xl shadow-md"
          >
            <div className="text-4xl sm:text-5xl font-bold text-[#F6D500] mb-2">95%</div>
            <p className="text-gray-600 font-medium">Success Rate</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}