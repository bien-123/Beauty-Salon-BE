const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var departmentSchema = new Schema(
    {
        departmentCode: { type: String, unique: true }, // Nên để duy nhất
        departmentName: { type: String },
        description: { type: String },
        // Thay đổi ở đây: Liên kết tới Id của bảng Staff
        // manager: { type: Schema.Types.ObjectId, ref: 'Staff' },
        manager: [{ type: Schema.Types.ObjectId, ref: 'Staff' }],
        status: { type: String },
    },
    {
        timestamps: true,
    },
);

let Department = mongoose.model('Department', departmentSchema);
module.exports = Department;
