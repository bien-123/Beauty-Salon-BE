const Department = require('../model/department');
const Staff = require('../model/staff');

// API lấy danh sách khoa
const departmentController = {
    getDepartments: async (req, res) => {
        try {
            // 1. Lấy tất cả các khoa và "đổ" dữ liệu trưởng khoa từ bảng Staff vào trường manager
            const departments = await Department.find({}).populate('manager', 'hoTen maNV chucVu');

            // 2. Với mỗi khoa, đếm xem có bao nhiêu nhân viên thuộc khoa đó
            const departmentListWithStaffCount = await Promise.all(
                departments.map(async (dept) => {
                    const staffCount = await Staff.countDocuments({ khoa: dept._id });

                    return {
                        ...dept._doc, // Lấy tất cả dữ liệu cũ của khoa
                        staffCount: staffCount, // Thêm số lượng nhân viên vào kết quả trả về
                    };
                }),
            );

            res.status(200).json(departmentListWithStaffCount);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // 2. API THÊM MỚI KHOA (Thêm vào đây)
    createDepartment: async (req, res) => {
        try {
            // Lấy các dữ liệu người dùng gửi lên từ phía Client (React)
            const { departmentCode, departmentName, description, manager, status } = req.body;

            // Kiểm tra xem mã khoa (departmentCode) đã tồn tại trong database chưa
            const exisitingDept = await Department.findOne({ departmentCode });
            if (exisitingDept) {
                return res.status(400).json({ message: 'Mã khoa này đã tồn tại!' });
            }

            // Tạo một đối tượng Khoa mới từ Schema
            const newDepartment = new Department({
                departmentCode,
                departmentName,
                description,
                manager: manager || null, // Nếu không truyền trưởng khoa thì mặc định là null
                status: status || 'Active', // Mặc định trạng thái hoạt động nếu không truyền
            });

            // Lưu vào trong cơ sở dữ liệu MongoDB
            const savedDepartment = await newDepartment.save();

            // Trả về dữ liệu vừa tạo thành công cho Client
            res.status(200).json({
                message: 'Tạo khoa mới thành công!',
                success: true,
                data: savedDepartment,
            });
        } catch (error) {
            // Trả về lỗi nếu quá trình lưu database gặp trục trặc
            res.status(500).json({ message: error.message });
        }
    },

    updateDepartment: async (req, res) => {
        try {
            const department = await Department.findById(req.params.id);
            if (Object.keys(req.body).length === 0) {
                res.status(400).json({
                    message: 'Bạn chưa nhập thông tin!',
                });
            }
            await department.updateOne({ $set: req.body });
            res.status(200).json({
                message: 'Chỉnh sửa thông tin khoa thành công!',
                success: true,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    deleteDepartment: async (req, res) => {
        try {
            await Department.findByIdAndDelete(req.params.id);
            res.status(200).json({
                message: 'Deleted successfully',
                success: true,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = departmentController;
