import mongoose from "mongoose";
const adminSchema = new mongoose.Schema({
    FullName: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    Subject: {
        type: String,
        required: true,
    },
    Message: {
        type: String,
        required: true,
    },
    Mobile_Number:{
        type:Number,
        required:true,
    }

})
const adminManage = mongoose.models.adminManage || mongoose.model("adminManage", adminSchema);
export default adminManage;