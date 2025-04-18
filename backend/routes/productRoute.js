import express from 'express'
import adminAuth from '../middlewares/adminAuth.js';
import upload from '../middlewares/multer.js';
import { addProduct, removeProduct, listProduct, listReview,removeReview,singleProduct, getUpdateId, putUpdateId } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post('/add', adminAuth, upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 }]), addProduct);
productRouter.delete('/remove', adminAuth, removeProduct);
productRouter.get('/list', listProduct);

//list review
productRouter.get('/list-review', adminAuth,listReview);
productRouter.delete('/remove-review', adminAuth,removeReview);
//
productRouter.post('/single', singleProduct);
//
productRouter.get('/update/:id/edit', adminAuth, getUpdateId);
productRouter.put('/update/:id', adminAuth, putUpdateId);



export default productRouter