const Client = require('../model/client.js');

const clientController = {
    getClient: async (req, res) => {
        try {
            const allClients = await Client.find();
            res.status(200).json(allClients);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    addClient: async (req, res) => {
        try {
            const existingClients = await Client.findOne({ maKH: req.body.maKH });
            if (!existingClients) {
                const newClient = new Client(req.body);
                const savedClient = await newClient.save();
                res.status(200).json({
                    success: true,
                    savedClient,
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

    updateClient: async (req, res) => {
        try {
            const client = await Client.findById(req.params.id);
            await client.updateOne({ $set: req.body });
            res.status(200).json('Updated successfully');
        } catch (err) {
            res.status(500).json(err); //HTTP REQUEST CODE
        }
    },

    deleteClient: async (req, res) => {
        try {
            await Client.findByIdAndDelete(req.params.id);
            res.status(200).json('Deleted successfully');
        } catch (err) {
            res.status(500).json(err); //HTTP REQUEST CODE
        }
    },

    searchClient: async (req, res) => {
        const query = req.query.q;
        try {
            const results = await Client.find({
                $or: [
                    { maKH: { $regex: query, $options: 'i' } },
                    { tenKH: { $regex: query, $options: 'i' } },
                    { email: { $regex: query, $options: 'i' } },
                    { diaChi: { $regex: query, $options: 'i' } },
                ],
            }).sort({ updatedAt: -1 }); // Sắp xếp theo createdAt từ mới đến cũ (theo thứ tự giảm dần)
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = clientController;
