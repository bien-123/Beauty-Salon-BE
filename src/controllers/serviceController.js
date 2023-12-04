const Service = require('../model/service.js');

const serviceController = {
    getService: async (req, res) => {
        try {
            const allServices = await Service.find();
            res.status(200).json(allServices);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    addService: async (req, res) => {
        try {
            const existingServices = await Service.findOne({ maDV: req.body.maDV });
            if (!existingServices) {
                const newService = new Service(req.body);
                const savedService = await newService.save();
                res.status(200).json({
                    success: true,
                    savedService,
                });
            } else {
                res.status(200).json({
                    success: false,
                    message: 'Mã dịch vụ này đã tồn tại!',
                });
            }
        } catch (err) {
            res.status(500).json(err); //HTTP REQUEST CODE
        }
    },

    updateService: async (req, res) => {
        try {
            // const existingServices = await Service.findOne({ maDV: req.body.maDV });
            // if (existingServices) {
            const service = await Service.findById(req.params.id);
            await service.updateOne({ $set: req.body });
            res.status(200).json('Updated successfully');
            // } else {
            //     res.status(200).json({
            //         success: false,
            //         message: 'Mã dịch vụ này không tồn tại!',
            //     });
            // }
        } catch (err) {
            res.status(500).json(err); //HTTP REQUEST CODE
        }
    },

    deleteService: async (req, res) => {
        try {
            await Service.findByIdAndDelete(req.params.id);
            res.status(200).json('Deleted successfully');
        } catch (err) {
            res.status(500).json(err); //HTTP REQUEST CODE
        }
    },

    searchService: async (req, res) => {
        const query = req.query.q; // Lấy tham số tìm kiếm từ URL

        try {
            const results = await Service.find({
                $or: [
                    { maDV: { $regex: query, $options: 'i' } },
                    { name: { $regex: query, $options: 'i' } }, // Tìm kiếm không phân biệt hoa thường
                    { description: { $regex: query, $options: 'i' } },
                ],
            }).sort({ updatedAt: -1 }); // Sắp xếp theo createdAt từ mới đến cũ (theo thứ tự giảm dần)
            res.status(200).json(results);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getServiceBill: async (req, res) => {
        try {
            const allServices = await Service.find();

            const arr = allServices.map((service) => ({
                maDV: service.maDV,
                name: service.name,
                price: service.price,
            }));

            res.status(200).json({
                status: true,
                arr,
            });
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = serviceController;
