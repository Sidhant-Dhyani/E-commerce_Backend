
const AdminModel = require('../models/admin');
const jwt = require("jsonwebtoken");
const JWT_SECRET = "Sidhant";
const createToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: "1h",
    });
};

const Login = async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required for login",
            });
        }

        const user = await AdminModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: `Invalid ${email} or password` });
        }

        const passwordMatch = password === user.password;

        if (!passwordMatch) {
            return res.status(401).json({ message: `Invalid ${email} or password` });
        }

        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true });
        res.status(200).json({
            message: "Login successful",
            token: token
        });
    } catch (error) {
        res.status(500).json({ message: "Login failed", error: error.message });
    }

}

module.exports = { Login };