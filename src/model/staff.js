const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffSchema = new Schema(
    {
        maNV: { type: String },
        hoTen: { type: String },
        ngaySinh: { type: String },
        gioiTinh: { type: String },
        chucVu: { type: String },
        soDienThoai: { type: String },
        email: { type: String },
        diaChi: { type: String },
        password: { type: String },
        phanQuyen: { type: String },
    },
    {
        timestamps: true,
    },
);

let Staff = mongoose.model('Staff', staffSchema);
module.exports = Staff;
