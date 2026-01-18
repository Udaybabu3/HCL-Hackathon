const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res) => {
  try {
    const { email, password, username, role } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ backend controls role
    const allowedRoles = ["USER", "PROVIDER"];
    const normalizedRole = role ? role.trim().toUpperCase() : "USER";
    const finalRole = allowedRoles.includes(normalizedRole) ? normalizedRole : "USER";

    const user = await User.create({
      email,
      password,
      username,
      role: finalRole,
    });

    const token = createSecretToken({
      id: user._id,
      role: user.role,
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
    });

    res.status(201).json({
      message: "User signed up successfully",
      success: true,
      role: user.role,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Signup failed" });
  }
};

module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    const token = createSecretToken({
      id: user._id,
      role: user.role,
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
    });

    res.status(200).json({
      message: "User logged in successfully",
      success: true,
      role: user.role,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
};

