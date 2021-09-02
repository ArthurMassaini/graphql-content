// Update with your config settings.

module.exports = {
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    database: 'db_git_api',
    user: 'root',
    password: 'root',
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './src/db/migrations',
  },
};
