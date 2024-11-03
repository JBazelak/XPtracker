import User from '../models/UserModel.js';
import generateToken from '../utils/generateToken.js'
import createUserService from "../services/userService.js"
const userService = createUserService(User);

const registerUser = async (req, res) => {
  const { login, password, firstName, lastName, passwordCheck } = req.body;

  try {
    const user = await userService.register(login, password, firstName, lastName, passwordCheck);
    const token = generateToken(user._id);
    res.status(201).json({ user, token })
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const loginUser = async (req, res) => {
  const { login, password } = req.body;

  try {
    const user = await userService.login(login, password);
    const token = generateToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const logoutUser = async (req, res) => {
  const { userId } = req.params;

  try {
    await userService.logoutUser(userId);
    res.status(200).json({message: "Logout succesfully"});
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

export {
  registerUser,
  loginUser,
  logoutUser,
}