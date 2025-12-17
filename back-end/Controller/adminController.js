// controllers/adminController.js
import bcrypt from 'bcryptjs';
import Admin from '../Model/AdminModel.js';
import { generateToken } from '../Config/utilis.js';
import adminManage from "../Model/AdminManagement.js"
import nodemailer from "nodemailer";
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Check required fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // 2️⃣ Find admin
    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log("Admin not found");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 3️⃣ Check password
    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect) {
      console.log("Incorrect password");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 4️⃣ Generate token
    const token = generateToken(admin._id, res);

    // 5️⃣ Success response
    return res.status(200).json({
      message: "Admin login successful",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
      token,
    });

  } catch (error) {
    console.error("Error in admin login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const PostMessage = async (req, res) => {
  try {
    const { FullName, Email, Subject, Message,Mobile_Number } = req.body;

    // Save message to database
    const newMessage = new adminManage({
      FullName,
      Email,
      Subject,
      Message,
      Mobile_Number
    });

    await newMessage.save();

    // Notify admin via email
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USERNAME, // your Gmail username
        pass: process.env.EMAIL_PASSWORD, // your Gmail password or app password
      },
    });

    const mailOptions = {
      from: `"Gefen Institute" <${process.env.EMAIL_USERNAME}>`,
      to: process.env.ADMIN_NOTIFICATION_EMAIL, // admin email in .env
      subject: `📩 New Message from ${FullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color:#f4f4f4; padding:20px;">
          <div style="max-width:600px; margin:auto; background:#fff; border-radius:8px; overflow:hidden; box-shadow:0 2px 10px rgba(0,0,0,0.1);">
            <div style="background-color:#0A2342; padding:16px; color:#fff; text-align:center;">
              <h2 style="margin:0;">New Message from LEPENS Website</h2>
            </div>
            <div style="padding:20px;">
              <p><strong>Name:</strong> ${FullName}</p>
              <p><strong>Email:</strong> ${Email}</p>
              <p><strong>Subject:</strong> ${Subject}</p>
              <p><strong>Message:</strong><br/>${Message}</p>
              <p><strong>Message:</strong><br/>${Mobile_Number}</p>
              
            </div>
            <div style="background:#f5f5f5; padding:10px; text-align:center; font-size:12px; color:#666;">
              &copy; ${new Date().getFullYear()} LEPENS Foundation
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Message sent successfully and admin notified" });
  } catch (error) {
    console.log("PostMessage error:", error.message);
    res.status(500).json({ message: "Error sending message", error: error.message });
  }
};
export const getEmail = async(req,res) =>{
  try{
  const emails = await adminManage.find({});
  res.status(200).json(emails);
  }catch(error){
    res.status(500).json({msg:"server error"})
    console.log('error in getEmail ', error.message);
  }
}
export const getEmailId = async (req, res) => {
  try{
    const { id } = req.params;
    const email = await adminManage.findById(id);
    if (!email) {
      return res.status(404).json({ msg: "Email information not found" });
    }
    res.status(200).json(email);
  }catch(error){
    console.log('error in getEmailId ', error.message);
    res.status(500).json({ msg: "error in getEmailId" });
  }
}
export const deleteEmail = async(req,res) => {
  try{
  const { id } = req.params;
  const email = await adminManage.findByIdAndDelete(id);
  if (!email) {
    return res.status(404).json({ msg: "Email not found" });
  }
  res.status(200).json({ msg: "Information Deleted successfully" });
  }catch(error){
    console.log('error in deleteEmail ', error.message);
    res.status(500).json({ msg: "error in deleteEmail" });
  }
}
export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error);
    res.status(500).json({ msg: "internal error" });
  }
};