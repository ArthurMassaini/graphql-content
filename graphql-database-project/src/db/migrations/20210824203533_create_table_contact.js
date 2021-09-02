exports.up = function (knex) {
  return knex.schema.createTable('contacts', (table) => {
    table.increments('id').primary();
    table.string('name').notNull();
    table.string('email').notNull().unique();
    table.string('telephone').notNull();
  });
};

exports.down = function (knex) {
  return schema.dropTable('contacts');
};
