const generator = require('../../../helpers/generator');

module.exports = {
  User: {
    tasks: async (obj, _, context) => {
      const { dataSources } = context;
      const { taskService } = dataSources;

      return taskService.getTasksByUserId(obj.id);
    },
  },
  Query: {
    users: async (obj, args, context) => {
      const { dataSources } = context;
      const { userService } = dataSources;

      return await userService.getAllUsers();
    },
    user: async (_, args, context) => {
      const { login } = args;
      const { dataSources } = context;
      const { githubService, userService } = dataSources;

      const userDB = await userService.getUserByLogin(login);
      if (userDB !== undefined) {
        userDB.token = generator.createToken(userDB.id);
        return userDB;
      }

      const userAPI = await githubService.getUser(login);
      const newUser = await userService.createUser({
        login: userAPI.login,
        avatar_url: userAPI.avatar_url,
      });

      newUser.token = generator.createToken(newUser.id);
      return newUser;
    },
  },
};
