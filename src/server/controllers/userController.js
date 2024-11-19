import User from '../models/UserModel.js';
import generateToken from '../utils/generateToken.js';
import createUserService from "../services/userService.js";
import jwt from 'jsonwebtoken';

const userService = createUserService(User);

// Rejestracja użytkownika
const registerUser = async (req, res) => {
  const { login, password, firstName, lastName, passwordCheck } = req.body;

  try {
    const user = await userService.register(login, password, firstName, lastName, passwordCheck);
    const accessToken = generateToken(user._id);
    const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_SECRET, { expiresIn: '7d' });

    // Ustawienie ciasteczka z tokenem odświeżania (HTTP-only)
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true, // ustawić true dla produkcji
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dni
    });

    res.status(201).json({ user, accessToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Logowanie użytkownika
const loginUser = async (req, res) => {
  const { login, password } = req.body;

  try {
    const user = await userService.login(login, password);
    const accessToken = generateToken(user._id);
    const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_SECRET, { expiresIn: '7d' });
    // Ustawienie ciasteczka z tokenem odświeżania (HTTP-only)
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true, // ustawić true dla produkcji
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dni
    });

    res.status(200).json({ user, accessToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Wylogowanie użytkownika
const logoutUser = async (req, res) => {
  const { userId } = req.params;

  try {
    await userService.logoutUser(userId);
    // Usunięcie ciasteczka z tokenem odświeżania
    res.clearCookie('refreshToken');
    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Odświeżenie tokenu dostępu
const refreshAccessToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token required" });
  }

  try {
    const accessToken = await userService.refreshAccessToken(refreshToken);
    res.json({ accessToken });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken
};
