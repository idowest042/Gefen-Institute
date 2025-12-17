import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import useAdminData from '../Store/adminStore';

export default function AdminMessages() {
  const { 
    adminData, 
    FetchingAdminData, 
    DeleteMessage, 
    FetchById, 
    fetchAdminData, 
    deleteMessage, 
    fetchById 
  } = useAdminData();

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch messages on component mount
  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  // Handle reload/refresh
  const handleReload = async () => {
    setIsRefreshing(true);
    try {
      await fetchAdminData();
    } finally {
      // Keep spinner visible for minimum 500ms for better UX
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  // Handle view message
  const handleViewMessage = (messageId) => {
    const message = adminData?.find(msg => msg._id === messageId);
    setSelectedMessage(message);
    setShowModal(true);
    fetchById(messageId);
  };

  // Handle close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMessage(null);
  };

  // Handle delete confirmation
  const handleDeleteClick = (messageId) => {
    setDeleteConfirm(messageId);
  };

  // Confirm delete
  const confirmDelete = () => {
    if (deleteConfirm) {
      deleteMessage(deleteConfirm);
      setDeleteConfirm(null);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filter messages
  const filteredMessages = (adminData || []).filter(msg => 
    msg.FullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.Email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.Subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.Message?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.Mobile_Number
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Messages</h1>
          <p className="text-gray-600">Manage messages from students and inquiries</p>
        </div>
        
        {/* Reload Button */}
        <button
          onClick={handleReload}
          disabled={FetchingAdminData || isRefreshing}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
          aria-label="Reload messages"
        >
          <RefreshCw 
            className={`w-5 h-5 ${(FetchingAdminData || isRefreshing) ? 'animate-spin' : ''}`}
          />
          <span>{(FetchingAdminData || isRefreshing) ? 'Reloading...' : 'Reload'}</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-11 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none transition-colors duration-200"
          />
          <svg 
            className="absolute left-3 top-3.5 w-5 h-5 text-gray-400"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Loading State */}
      {FetchingAdminData && !isRefreshing && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-3" />
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-3/4" />
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!FetchingAdminData && filteredMessages.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <svg 
            className="w-16 h-16 text-gray-400 mx-auto mb-4"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No messages found</h3>
          <p className="text-gray-600">
            {searchQuery ? 'Try adjusting your search criteria' : 'No contact messages yet'}
          </p>
        </div>
      )}

      {/* Messages List */}
      {!FetchingAdminData && filteredMessages.length > 0 && (
        <div className="space-y-4">
          {filteredMessages.map((message) => (
            <div 
              key={message._id} 
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {message.FullName || message.fullName || 'Unknown'}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {formatDate(message.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      {message.Email || message.email || 'No email'}
                    </p>
                    {(message.Subject || message.subject) && (
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Subject: {message.Subject || message.subject}
                      </p>
                    )}
                    <p className="text-gray-700 line-clamp-2">
                      {message.Message || message.message || 'No message content'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleViewMessage(message._id)}
                      className="px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-200"
                      aria-label={`View message from ${message.FullName || message.fullName}`}
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDeleteClick(message._id)}
                      disabled={DeleteMessage}
                      className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                      aria-label={`Delete message from ${message.FullName || message.fullName}`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View Message Modal */}
      {showModal && selectedMessage && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75"
              onClick={handleCloseModal}
              aria-hidden="true"
            />

            {/* Modal */}
            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              {/* Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">Message Details</h3>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    aria-label="Close modal"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="px-6 py-6">
                {FetchById ? (
                  <div className="space-y-4 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="h-20 bg-gray-200 rounded" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">From</label>
                      <p className="text-gray-900">{selectedMessage.FullName || selectedMessage.fullName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                      <p className="text-gray-900">{selectedMessage.Email || selectedMessage.email}</p>
                    </div>
                    {(selectedMessage.Phone || selectedMessage.phone) && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                        <p className="text-gray-900">{selectedMessage.Phone || selectedMessage.phone}</p>
                      </div>
                    )}
                    {(selectedMessage.Subject || selectedMessage.subject) && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Subject</label>
                        <p className="text-gray-900">{selectedMessage.Subject || selectedMessage.subject}</p>
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                      <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {selectedMessage.Message || selectedMessage.message}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Date Received</label>
                      <p className="text-gray-600 text-sm">{formatDate(selectedMessage.createdAt)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Message ID</label>
                      <p className="text-gray-500 text-xs font-mono">{selectedMessage._id}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleDeleteClick(selectedMessage._id);
                    handleCloseModal();
                  }}
                  disabled={DeleteMessage}
                  className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:bg-gray-400"
                >
                  Delete Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75"
              onClick={() => setDeleteConfirm(null)}
              aria-hidden="true"
            />

            {/* Modal */}
            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-6 pt-6 pb-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                    <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Message</h3>
                    <p className="text-gray-600">
                      Are you sure you want to delete this message? This action cannot be undone.
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
                  onClick={confirmDelete}
                  disabled={DeleteMessage}
                  className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {DeleteMessage ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}