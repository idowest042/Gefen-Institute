// Pages/AdminNewsManager.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Eye, 
  X,
  Image as ImageIcon,
  Calendar,
  FileText,
  Save,
  Loader,
  Upload,
  Link as LinkIcon
} from 'lucide-react';
import { useNewsStore } from '../Store/newsStore';
import { axiosInstance } from '../lib/axios';
import {toast} from 'react-toastify';
import AdminNavbar from '../components/AdminNavbar';


export default function AdminNewsManager() {
  const {
    news,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    pagination,
    fetchNews,
    createNews,
    updateNews,
    deleteNews
  } = useNewsStore();

  const [showModal, setShowModal] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [uploadMode, setUploadMode] = useState('upload'); // 'upload' or 'url'
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    isPublished: true
  });

  // Fetch news on mount
  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle image file selection
  const handleImageSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    // Show preview immediately
    const previewReader = new FileReader();
    previewReader.onloadend = () => {
      setImagePreview(previewReader.result);
    };
    previewReader.readAsDataURL(file);

    // Upload to server
    setIsUploading(true);
    try {
      const uploadReader = new FileReader();
      uploadReader.onloadend = async () => {
        try {
          const response = await axiosInstance.post('/upload/image', {
            image: uploadReader.result
          });
          
          setFormData(prev => ({
            ...prev,
            image: response.data.imageUrl
          }));
          
          toast.success('Image uploaded successfully!');
        } catch (error) {
          console.error('Upload error:', error);
          toast.error(error.response?.data?.message || 'Failed to upload image');
          setImagePreview(null);
        } finally {
          setIsUploading(false);
        }
      };
      uploadReader.readAsDataURL(file);
    } catch (error) {
      setIsUploading(false);
      toast.error('Failed to upload image');
      setImagePreview(null);
    }
  };

  // Remove uploaded image
  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, image: '' }));
    setImagePreview(null);
  };

  // Open modal for creating new news
  const handleCreateNew = () => {
    setEditingNews(null);
    setFormData({
      title: '',
      content: '',
      image: '',
      isPublished: true
    });
    setImagePreview(null);
    setShowModal(true);
    setPreviewMode(false);
    setUploadMode('upload');
  };

  // Open modal for editing
  const handleEdit = (newsItem) => {
    setEditingNews(newsItem);
    setFormData({
      title: newsItem.title,
      content: newsItem.content,
      image: newsItem.image || '',
      isPublished: newsItem.isPublished
    });
    setImagePreview(newsItem.image || null);
    setShowModal(true);
    setPreviewMode(false);
    setUploadMode('upload');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content) {
      toast.error('Title and content are required');
      return;
    }

    let success;
    if (editingNews) {
      success = await updateNews(editingNews._id, formData);
    } else {
      success = await createNews(formData);
    }

    if (success) {
      setShowModal(false);
      setFormData({
        title: '',
        content: '',
        image: '',
        isPublished: true
      });
      setImagePreview(null);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    const success = await deleteNews(id);
    if (success) {
      setDeleteConfirm(null);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filter news based on search
  const filteredNews = news.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
    <AdminNavbar />
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          PEC-G News & Updates
        </h1>
        <p className="text-gray-600">
          Manage scholarship program updates and announcements
        </p>
      </div>

      {/* Actions Bar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none transition-colors duration-200"
          />
        </div>

        {/* Create Button */}
        <button
          onClick={handleCreateNew}
          className="px-6 py-3 bg-[#00923F] text-white font-semibold rounded-lg hover:bg-[#007a35] transition-colors duration-200 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create News
        </button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Loader className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredNews.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No news found
          </h3>
          <p className="text-gray-600 mb-6">
            {searchQuery ? 'Try adjusting your search' : 'Create your first news update'}
          </p>
          {!searchQuery && (
            <button
              onClick={handleCreateNew}
              className="px-6 py-3 bg-[#00923F] text-white font-semibold rounded-lg hover:bg-[#007a35] transition-colors duration-200"
            >
              Create News
            </button>
          )}
        </div>
      )}

      {/* News Grid */}
      {!isLoading && filteredNews.length > 0 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredNews.map((newsItem) => (
            <motion.article
              key={newsItem._id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Image */}
              {newsItem.image ? (
                <div className="h-48 overflow-hidden">
                  <img
                    src={newsItem.image}
                    alt={newsItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-48 bg-gradient-to-br from-[#00923F] to-[#0037A3] flex items-center justify-center">
                  <ImageIcon className="w-16 h-16 text-white/50" />
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    {formatDate(newsItem.createdAt)}
                  </span>
                  {newsItem.isPublished ? (
                    <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      Published
                    </span>
                  ) : (
                    <span className="ml-auto text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                      Draft
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {newsItem.title}
                </h3>

                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {newsItem.content}
                </p>

                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <Eye className="w-4 h-4" />
                  <span>{newsItem.views || 0} views</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(newsItem)}
                    className="flex-1 px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(newsItem._id)}
                    disabled={isDeleting}
                    className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:bg-gray-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      )}

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-gray-900 bg-opacity-75"
                onClick={() => setShowModal(false)}
              />

              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              >
                {/* Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">
                    {editingNews ? 'Edit News' : 'Create New News'}
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPreviewMode(!previewMode)}
                      className="px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                    >
                      {previewMode ? 'Edit' : 'Preview'}
                    </button>
                    <button
                      onClick={() => setShowModal(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                  {previewMode ? (
                    /* Preview Mode */
                    <div className="prose max-w-none">
                      {formData.image && (
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="w-full h-64 object-cover rounded-lg mb-6"
                        />
                      )}
                      <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        {formData.title || 'Untitled'}
                      </h1>
                      <div className="text-gray-600 whitespace-pre-wrap">
                        {formData.content || 'No content yet...'}
                      </div>
                    </div>
                  ) : (
                    /* Edit Mode */
                    <div className="space-y-6">
                      {/* Title */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Title *
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          required
                          placeholder="Enter news title"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none transition-colors duration-200"
                        />
                      </div>

                      {/* Image Upload/URL Section */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Image (optional)
                        </label>
                        
                        {/* Toggle between upload and URL */}
                        <div className="flex gap-2 mb-4">
                          <button
                            type="button"
                            onClick={() => setUploadMode('upload')}
                            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                              uploadMode === 'upload'
                                ? 'bg-[#00923F] text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            <Upload className="w-4 h-4 inline mr-2" />
                            Upload Image
                          </button>
                          <button
                            type="button"
                            onClick={() => setUploadMode('url')}
                            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                              uploadMode === 'url'
                                ? 'bg-[#00923F] text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            <LinkIcon className="w-4 h-4 inline mr-2" />
                            Image URL
                          </button>
                        </div>

                        {/* Upload Mode */}
                        {uploadMode === 'upload' && (
                          <div>
                            {!formData.image ? (
                              <label className="block">
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleImageSelect}
                                  className="hidden"
                                  disabled={isUploading}
                                />
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#00923F] transition-colors duration-200 cursor-pointer">
                                  {isUploading ? (
                                    <div className="flex flex-col items-center">
                                      <Loader className="w-12 h-12 text-[#00923F] animate-spin mb-3" />
                                      <p className="text-gray-600">Uploading...</p>
                                    </div>
                                  ) : (
                                    <div className="flex flex-col items-center">
                                      <ImageIcon className="w-12 h-12 text-gray-400 mb-3" />
                                      <p className="text-gray-600 mb-1">
                                        Click to upload or drag and drop
                                      </p>
                                      <p className="text-sm text-gray-500">
                                        PNG, JPG, WEBP up to 5MB
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </label>
                            ) : (
                              <div className="relative">
                                <img
                                  src={imagePreview || formData.image}
                                  alt="Preview"
                                  className="w-full h-64 object-cover rounded-lg"
                                />
                                <button
                                  type="button"
                                  onClick={handleRemoveImage}
                                  className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-200"
                                >
                                  <X className="w-5 h-5" />
                                </button>
                              </div>
                            )}
                          </div>
                        )}

                        {/* URL Mode */}
                        {uploadMode === 'url' && (
                          <div>
                            <input
                              type="url"
                              name="image"
                              value={formData.image}
                              onChange={handleChange}
                              placeholder="https://example.com/image.jpg"
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none transition-colors duration-200"
                            />
                            {formData.image && (
                              <div className="mt-4 relative">
                                <img
                                  src={formData.image}
                                  alt="Preview"
                                  className="w-full h-48 object-cover rounded-lg"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                    toast.error('Invalid image URL');
                                  }}
                                />
                                <button
                                  type="button"
                                  onClick={handleRemoveImage}
                                  className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-200"
                                >
                                  <X className="w-5 h-5" />
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Content *
                        </label>
                        <textarea
                          name="content"
                          value={formData.content}
                          onChange={handleChange}
                          required
                          rows={12}
                          placeholder="Enter news content..."
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none transition-colors duration-200 resize-none"
                        />
                        <p className="text-sm text-gray-500 mt-2">
                          {formData.content.length} characters
                        </p>
                      </div>

                      {/* Published Status */}
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="isPublished"
                          name="isPublished"
                          checked={formData.isPublished}
                          onChange={handleChange}
                          className="w-5 h-5 text-[#00923F] border-gray-300 rounded focus:ring-[#00923F]"
                        />
                        <label htmlFor="isPublished" className="text-sm font-semibold text-gray-700">
                          Publish immediately
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isCreating || isUpdating || !formData.title || !formData.content || isUploading}
                    className="px-6 py-3 bg-[#00923F] text-white font-semibold rounded-lg hover:bg-[#007a35] transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {(isCreating || isUpdating) ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        {editingNews ? 'Update' : 'Create'}
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-gray-900 bg-opacity-75"
                onClick={() => setDeleteConfirm(null)}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative bg-white rounded-2xl shadow-xl max-w-md w-full"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 bg-red-100 rounded-full p-3">
                      <Trash2 className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Delete News
                      </h3>
                      <p className="text-gray-600">
                        Are you sure you want to delete this news? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(deleteConfirm)}
                    disabled={isDeleting}
                    className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:bg-gray-400"
                  >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
}