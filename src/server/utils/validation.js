import validator from 'validator';

export function validateRegisterInput(login, password, firstName, lastName, passwordCheck) {
  if (!login || !password || !firstName || !lastName) {
    throw new Error("Uzupełnij wszystkie pola!");
  }
  if (password !== passwordCheck) {
    throw new Error("Hasła nie są identyczne");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Hasło jest za słabe!");
  }
}

export function validateLoginInput(login, password) {
  if (!login || !password) {
    throw new Error("Uzupełnij wszystkie pola!");
  }
}
