const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billSchema = new Schema(
    {
        maKH: { type: String },
        tenKH: { type: String },
        maDV: { type: Array },
        tenDV: { type: Array },
        gia: { type: Number },
        sale: { type: String },
        tongTien: { type: String },
        phuongThuc: { type: String },
        ghiChu: { type: String },
        maNV: { type: String },
    },
    {
        timestamps: true,
    },
);

let Bill = mongoose.model('Bill', billSchema);
module.exports = Bill;
