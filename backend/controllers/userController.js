import userModel from "../models/userModel.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import crypto from "crypto";

// Tạo token JWT
const createToken = (user) => {
    return jwt.sign(
        { _id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};


// Đăng ký người dùng
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Kiểm tra email hợp lệ
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }

        // Kiểm tra password đủ mạnh
        if (!password || password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
        }

        // Kiểm tra xem email đã tồn tại chưa
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Băm mật khẩu
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Tạo người dùng mới
        const newUser = new userModel({ name, email, password: hashedPassword });
        await newUser.save();

        // Tạo token và gửi phản hồi
        const token = createToken(newUser._id);
        return res.status(201).json({ success: true, token });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// Đăng nhập người dùng
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kiểm tra email hợp lệ
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User doesn't exist" });
        }

        // So sánh mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // Tạo token
        const token = createToken(user._id);
        return res.status(200).json({ success: true, token, name: user.name });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(
                {
                    email,
                    role: 'admin'
                },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            );
            return res.json({ success: true, token });
        } else {
            return res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (err) {
        console.error(err);
        return res.json({ success: false, message: err.message });
    }
};

// Cấu hình transporter cho nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD
    }
});

// Quên mật khẩu
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Tạo token reset mật khẩu
        const resetToken = crypto.randomBytes(32).toString("hex");
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 giờ hết hạn
        await user.save();

        // Gửi email
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
        const mailOptions = {
            to: email,
            from: process.env.GMAIL_USER,
            subject: "Password Reset Request",
            text: `Click the link to reset your password: ${resetUrl}`
        };

        await transporter.sendMail(mailOptions);
        return res.status(200).json({ success: true, message: "Password reset link sent to your email" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// Đặt lại mật khẩu
const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        // Kiểm tra token hợp lệ
        const user = await userModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
        }

        // Băm mật khẩu mới
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Cập nhật mật khẩu mới
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        return res.status(200).json({ success: true, message: "Password updated successfully" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

//lay User profile theo userId của từng tk
const getProfileUser = (req, res) => {
    const userId = req.user._id; //* Lấy userId từ token

    userModel.findOne({ _id: userId }) // Tìm user theo userId từ token
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user); // Trả về thông tin user
        })
        .catch(error => {
            console.error('Error fetching user:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
};

// Cập nhật profile
const putProfileUser = (req, res) => {
    const { phonenumber, address, city, country } = req.body;
    userModel.findOneAndUpdate({ name: req.body.name }, { phonenumber, address, city, country }, { new: true })
        .then(updatedUser => {
            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(updatedUser);
        })
        .catch(error => {
            console.error('Error updating profile:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
};
const getAccount = async (req, res) => {
    try {
        const users = await userModel.find({});
        res.json({ success: true, users })
    } catch (err) {
        console.eror(err);
        res.json({ success: false, message: err.message })
    }
}

const addAccount = async (req, res) => {
    try {
        const { name, email, password, phonenumber, address, city, country } = req.body;

        // Kiểm tra tài khoản đã tồn tại chưa
        const exists = await userModel.findOne({ email });
        if (exists) return res.json({ success: false, message: "Email đã tồn tại" });

        const newUser = new userModel({
            name,
            email,
            password,
            phonenumber,
            address,
            city,
            country,
        });

        await newUser.save();

        res.json({ success: true, message: "Tài khoản đã được thêm thành công" });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};

const getUpdateAccountId = async (req, res) => {
    try {
        const accountId = req.params.id;

        // Tìm sản phẩm theo ID
        const account = await userModel.findById(accountId); // ID thử nghiệm


        if (!account) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm.' });
        }

        // Trả về thông tin sản phẩm nếu tìm thấy
        res.status(200).json(account);

    } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
        res.status(500).json({ message: 'Lỗi server: ' + error.message });
    }
};

//PUT
const putUpdateAccountId = async (req, res) => {
    try {
        await userModel.updateOne({ _id: req.params.id }, req.body);
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


const removeAccount = async (req, res) => {
    try {
        await userModel.deleteOne({ _id: req.body._id })
        res.json({ success: true, message: "account deleted successfully" })
    } catch (err) {

    }
}

export { loginUser, registerUser, adminLogin, forgotPassword, resetPassword, getProfileUser, putProfileUser, getAccount, addAccount, getUpdateAccountId, putUpdateAccountId, removeAccount };

