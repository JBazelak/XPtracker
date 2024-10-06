import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
import Skill from './skillModel.js';

const userSchema = new mongoose.Schema(
  {
    login: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    strength: {
      type: Number,
      default: 0,
    },
    agility: {
      type: Number,
      default: 0,
    },
    intelligence: {
      type: Number,
      default: 0,
    },
    level: {
      type: Number,
      default: 1,
    },
    isLogged: {
      type: Boolean,
      default: false,
    },
    skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skill',
      }
    ]
  },
  {
    timestamps: true,
  }
);


//register 
userSchema.statics.register = async function (login, password, firstName, lastName, passwordCheck) {

  if (!login || !password || !firstName || !lastName) { throw Error("Uzupełnij wszystkie pola!") };
  if (password !== passwordCheck) {throw Error("Hasła nie są identyczne")};
  if (!validator.isStrongPassword(password)) { throw Error("Hasło jest za słabe!") };

  const exists = await this.findOne({ login });
  if (exists) { throw Error("Użytkownik istnieje") };


  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ login, password: hash, firstName, lastName });
  return user;
}


//login
userSchema.statics.login = async function (login, password) {
  if (!login || !password) { throw Error("Uzupełnij wszystkie pola!") };

  const user = await this.findOne({ login });
  
  if (!user) { throw Error("Niepoprawny login!") };
  if(user.isLogged === true) {throw Error("Użytkownik jest zalogowany")};
  
  const match = await bcrypt.compare(password, user.password);
  if (!match) { throw Error("Niepoprawne hasło!") };
  user.isLogged = true;
  return user;
};


const User = mongoose.model('User', userSchema);

export default User;
