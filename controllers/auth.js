const bcrypt = require("bcryptjs");
const User = require("../models/Users");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "sidhant";

const createToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "1h",
  });
};

const Register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    const token = createToken(newUser._id);
    res.cookie("jwt", token, { httpOnly: true });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required for login",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: `Invalid ${email} or password` });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

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
};

const Logout = (req, res) => {
  try {
    res.cookie("jwt", "", { expires: new Date(0), httpOnly: true });
    res.json({ message: "Logged Out" });
  } catch (error) {
    res.json(error);
  }
};

module.exports = { Register, Login, Logout };
