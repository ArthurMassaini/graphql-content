const { ValidationError, UserInputError } = require('apollo-server-express');
const database = require('../../../data/data.json');

const generateId = (array) => {
  return array.length > 0 ? array[array.length - 1].id + 1 : 1;
};

module.exports = {
  Usuario: {
    papel(obj, _) {
      return database.papeis.find((papel) => papel.id === obj.papel);
    },
  },
  Query: {
    usuarios() {
      return database.usuarios;
    },
    usuario(_, args) {
      return database.usuarios.find((user) => user.id === args.id);
    },
  },
  Mutation: {
    criarUsuario(_, { data }) {
      const { email } = data;
      const emailAlreadyExists = database.usuarios.some(
        (user) => user.email === email,
      );

      if (emailAlreadyExists) {
        throw new ValidationError('Email ja existe no banco de dados');
      }

      const newUser = { id: generateId(database.usuarios), papel: 2, ...data };
      database.usuarios.push(newUser);
      return newUser;
    },
    updateUsuario(_, { id, data }) {
      const user = database.usuarios.find((user) => user.id === id);
      if (user === undefined) {
        throw new UserInputError('Usuario nao encontrado');
      }
      const index = database.usuarios.findIndex((user) => user.id === id);

      const updatedUser = { ...data, id, papel: user.papel };

      database.usuarios.splice(index, 1, updatedUser);

      return updatedUser;
    },
    deletarUsuario(_, { id }) {
      const user = database.usuarios.find((user) => user.id === id);
      if (user === undefined) {
        throw new UserInputError('Usuario nao encontrado');
      }

      const filtered = database.usuarios.filter((user) => user.id !== id);

      database.usuarios = [...filtered];

      return 'Deletado com sucesso';
    },
  },
};
