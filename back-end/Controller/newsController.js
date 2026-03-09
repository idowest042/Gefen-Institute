// Controller/newsController.js
import News from '../Model/NewsModel.js';

// Get all news (public)
export const getAllNews = async (req, res) => {
  try {
    const { limit = 10, page = 1, published = 'true' } = req.query;
    
    const query = published === 'true' ? { isPublished: true } : {};
    
    const news = await News.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
    
    const total = await News.countDocuments(query);
    
    res.status(200).json({
      success: true,
      data: news,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get all news error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch news' 
    });
  }
};

// Get single news by ID or slug (public)
export const getNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Try to find by ID first, then by slug
    let news = await News.findById(id);
    
    if (!news) {
      news = await News.findOne({ slug: id });
    }
    
    if (!news) {
      return res.status(404).json({ 
        success: false, 
        message: 'News not found' 
      });
    }
    
    // Increment views
    news.views += 1;
    await news.save();
    
    res.status(200).json({
      success: true,
      data: news
    });
  } catch (error) {
    console.error('Get news by ID error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch news' 
    });
  }
};

// Create news (admin only)
export const createNews = async (req, res) => {
  try {
    const { title, content, image, isPublished } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ 
        success: false, 
        message: 'Title and content are required' 
      });
    }
    
    const news = await News.create({
      title,
      content,
      image: image || null,
      isPublished: isPublished !== undefined ? isPublished : true
    });
    
    res.status(201).json({
      success: true,
      message: 'News created successfully',
      data: news
    });
  } catch (error) {
    console.error('Create news error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Failed to create news' 
    });
  }
};

// Update news (admin only)
export const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, image, isPublished } = req.body;
    
    const news = await News.findByIdAndUpdate(
      id,
      { title, content, image, isPublished },
      { new: true, runValidators: true }
    );
    
    if (!news) {
      return res.status(404).json({ 
        success: false, 
        message: 'News not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'News updated successfully',
      data: news
    });
  } catch (error) {
    console.error('Update news error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update news' 
    });
  }
};

// Delete news (admin only)
export const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    
    const news = await News.findByIdAndDelete(id);
    
    if (!news) {
      return res.status(404).json({ 
        success: false, 
        message: 'News not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'News deleted successfully'
    });
  } catch (error) {
    console.error('Delete news error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete news' 
    });
  }
};