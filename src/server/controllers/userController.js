import User from '../models/UserModel.js';
import mongoose from 'mongoose';
import generateToken from '../utils/generateToken.js'

// desc register users
// route POST /api/users/register
// @desc Public
const registerUser = async (req, res) => {
  const { login, password, firstName, lastName, passwordCheck } = req.body;

  try {
    const user = await User.register(login, password, firstName, lastName, passwordCheck);
    const token = generateToken(user._id);
    res.status(201).json({ user, token })
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// desc auth user
// route POST /api/users/login
// @desc Public
const loginUser = async (req, res) => {
  const { login, password } = req.body;

  try {
    const user = await User.login(login, password);
    const token = generateToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  console.log(user)
  if (user) {
    res.json({
      _id: user._id,
      login: user.login,
      firstName: user.firstName,
      lastName: user.lastName
    });
  } else {
    res.status(404).json({ message: 'Użytkownik nie znaleziony' });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "User not found" });
  }

  const user = await User.findOneAndDelete({ _id: id })

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json(user);
}


const updateUser = async (req, res) => {
  const { id } = req.params;
  console.log("Received request to update user with ID:", id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log("Invalid ID");
    return res.status(404).json({ error: "User not found" });
  }
  console.log("ID is valid, proceeding to update");
  const user = await User.findOneAndUpdate({ _id: id }, {
    ...req.body
  }, { new: true })

  if (!user) {
    console.log("User not found in the database");
    return res.status(200).json(user);
  }
}


export {
  getUserProfile,
  registerUser,
  deleteUser,
  updateUser,
  loginUser
}