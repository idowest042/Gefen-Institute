// middleware/adminMiddleware.js
import jwt from "jsonwebtoken";
import Admin from "../Model/AdminModel.js";

export const protectAdmin = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach admin to request
      req.admin = await Admin.findById(decoded.id).select("-password");

      if (!req.admin) {
        return res.status(404).json({ msg: "Admin not found" });
      }

      next();
    } catch (error) {
      console.error("Admin auth error:", error.message);
      return res.status(401).json({ msg: "Invalid or expired token" });
    }
  } else {
    return res.status(401).json({ msg: "No token provided, authorization denied" });
  }
};