import jwt from 'jsonwebtoken';
import { validateRegisterInput, validateLoginInput } from '../utils/validation.js';
import { hashPassword, comparePassword } from '../utils/passwordUtils.js';

const userService = (User) => {
  return {
    async register(login, password, firstName, lastName, passwordCheck) {
      validateRegisterInput(login, password, firstName, lastName, passwordCheck);

      const exists = await User.findOne({ login });
      if (exists) { throw new Error("Użytkownik istnieje"); }

      const hashedPassword = await hashPassword(password);
      const user = await User.create({ login, password: hashedPassword, firstName, lastName });

      return user;
    },

    async login(login, password) {
      validateLoginInput(login, password);

      const user = await User.findOne({ login });
      if (!user) { throw new Error("Niepoprawny login!"); }
      if (user.isLogged === true) { throw new Error("Użytkownik jest zalogowany"); }

      const match = await comparePassword(password, user.password);
      if (!match) { throw new Error("Niepoprawne hasło!"); }

      user.isLogged = true;
      await user.save();
      return user;
    },

    async logoutUser(userId) {
      try {
        const user = await User.findById(userId);

        if (!user) { throw new Error("Nie znaleziono użytkownika!"); }
        if (user.isLogged === false) { throw new Error("Użytkownik jest już wylogowany"); }

        user.isLogged = false;

        await user.save();
        return user;
      } catch (error) {
        console.error("Błąd podczas wylogowywania użytkownika:", error);
        throw error;
      }
    },

    async refreshAccessToken(refreshToken) {
      if (!refreshToken) {
        throw new Error("Refresh token required");
      }

      return new Promise((resolve, reject) => {
        jwt.verify(refreshToken, process.env.REFRESH_SECRET, async (err, decoded) => {
          if (err) return reject(new Error('Invalid refresh token'));

          try {
            const user = await User.findById(decoded.userId).select('_id isLogged');
            if (!user || !user.isLogged) {
              return reject(new Error("User is not logged in"));
            }

            const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
            resolve(accessToken);
          } catch (error) {
            reject(new Error('Server error'));
          }
        });
      });
    }
  };
};

export default userService;
