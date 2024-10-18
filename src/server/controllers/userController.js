import User from '../models/UserModel.js';
import generateToken from '../utils/generateToken.js'

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

export {
  registerUser,
  loginUser,
}