import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Globe, 
  Users, 
  Award, 
  Star, 
  GraduationCap,
  Target,
  Heart,
  Handshake,
  Quote,
  ArrowRight,
  MapPin,
  CheckCircle
} from 'lucide-react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
const About = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const missions = [
    { icon: <GraduationCap className="w-8 h-8" />, text: "Fully Funded Scholarships in Brazil" },
    { icon: <BookOpen className="w-8 h-8" />, text: "Portuguese Language Training" },
    { icon: <Users className="w-8 h-8" />, text: "Guidance for Students & Professionals" }
  ];

  const recognitions = [
    { 
      icon: <Handshake className="w-10 h-10" />, 
      title: "Brazilian Embassy Partnership",
      desc: "Official meetings with Brazilian Ambassador fostering educational cooperation"
    },
    { 
      icon: <Globe className="w-10 h-10" />, 
      title: "Educational Forums",
      desc: "Active participation in international education and cultural exchange programs"
    },
    { 
      icon: <Award className="w-10 h-10" />, 
      title: "Institutional Collaboration",
      desc: "Working with Brazilian universities to facilitate student placements"
    }
  ];

  const testimonials = [
    {
      name: "Chinecherem Esther",
      program: "Accounting Student",
      university: "UFPA - Federal University of Pará",
      quote: "Gefen Institute prepared me thoroughly for the PEC-G exam. The Portuguese classes were excellent, and the scholarship guidance was invaluable. Now I'm studying Accounting in Brazil!",
      location: "Belém, Brazil"
    },
    {
      name: "Ekezie Basil",
      program: "Medical Student",
      university: "UFGD - Federal University of Grande Dourados",
      quote: "Thanks to Gefen Institute's comprehensive support, I secured a fully funded medical scholarship in Brazil. The instructors' expertise in Portuguese made all the difference in my journey.",
      location: "Dourados, Brazil"
    },
    {
      name: "Nkemjika Precious",
      program: "Nursing Student",
      university: "UFT - Federal University of Tocantins",
      quote: "The team at Gefen Institute guided me through every step of the PEC-G process. Their Portuguese training program is world-class, and now I'm pursuing my dream of becoming a nurse in Brazil.",
      location: "Palmas, Brazil"
    }
  ];

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <motion.div 
          className="max-w-5xl mx-auto text-center relative z-10"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            About Gefen Institute
          </h1>
          <p className="text-xl md:text-2xl text-emerald-50 max-w-3xl mx-auto leading-relaxed">
            Empowering Nigerian students with scholarships, language skills, and opportunities in Brazil.
          </p>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Our Mission
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              At Gefen Institute, we are dedicated to helping Nigerian students access fully funded scholarships in Brazil, 
              providing exceptional Portuguese language training, and guiding high school graduates, degree holders, and 
              professionals toward international academic success and cultural enrichment.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {missions.map((mission, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100"
              >
                <div className="text-emerald-600 mb-4 flex justify-center">
                  {mission.icon}
                </div>
                <p className="text-slate-700 text-center font-medium">
                  {mission.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
             <div className="order-2 md:order-1">
        <div className="rounded-2xl h-96 shadow-xl overflow-hidden">
          <img 
            src={assets.team} 
            alt="Gefen Institute Team" 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

            <div className="order-1 md:order-2">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                Our Story
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Gefen Institute was born from a vision to bridge the educational gap between Nigeria and Brazil, 
                  opening doors to world-class education for ambitious Nigerian students seeking international opportunities.
                </p>
                <p>
                  Founded by Professor Godson Igwe, a distinguished Portuguese language expert with years of experience 
                  in international education, the institute has become a beacon of hope for hundreds of students aspiring 
                  to study in Brazil through the prestigious PEC-G and PEC-PG scholarship programs.
                </p>
                <p>
                  What started as a small initiative has grown into a comprehensive educational institution that not only 
                  teaches Portuguese but also provides end-to-end guidance for scholarship applications, cultural preparation, 
                  and academic success in Brazil. Our success stories span across various fields from medicine to engineering, 
                  from nursing to business administration.
                </p>
                <p className="text-emerald-700 font-semibold">
                  Today, Gefen Institute stands as Nigeria's premier destination for students seeking to study in Brazil, 
                  with a proven track record of successful scholarship placements and academic excellence.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100"
          >
            <div className="md:flex">
              <div className="md:w-2/5 bg-gradient-to-br from-emerald-600 to-blue-600 p-12 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-48 h-48 rounded-full bg-white/20 backdrop-blur-sm mx-auto mb-6 flex items-center justify-center border-4 border-white/30">
                   <img src={assets.professor} alt="Professor Godson Igwe" className="w-40 h-40 rounded-full object-cover" />
                  </div>
                  <div className="flex justify-center gap-2">
                    <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
                    <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
                    <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
                  </div>
                </div>
              </div>

              <div className="md:w-3/5 p-10">
                <div className="mb-4">
                  <Award className="w-10 h-10 text-emerald-600 mb-4" />
                </div>
                <h3 className="text-3xl font-bold text-slate-800 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Professor Godson Igwe
                </h3>
                <p className="text-emerald-600 font-semibold mb-6 text-lg">
                  Founder & Lead Portuguese Instructor
                </p>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    Professor Godson Igwe is a distinguished educator with extensive experience in Portuguese language 
                    instruction and international educational exchange programs. His passion for connecting Nigerian 
                    students with global opportunities has transformed countless lives.
                  </p>
                  <p>
                    With years of dedicated service guiding students through the PEC-G and PEC-PG scholarship programs, 
                    Professor Igwe has established strong relationships with Brazilian educational institutions and 
                    embassy officials, ensuring smooth pathways for Nigerian students.
                  </p>
                  <p>
                    His leadership in academic and cultural exchange has earned recognition from both Nigerian and 
                    Brazilian educational communities, making Gefen Institute the trusted choice for students seeking 
                    Brazil scholarship opportunities.
                  </p>
                  <div className="flex items-center gap-2 text-emerald-700 font-semibold pt-4">
                    <CheckCircle className="w-5 h-5" />
                    <span>Certified Portuguese Language Expert</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                    <CheckCircle className="w-5 h-5" />
                    <span>International Education Consultant</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Recognition & Partnerships */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Recognition & Partnerships
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Building bridges between Nigeria and Brazil through official partnerships and educational collaboration.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8 mb-12"
          >
            {recognitions.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100"
              >
                <div className="text-emerald-600 mb-6 flex justify-center">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 text-center">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-center">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl p-8 shadow-xl"
          >
            <div className="flex items-center justify-center gap-4 text-white">
              <Handshake className="w-16 h-16" />
              <div>
                <p className="text-sm uppercase tracking-wider mb-1 opacity-90">Featured Partnership</p>
                <p className="text-2xl font-bold">
                  Professor Godson Igwe with Brazilian Ambassador and Officials
                </p>
                <p className="mt-2 opacity-90">
                  Strengthening educational ties and creating opportunities for Nigerian students in Brazil
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Student Success Stories */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Student Success Stories
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Real students, real dreams achieved. Discover how Gefen Institute has transformed lives through 
              Brazil scholarship opportunities and world-class Portuguese language training.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100"
              >
                <Quote className="w-10 h-10 text-emerald-600 mb-4 opacity-50" />
                <p className="text-slate-600 mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-slate-200 pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{testimonial.name}</p>
                      <p className="text-sm text-emerald-600">{testimonial.program}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 font-semibold mb-1">{testimonial.university}</p>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <MapPin className="w-4 h-4" />
                    <span>{testimonial.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-emerald-600 to-blue-600 text-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <Target className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Start Your Journey to Brazil Today
          </h2>
          <p className="text-xl text-emerald-50 mb-10 max-w-2xl mx-auto leading-relaxed">
            Whether you want a fully funded scholarship or world-class Portuguese training, 
            we're here to guide you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-emerald-600 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              <BookOpen className="w-5 h-5" />
              Enroll in Portuguese Classes
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            </Link>
              <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-emerald-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 border-2 border-white/30"
            >
              <GraduationCap className="w-5 h-5" />
              Seek Scholarship Guidance
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
    <Footer />
    </>
  );
};

export default About;