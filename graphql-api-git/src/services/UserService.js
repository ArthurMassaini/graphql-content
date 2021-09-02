const { ValidationError, UserInputError } = require('apollo-server-express');
const db = require('../db');

class UserService {
  constructor(repository) {
    this.repository = repository;
  }

  // userAlreadyRegisteredValidation = (allUsers, login) => {
  //   const emailAlreadyExists = allUsers.some((user) => user.login === login);

  //   if (emailAlreadyExists) {
  //     throw new ValidationError('User already registered');
  //   }
  // };

  //   userNotFoundValidation = (user) => {
  //     if (user === undefined) {
  //       throw new UserInputError('User not found');
  //     }
  //   };

  getAllUsers = async () => {
    return await this.repository('users');
  };

  getUserByLogin = async (login) => {
    const user = await (
      await this.repository('users').select('*').where('login', login)
    )[0];

    // this.userNotFoundValidation(user);

    return user;
  };

  createUser = async (user) => {
    const { login } = user;

    // const allUsers = await this.getAllUsers();
    // this.userAlreadyRegisteredValidation(allUsers, login);

    await this.repository('users').insert(user);

    return await this.getUserByLogin(login);
  };
}

module.exports = new UserService(db);
