import express from 'express';
import { 
  createBanner, 
  getAllBanners, 
  getActiveBanners, 
  updateBanner, 
  deleteBanner 
} from '../controllers/bannerC.js';
import { authuadmin } from '../middlewares/authAdmins.js';
import { upload } from '../middlewares/multer.js';


const router = express.Router();

router.post('/', createBanner); // Admin only
router.get('/', getAllBanners); // Get all banners (admin)
router.get('/active', getActiveBanners); // Get active banners for display
router.put('/:id', updateBanner); // Admin only
router.delete('/:id', deleteBanner); // Admin only

// Public routes
router.get('/', getActiveBanners); // Get active banners for display
router.get('/all', getAllBanners); // Get all banners (including inactive)

// Admin protected routes
router.post('/', authuadmin, upload.single('image'), createBanner);
router.put('/:id', authuadmin, upload.single('image'), updateBanner);
router.delete('/:id', authuadmin, deleteBanner);


export default router;