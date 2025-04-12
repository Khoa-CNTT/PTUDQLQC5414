import categoryModel from '../models/categoryModel.js'

const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find();
        res.json({ success: true, categories });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};

const addCategory = async (req, res) => {
    try {
        const { name, subCategories } = req.body;

        const exists = await categoryModel.findOne({ name });
        if (exists) return res.json({ success: false, message: "Category already exists" });

        const category = new categoryModel({ name, subCategories });
        await category.save();

        res.json({ success: true, message: "Category added" });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};


const deleteCategory = async (req, res) => {
    try {
        await categoryModel.deleteOne({ _id: req.body._id })
        res.json({ success: true, message: "Category deleted" });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};

// GET
const getUpdateCategoryId = async (req, res) => {
    try {
        const categoryId = req.params.id;

        // Tìm sản phẩm theo ID
        const category = await categoryModel.findById(categoryId); // ID thử nghiệm


        if (!category) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm.' });
        }

        // Trả về thông tin sản phẩm nếu tìm thấy
        res.status(200).json({ category });

    } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
        res.status(500).json({ message: 'Lỗi server: ' + error.message });
    }
};

//PUT
const putUpdateCategoryId = async (req, res) => {
    try {
        await categoryModel.updateOne({ _id: req.params.id }, req.body);
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export { getAllCategories, addCategory, deleteCategory, getUpdateCategoryId, putUpdateCategoryId }
