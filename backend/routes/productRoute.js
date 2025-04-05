import express from 'express'
import adminAuth from '../middlewares/adminAuth.js';
import upload from '../middlewares/multer.js';
import { addProduct, removeProduct, listProduct, singleProduct } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post('/add', adminAuth, upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 }]), addProduct);
productRouter.post('/remove', adminAuth, removeProduct);
productRouter.get('/list', listProduct);
productRouter.post('/single', singleProduct);

export default productRouter