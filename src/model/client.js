const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema(
    {
        maKH: { type: String },
        hoTen: { type: String },
        ngaySinh: { type: String },
        gioiTinh: { type: String },
        soDienThoai: { type: String },
        email: { type: String },
        diaChi: { type: String },
        typeKH: { type: String },
    },
    {
        timestamps: true,
    },
);

let Client = mongoose.model('Client', clientSchema);
module.exports = Client;
