module.exports = {
  Query: {
    tasks: async (_, args, context) => {
      const { dataSources, validate } = context;
      const { taskService } = dataSources;

      const userId = validate();
      return await taskService.getAllTasks(userId);
    },
    task: async (_, { id }, context) => {
      const { dataSources, validate } = context;
      const { taskService } = dataSources;

      const userId = validate();
      return await taskService.getTaskById(id, userId);
    },
  },
  Mutation: {
    createTask: async (_, { data }, context) => {
      const { dataSources, validate } = context;
      const { taskService } = dataSources;

      const userId = validate();
      return await taskService.createTask(userId, data);
    },
    updateTask: async (_, { id, data }, context) => {
      const { dataSources, validate } = context;
      const { taskService } = dataSources;

      const userId = validate();
      return await taskService.updateTask(id, userId, data);
    },
    deleteTask: async (_, { id }, context) => {
      const { dataSources, validate } = context;
      const { taskService } = dataSources;

      const userId = validate();
      return await taskService.deleteTask(id, userId);
    },
  },
};
