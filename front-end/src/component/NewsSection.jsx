// component/NewsSection.jsx
import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Calendar, 
  ArrowRight, 
  Eye,
  Clock,
  ChevronRight,
  Newspaper
} from 'lucide-react';
import { useNewsStore } from '../Store/newsStore';
import Navbar from './Navbar';
import Footer from "./Footer"

export default function NewsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const { news, isLoading, fetchNews } = useNewsStore();
  const [selectedNews, setSelectedNews] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch news on mount
  useEffect(() => {
    fetchNews(1, 6); // Fetch latest 6 news items
  }, [fetchNews]);

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Truncate text
  const truncateText = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  // Calculate reading time
  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  // Handle read more
  const handleReadMore = (newsItem) => {
    setSelectedNews(newsItem);
    setShowModal(true);
  };

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

  return (
    <>
    <Navbar />
      <section 
        id="pec-g-news"
        ref={sectionRef}
        aria-labelledby="news-heading"
        className="py-20 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2
              id="news-heading"
              className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4"
            >
              Latest <span className="text-[#00923F]">PEC-G Updates</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Stay informed with the latest news about Brazil scholarship programs, 
              PEC-G opportunities, and study abroad updates for Nigerian students.
            </p>
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded" />
                    <div className="h-4 bg-gray-200 rounded w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && news.length === 0 && (
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-2xl shadow-md p-12 text-center"
            >
              <Newspaper className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Updates Yet
              </h3>
              <p className="text-gray-600">
                Check back soon for the latest PEC-G scholarship updates and Brazil study abroad news.
              </p>
            </motion.div>
          )}

          {/* News Grid */}
          {!isLoading && news.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {news.map((newsItem) => (
                <motion.article
                  key={newsItem._id}
                  variants={itemVariants}
                  whileHover="hover"
                  className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col"
                >
                  <motion.div variants={cardHoverVariants}>
                    {/* Image */}
                    {newsItem.image ? (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={newsItem.image}
                          alt={newsItem.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-[#00923F] to-[#0037A3] flex items-center justify-center">
                        <Newspaper className="w-16 h-16 text-white/50" />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      {/* Meta */}
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" aria-hidden="true" />
                          <time dateTime={newsItem.createdAt}>
                            {formatDate(newsItem.createdAt)}
                          </time>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" aria-hidden="true" />
                          <span>{getReadingTime(newsItem.content)}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-[#00923F] transition-colors duration-200">
                        {newsItem.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                        {truncateText(newsItem.content)}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Eye className="w-4 h-4" aria-hidden="true" />
                          <span>{newsItem.views || 0} views</span>
                        </div>
                        
                        <button
                          onClick={() => handleReadMore(newsItem)}
                          className="text-[#00923F] font-semibold text-sm hover:text-[#007a35] transition-colors duration-200 flex items-center gap-1 group"
                          aria-label={`Read more about ${newsItem.title}`}
                        >
                          Read More
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.article>
              ))}
            </motion.div>
          )}

          {/* View All Button */}
          {!isLoading && news.length > 0 && (
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-center mt-12"
            >
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-[#00923F] text-white font-semibold rounded-full hover:bg-[#007a35] transition-all duration-300 shadow-lg hover:shadow-xl">
                View All Updates
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* News Detail Modal */}
      {showModal && selectedNews && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-900 bg-opacity-75"
              onClick={() => setShowModal(false)}
              aria-hidden="true"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            >
              {/* Header Image */}
              {selectedNews.image && (
                <div className="h-64 overflow-hidden">
                  <img
                    src={selectedNews.image}
                    alt={selectedNews.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-8 overflow-y-auto max-h-[calc(90vh-280px)]">
                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" aria-hidden="true" />
                    <time dateTime={selectedNews.createdAt}>
                      {formatDate(selectedNews.createdAt)}
                    </time>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" aria-hidden="true" />
                    <span>{getReadingTime(selectedNews.content)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" aria-hidden="true" />
                    <span>{selectedNews.views || 0} views</span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {selectedNews.title}
                </h1>

                {/* Content */}
                <article className="prose prose-lg max-w-none">
                  <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {selectedNews.content}
                  </div>
                </article>

                {/* Keywords for SEO */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-[#00923F]/10 text-[#00923F] px-3 py-1 rounded-full font-medium">
                      PEC-G Scholarship
                    </span>
                    <span className="text-xs bg-[#0037A3]/10 text-[#0037A3] px-3 py-1 rounded-full font-medium">
                      Study in Brazil
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">
                      Brazil Education
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-8 py-4 border-t border-gray-200 flex justify-between items-center">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Close
                </button>
                
                <a
                  href="#contact"
                  className="px-6 py-3 bg-[#00923F] text-white font-semibold rounded-lg hover:bg-[#007a35] transition-colors duration-200 flex items-center gap-2"
                >
                  Apply for Scholarship
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}