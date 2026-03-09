// Store/newsStore.js
import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import {toast} from 'react-toastify';

export const useNewsStore = create((set, get) => ({
  news: [],
  currentNews: null,
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  pagination: {
    total: 0,
    page: 1,
    pages: 1
  },

  // Fetch all news
  fetchNews: async (page = 1, limit = 10) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get(`/news?page=${page}&limit=${limit}`);
      set({ 
        news: response.data.data,
        pagination: response.data.pagination,
        isLoading: false 
      });
    } catch (error) {
      console.error('Fetch news error:', error);
      toast.error('Failed to load news');
      set({ isLoading: false });
    }
  },

  // Fetch single news
  fetchNewsById: async (id) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get(`/news/${id}`);
      set({ 
        currentNews: response.data.data,
        isLoading: false 
      });
      return response.data.data;
    } catch (error) {
      console.error('Fetch news by ID error:', error);
      toast.error('Failed to load news');
      set({ isLoading: false });
      return null;
    }
  },

  // Create news
  createNews: async (newsData) => {
    set({ isCreating: true });
    try {
      const response = await axiosInstance.post('/news', newsData);
      
      // Add new news to the beginning of the list
      set(state => ({ 
        news: [response.data.data, ...state.news],
        isCreating: false 
      }));
      
      toast.success('News created successfully!');
      return response.data.data;
    } catch (error) {
      console.error('Create news error:', error);
      toast.error(error.response?.data?.message || 'Failed to create news');
      set({ isCreating: false });
      return null;
    }
  },

  // Update news
  updateNews: async (id, newsData) => {
    set({ isUpdating: true });
    try {
      const response = await axiosInstance.put(`/news/${id}`, newsData);
      
      // Update news in the list
      set(state => ({
        news: state.news.map(item => 
          item._id === id ? response.data.data : item
        ),
        currentNews: response.data.data,
        isUpdating: false
      }));
      
      toast.success('News updated successfully!');
      return response.data.data;
    } catch (error) {
      console.error('Update news error:', error);
      toast.error('Failed to update news');
      set({ isUpdating: false });
      return null;
    }
  },

  // Delete news
  deleteNews: async (id) => {
    set({ isDeleting: true });
    try {
      await axiosInstance.delete(`/news/${id}`);
      
      // Remove news from the list
      set(state => ({
        news: state.news.filter(item => item._id !== id),
        isDeleting: false
      }));
      
      toast.success('News deleted successfully!');
      return true;
    } catch (error) {
      console.error('Delete news error:', error);
      toast.error('Failed to delete news');
      set({ isDeleting: false });
      return false;
    }
  },

  // Clear current news
  clearCurrentNews: () => set({ currentNews: null })
}));