const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema(
    {
        maDV: { type: String },
        name: { type: String },
        description: { type: String },
        price: { type: String },
        time: { type: String },
    },
    { timestamps: true },
);

let Service = mongoose.model('Service', serviceSchema);
module.exports = Service;
