const NoPermissionError = require('../errors/NoPermissionError');
const TaskNotFoundError = require('../errors/TaskNotFoundError');
const UserNotFoundError = require('../errors/UserNotFoundError');

module.exports = (err) => {
  if (err.extensions.code === 'GRAPHQL_VALIDATION_FAILED') {
    return new ValidationError(err.message);
  }
  if (err.originalError instanceof NoPermissionError) {
    return new NoPermissionError(err.message);
  }
  if (err.originalError instanceof TaskNotFoundError) {
    return new TaskNotFoundError(err.message);
  }
  if (err.originalError instanceof UserNotFoundError) {
    return new UserNotFoundError(err.message);
  }
  return err;
};
