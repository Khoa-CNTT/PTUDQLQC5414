import userModel from "../models/userModel.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import crypto from "crypto";

// Tạo token JWT
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
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
        if (!password || password.length < 3) {
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
        return res.status(200).json({ success: true, token });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server error" });
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

export { loginUser, registerUser, forgotPassword, resetPassword };
