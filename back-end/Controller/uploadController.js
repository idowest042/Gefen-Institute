// Controller/uploadController.js
import cloudinary from '../Config/cloudinary.js';

export const uploadImage = async (req, res) => {
  try {
    if (!req.file && !req.body.image) {
      return res.status(400).json({ 
        success: false, 
        message: 'No image provided' 
      });
    }

    let imageUrl;

    // If base64 image from frontend
    if (req.body.image) {
      const result = await cloudinary.uploader.upload(req.body.image, {
        folder: 'gefen-news',
        resource_type: 'auto'
      });
      imageUrl = result.secure_url;
    }

    res.status(200).json({
      success: true,
      imageUrl: imageUrl
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Image upload failed' 
    });
  }
};