import express from 'express';
import {
  getUserAddresses,
  createAddress,
  updateAddress,
  deleteAddress
} from '../controllers/addressController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// 所有地址路由都需要登入驗證
router.use(protect);

router.route('/')
  .get(getUserAddresses)
  .post(createAddress);

router.route('/:id')
  .put(updateAddress)
  .delete(deleteAddress);

export default router;
