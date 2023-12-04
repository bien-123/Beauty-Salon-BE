const Bill = require('../model/bill.js');

const billController = {
    getBill: async (req, res) => {
        try {
            const allBills = await Bill.find();
            res.status(200).json(allBills);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    addBill: async (req, res) => {
        try {
            const newBill = new Bill(req.body);
            const savedBill = await newBill.save();
            res.status(200).json(savedBill);
        } catch (err) {
            res.status(500).json(err); //HTTP REQUEST CODE
        }
    },

    updateBill: async (req, res) => {
        try {
            const bill = await Bill.findById(req.params.id);
            await bill.updateOne({ $set: req.body });
            res.status(200).json('Updated successfully');
        } catch (err) {
            res.status(500).json(err); //HTTP REQUEST CODE
        }
    },

    deleteBill: async (req, res) => {
        try {
            await Bill.findByIdAndDelete(req.params.id);
            res.status(200).json('Deleted successfully');
        } catch (err) {
            res.status(500).json(err); //HTTP REQUEST CODE
        }
    },

    searchBill: async (req, res) => {
        const query = req.query.q;
        try {
            const results = await Bill.find({
                $or: [
                    { maKH: { $regex: query, $options: 'i' } },
                    { tenKH: { $regex: query, $options: 'i' } },
                    { maDV: { $regex: query, $options: 'i' } },
                    { tenDV: { $regex: query, $options: 'i' } },
                    { phuongThuc: { $regex: query, $options: 'i' } },
                    { maNV: { $regex: query, $options: 'i' } },
                ],
            }).sort({ updatedAt: -1 }); // Sắp xếp theo createdAt từ mới đến cũ (theo thứ tự giảm dần)
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = billController;
