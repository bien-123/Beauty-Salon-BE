const Staff = require('../model/staff.js');
const bcrypt = require('bcrypt');

const staffController = {
    getStaff: async (req, res) => {
        try {
            const allStaffs = await Staff.find();
            res.status(200).json(allStaffs);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getAStaff: async (req, res) => {
        try {
            const maNV = req.params.maNV;
            const staff = await Staff.findOne({ maNV });

            if (staff) {
                res.json({ success: true, staff });
            } else {
                res.json({ success: false, message: 'Nhân viên không được tìm thấy.' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Đã xảy ra lỗi server.' });
        }
    },

    addStaff: async (req, res) => {
        try {
            const existingStaff = await Staff.findOne({ maNV: req.body.maNV });
            if (!existingStaff) {
                const password = req.body.password;

                // Sử dụng bcrypt để băm mật khẩu
                const hashedPassword = await bcrypt.hash(password, 10);

                // Thay đổi mật khẩu trong req.body thành mật khẩu đã băm
                req.body.password = hashedPassword;

                const newStaff = new Staff(req.body);

                const savedStaff = await newStaff.save();

                res.status(200).json(savedStaff);
            } else {
                res.status(200).json({
                    success: false,
                    message: 'Mã nhân viên này đã tồn tại!',
                });
            }
        } catch (err) {
            res.status(500).json(err); //HTTP REQUEST CODE
        }
    },

    updateStaff: async (req, res) => {
        try {
            const staff = await Staff.findById(req.params.id);
            const existingPassword = staff.password;
            const newPassword = req.body.password;

            // Kiểm tra xem mật khẩu có thay đổi không trước khi mã hóa
            if (newPassword !== undefined && newPassword !== existingPassword) {
                const hashedPassword = await bcrypt.hash(newPassword, 10);
                req.body.password = hashedPassword;
            } else {
                delete req.body.password; // Loại bỏ trường password nếu không thay đổi
            }

            await staff.updateOne({ $set: req.body });
            res.status(200).json('Updated successfully');
        } catch (err) {
            res.status(500).json(err); //HTTP REQUEST CODE
        }
    },

    deleteStaff: async (req, res) => {
        try {
            await Staff.findByIdAndDelete(req.params.id);
            res.status(200).json('Deleted successfully');
        } catch (err) {
            res.status(500).json(err); //HTTP REQUEST CODE
        }
    },

    loginStaff: async (req, res) => {
        try {
            // Kiểm tra trường bắt buộc
            const { maNV, password } = req.body;

            // Tìm kiếm Staff theo maNV
            const existingStaff = await Staff.findOne({ maNV });

            // Kiểm tra sự tồn tại của Staff
            if (!existingStaff) {
                return res.status(200).json({ success: false, message: 'Mã nhân viên hoặc mật khẩu không đúng!' });
            }

            // So sánh mật khẩu băm
            const passwordMatch = await bcrypt.compare(password, existingStaff?.password);
            const MK = existingStaff?.password;
            const PQ = existingStaff?.phanQuyen;

            const arr = {
                maNV: maNV,
                MK: MK,
                PQ: PQ,
            };

            if (passwordMatch) {
                // Trả về thông tin Staff nếu đăng nhập thành công
                res.status(200).json({
                    success: true,
                    // maNV,
                    // MK,
                    arr,
                });
            } else {
                res.status(200).json({ success: false, message: 'Mã nhân viên hoặc mật khẩu không đúng!' });
            }
        } catch (err) {
            // Xử lý lỗi cụ thể và trả về thông báo lỗi
            res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
        }
    },

    searchStaff: async (req, res) => {
        const query = req.query.q;
        try {
            const results = await Staff.find({
                $or: [
                    { maNV: { $regex: query, $options: 'i' } },
                    { hoTen: { $regex: query, $options: 'i' } },
                    { email: { $regex: query, $options: 'i' } },
                    { soDienThoai: { $regex: query, $options: 'i' } },
                ],
            }).sort({ updatedAt: -1 });

            // Xử lý kết quả trả về
            const arrResult = results.map((result) => ({
                id: result._id,
                maNV: result.maNV,
                hoTen: result.hoTen,
                ngaySinh: result.ngaySinh,
                gioiTinh: result.gioiTinh,
                chucVu: result.chucVu,
                soDienThoai: result.soDienThoai,
                email: result.email,
                diaChi: result.diaChi,
            }));

            res.status(200).json({
                success: true,
                arrResult,
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    searchAccount: async (req, res) => {
        const query = req.query.q;
        try {
            const results = await Staff.find({
                $or: [{ maNV: { $regex: query, $options: 'i' } }],
            }).sort({ updatedAt: -1 });

            // Xử lý kết quả trả về
            const arrResult = results.map((result) => ({
                id: result._id,
                maNV: result.maNV,
                password: result.password,
                phanQuyen: result.phanQuyen,
            }));

            res.status(200).json({
                success: true,
                arrResult,
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updatePassword: async (req, res) => {
        try {
            // const { maNV, oldPassword, newPassword } = req.body;
            // Kiểm tra trường bắt buộc
            const { maNV, oldPassword, newPassword } = req.body;

            // Tìm kiếm Staff theo maNV
            const existingStaff = await Staff.findOne({ maNV });

            if (!existingStaff) {
                return res.status(200).json({
                    success: false,
                    message: 'Mã nhân viên không tồn tại!',
                });
            }

            const isPasswordMatch = await bcrypt.compare(oldPassword, existingStaff.password);

            if (!isPasswordMatch) {
                return res.status(200).json({
                    success: false,
                    message: 'Mật khẩu cũ không đúng!',
                });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            const updatedStaff = await Staff.findOneAndUpdate(
                { maNV: req.body.maNV },
                { $set: { password: hashedPassword } },
                { new: true },
            );

            res.status(200).json({
                success: true,
                message: 'Updated successfully',
                updatedStaff,
            });
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = staffController;
