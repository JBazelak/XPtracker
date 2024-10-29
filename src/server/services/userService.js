import bcrypt from 'bcrypt';
import validator from 'validator';

const userService = (User) => {
  return {
    async register(login, password, firstName, lastName, passwordCheck) {
      if (!login || !password || !firstName || !lastName) {
        throw Error("Uzupełnij wszystkie pola!");
      }
      if (password !== passwordCheck) {
        throw Error("Hasła nie są identyczne");
      }
      if (!validator.isStrongPassword(password)) {
        throw Error("Hasło jest za słabe!");
      }

      const exists = await User.findOne({ login });
      if (exists) {
        throw Error("Użytkownik istnieje");
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const user = await User.create({ login, password: hash, firstName, lastName });
      return user;
    },
    async login(login, password) {
      if (!login || !password) {
        throw Error("Uzupełnij wszystkie pola!");
      }

      const user = await User.findOne({ login });
      if (!user) {
        throw Error("Niepoprawny login!");
      }
      if (user.isLogged === true) {
        throw Error("Użytkownik jest zalogowany");
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw Error("Niepoprawne hasło!");
      }
      user.isLogged = true;
      await user.save();
      return user;
    },
  }
}

export default userService;