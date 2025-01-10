const AdminLogin = require("../../repository/admin_Login.repo.js");
const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config.js");
const bcrypt = require("bcryptjs");

// Admin Signin (Create Admin)
exports.signUpAdmin = async (req, res) => {
    const { email, password } = req.body;

    if (!(email && password)) {
        return res.status(400).send("All input is required");
    }

    // Check if admin already exists
    let existingAdmin = await AdminLogin.getByEmailId(email, req.models.users);
    if (existingAdmin) {
        return res.status(409).json({ message: "Admin already exists. Please login." });
    }

    // Encrypt password
    const encryptedPassword = bcrypt.hashSync(password, 10);

    // Create admin
    const newAdmin = {
        email: email,
        password: encryptedPassword,
        status: 1 // active status
    };

    try {
        let admin = await AdminLogin.create(newAdmin,req.models.users);
        res.status(201).json({
            status: true,
            message: "Admin registered successfully",
            data: admin
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error while creating admin" });
    }
};

// Admin Login (Create token)
exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    if (!(email && password)) {
        return res.status(400).send("All input is required");
    }

    // Find admin by email
    let admin = await AdminLogin.getByEmailId(email, req.models.users);
    if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
    }

    // Validate password
    const isPasswordValid = bcrypt.compareSync(password, admin.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password" });
    }

    // Create JWT token
    const token = jwt.sign(
        {
            user_id: admin.id,
            email: admin.email
        },
        config.secretKey,
        {
            expiresIn: 86400, // 24 hours
        }
    );

    res.status(200).json({
        status: true,
        message: "Login successful",
        token: token
    });
};
