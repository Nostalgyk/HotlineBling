exports.up = function (knex) {
  return knex.schema.createTable('transactions', function (table) {
    //primary key
    table.increments();

    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();
    table.string('category').notNullable();

    //relationship
    table.string('user_id').notNullable();

    //foreign key
    table.foreign('user_id').references('id').inTable('users');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('transactions');
};
