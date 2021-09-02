const { ValidationError, UserInputError } = require('apollo-server-express');
const db = require('../db');

class ContactService {
  constructor(repository) {
    this.repository = repository;
  }

  userNotFoundValidation = (user) => {
    if (user === undefined) {
      throw new UserInputError('Contact not found');
    }
  };

  userAlreadyRegisteredValidation = (allUsers, email) => {
    const emailAlreadyExists = allUsers.some((user) => user.email === email);

    if (emailAlreadyExists) {
      throw new ValidationError('Email already registered');
    }
  };

  getUserById = async (id) => {
    const user = await (
      await this.repository('contacts').select('*').where('id', id)
    )[0];
    return user;
  };

  getUserByEmail = async (email) => {
    const user = await (
      await this.repository('contacts').select('*').where('email', email)
    )[0];
    return user;
  };

  getAllContacts = async () => {
    return await this.repository('contacts');
  };

  createContact = async (data) => {
    const { email } = data;

    const allUsers = await this.getAllContacts();

    this.userAlreadyRegisteredValidation(allUsers, email);

    await this.repository('contacts').insert(data);

    return await this.getUserByEmail(email);
  };

  updateContact = async (id, data) => {
    const user = await this.getUserById(id);
    this.userNotFoundValidation(user);

    await this.repository('contacts').update(data).where('id', id);

    return user;
  };

  deleteContact = async (id) => {
    const user = await this.getUserById(id);
    this.userNotFoundValidation(user);

    await this.repository('contacts').delete().where('id', id);

    return 'Deletado com sucesso';
  };
}

module.exports = new ContactService(db);
