const { RESTDataSource } = require('apollo-datasource-rest');
const UserNotFoundError = require('../errors/UserNotFoundError');

class GithubService extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.github.com';
  }

  async getUser(login) {
    try {
      return await this.get(`/users/${login}`);
    } catch (e) {
      if (e.extensions.response.status === 404) {
        throw new UserNotFoundError('User not found');
      }
      throw new Error(e);
    }
  }
}

module.exports = new GithubService();
