const Appointment = require('../model/appointment.js');

const appointmentController = {
    getAppointment: async (req, res) => {
        try {
            const allAppointments = await Appointment.find();
            res.status(200).json(allAppointments);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    addAppointment: async (req, res) => {
        try {
            const newAppointment = new Appointment(req.body);
            const savedAppointment = await newAppointment.save();
            res.status(200).json(savedAppointment);
        } catch (err) {
            res.status(500).json(err); //HTTP REQUEST CODE
        }
    },

    updateAppointment: async (req, res) => {
        try {
            const appointment = await Appointment.findById(req.params.id);
            await appointment.updateOne({ $set: req.body });
            res.status(200).json('Updated successfully');
        } catch (err) {
            res.status(500).json(err); //HTTP REQUEST CODE
        }
    },

    deleteAppointment: async (req, res) => {
        try {
            await Appointment.findByIdAndDelete(req.params.id);
            res.status(200).json('Deleted successfully');
        } catch (err) {
            res.status(500).json(err); //HTTP REQUEST CODE
        }
    },

    searchAppointment: async (req, res) => {
        const query = req.query.q;
        try {
            const results = await Appointment.find({
                $or: [
                    { tenKH: { $regex: query, $options: 'i' } },
                    { sdt: { $regex: query, $options: 'i' } },
                    { ngayHen: { $regex: query, $options: 'i' } },
                    { status: { $regex: query, $options: 'i' } },
                    { result: { $regex: query, $options: 'i' } },
                ],
            }).sort({ updatedAt: -1 }); // Sắp xếp theo createdAt từ mới đến cũ (theo thứ tự giảm dần)
            res.status(200).json(results);
        } catch (err) {
            res.status(500).json({ error: err.message }); //HTTP REQUEST CODE
        }
    },

    searchWelcome: async (req, res) => {
        const query = req.query.q;
        try {
            const results = await Appointment.find({
                $and: [
                    // Sử dụng $and để kết hợp các điều kiện
                    {
                        $or: [
                            { tenKH: { $regex: query, $options: 'i' } },
                            { sdt: { $regex: query, $options: 'i' } },
                            { ngayHen: { $regex: query, $options: 'i' } },
                            { result: { $regex: query, $options: 'i' } },
                        ],
                    },
                    { result: 'Thành công' },
                    { status: 'Đã xác nhận' },
                ],
            }).sort({ updatedAt: -1 }); // Sắp xếp theo updatedAt từ mới đến cũ (theo thứ tự giảm dần)
            res.status(200).json(results);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
};

module.exports = appointmentController;
