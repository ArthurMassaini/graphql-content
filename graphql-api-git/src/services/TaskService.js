const { ValidationError, UserInputError } = require('apollo-server-express');
const TaskNotFoundError = require('../errors/TaskNotFoundError');
const NoPermissionError = require('../errors/NoPermissionError');
const db = require('../db');

class TaskService {
  constructor(repository) {
    this.repository = repository;
  }

  taskNotFoundValidation = (task) => {
    if (task === undefined) {
      throw new TaskNotFoundError('Task not found');
    }
  };

  authValidation = (taskUserId, userId) => {
    if (taskUserId !== Number(userId)) {
      throw new NoPermissionError('Not authorized to access this task');
    }
  };

  getAllTasks = async (userId) => {
    return await this.repository('tasks').where('user_id', userId);
  };

  getTasksByUserId = async (userId) => {
    return await this.repository('tasks').select('*').where('user_id', userId);
  };

  getTaskById = async (id, userId) => {
    const task = await (
      await this.repository('tasks').select('*').where('id', id)
    )[0];

    this.taskNotFoundValidation(task);
    this.authValidation(task.user_id, userId);

    return task;
  };

  createTask = async (userId, data) => {
    console.log(userId);
    await this.repository('tasks').insert({ user_id: userId, ...data });

    const allTasks = await this.getAllTasks(userId);
    return await allTasks[allTasks.length - 1];
  };

  updateTask = async (id, userId, data) => {
    await this.getTaskById(id, userId);

    await this.repository('tasks').update(data).where('id', id);

    return await this.getTaskById(id, userId);
  };

  deleteTask = async (id, userId) => {
    await this.getTaskById(id, userId);

    await this.repository('tasks').delete().where('id', id);

    return 'Succeessfully deleted';
  };
}

module.exports = new TaskService(db);
