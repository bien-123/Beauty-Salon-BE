const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Appointment = new Schema(
    {
        tenKH: { type: String },
        sdt: { type: String },
        tinhTrangHienTai: { type: String },
        ngayHen: { type: String },
        gioHen: { type: String },
        name: { type: Array },
        status: { type: String },
        result: { type: String },
        phanCong: { type: Array },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Appointment', Appointment);
