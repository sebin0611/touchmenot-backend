import Banner from '../models/bannerMODEL.js';

import { cloudinaryInstance as cloudinary } from '../config/cloudinary.js';

// Create a new banner (Admin only)
export const createBanner = async (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'banners',
    });

    // Create new banner
    const banner = new Banner({
      title: req.body.title,
      subtitle: req.body.subtitle,
      description: req.body.description,
      imageUrl: result.secure_url,
      imagePublicId: result.public_id,
      link: req.body.link,
      isActive: req.body.isActive === 'true',
      order: req.body.order || 0
    });

    await banner.save();

    res.status(201).json({
      success: true,
      message: 'Banner created successfully',
      data: banner
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false,
      message: error.message || 'Failed to create banner' 
    });
  }
};

// Get all banners
export const getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ order: 1 });
    res.status(200).json({
      success: true,
      data: banners
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false,
      message: error.message || 'Failed to fetch banners' 
    });
  }
};

// Get active banners for display
export const getActiveBanners = async (req, res) => {
  try {
    const banners = await Banner.find({ isActive: true }).sort({ order: 1 });
    res.status(200).json({
      success: true,
      data: banners
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false,
      message: error.message || 'Failed to fetch active banners' 
    });
  }
};

// Update a banner (Admin only)
export const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await Banner.findById(id);

    if (!banner) {
      return res.status(404).json({ 
        success: false,
        message: 'Banner not found' 
      });
    }

    // Update fields
    banner.title = req.body.title || banner.title;
    banner.subtitle = req.body.subtitle || banner.subtitle;
    banner.description = req.body.description || banner.description;
    banner.link = req.body.link || banner.link;
    banner.isActive = req.body.isActive !== undefined ? req.body.isActive : banner.isActive;
    banner.order = req.body.order || banner.order;

    // If new image was uploaded
    if (req.file) {
      // First delete the old image from Cloudinary
      await cloudinary.uploader.destroy(banner.imagePublicId);

      // Upload new image
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'banners',
      });

      banner.imageUrl = result.secure_url;
      banner.imagePublicId = result.public_id;
    }

    await banner.save();

    res.status(200).json({
      success: true,
      message: 'Banner updated successfully',
      data: banner
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false,
      message: error.message || 'Failed to update banner' 
    });
  }
};

// Delete a banner (Admin only)
export const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await Banner.findById(id);

    if (!banner) {
      return res.status(404).json({ 
        success: false,
        message: 'Banner not found' 
      });
    }

    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(banner.imagePublicId);

    // Delete banner from database
    await Banner.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Banner deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false,
      message: error.message || 'Failed to delete banner' 
    });
  }
};