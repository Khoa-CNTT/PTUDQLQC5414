import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"


//admin
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }
        console.log(productData)
        const product = new productModel(productData)
        await product.save()

        res.json({ success: true, message: "Product saved successfully" })

    } catch (err) {
        console.error(err);
        res.json({ success: false, message: err.message })
    }
}

const removeProduct = async (req, res) => {
    try {
        await productModel.deleteOne({ _id: req.body._id })
        res.json({ success: true, message: "Product deleted successfully" })
    } catch (err) {

    }
}

// GET
const getUpdateId = async (req, res) => {
    try {
        const productId = req.params.id;

        // Tìm sản phẩm theo ID
        const product = await productModel.findById(productId); // ID thử nghiệm


        if (!product) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm.' });
        }

        // Trả về thông tin sản phẩm nếu tìm thấy
        res.status(200).json(product);

    } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
        res.status(500).json({ message: 'Lỗi server: ' + error.message });
    }
};

//PUT
const putUpdateId = async (req, res) => {
    try {
        await productModel.updateOne({ _id: req.params.id }, req.body);
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products })
    } catch (err) {
        console.eror(err);
        res.json({ success: false, message: err.message })
    }
}

const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({ success: true, product })
    } catch (err) {
        console.eror(err);
        res.json({ success: false, message: err.message })
    }
}
export { addProduct, removeProduct, listProduct, singleProduct, getUpdateId, putUpdateId }