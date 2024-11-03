import { validateRegisterInput, validateLoginInput } from '../utils/validation.js';
import { hashPassword, comparePassword } from '../utils/passwordUtils.js';

const userService = (User) => {
  return {
    async register(login, password, firstName, lastName, passwordCheck) {

      validateRegisterInput(login, password, firstName, lastName, passwordCheck);

      const exists = await User.findOne({ login });
      if (exists) { throw new Error("Użytkownik istnieje") }

      const hashedPassword = await hashPassword(password);
      const user = await User.create({ login, password: hashedPassword, firstName, lastName });

      return user;
    },
    async login(login, password) {

      validateLoginInput(login, password);

      const user = await User.findOne({ login });
      if (!user) { throw new Error("Niepoprawny login!") }
      if (user.isLogged === true) { throw new Error("Użytkownik jest zalogowany") }

      const match = await comparePassword(password, user.password);
      if (!match) { throw new Error("Niepoprawne hasło!") }

      user.isLogged = true;
      await user.save();
      return user;
    },
    async logoutUser(userId) {
      try {
        const user = await User.findById(userId);
        
        if (!user) { throw new Error("Nie znaleziono użytkownika!") }
        if (user.isLogged === false) { throw new Error("Użytkownik jest już wylogowany") }
        
        user.isLogged = false;
        await user.save();
        return user;
      } catch (error) {
        console.error("Błąd podczas wylogowywania użytkownika:", error);
        throw error;
      }
    }
  }
}

export default userService;