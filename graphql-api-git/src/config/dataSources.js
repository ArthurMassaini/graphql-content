const GithubService = require("../services/GithubService");
const TaskService = require("../services/TaskService");
const UserService = require("../services/UserService");

module.exports = () => ({
  githubService: GithubService,
  userService: UserService,
  taskService: TaskService,
});
