exports.up = function (knex) {
  return knex.schema
    .createTable('Books', function (table) {
      table.increments()
      table.string('title').notNullable()
      table.string('author').notNullable()
      table.date('dateFinished').notNullable()
      table.integer('pages').notNullable()
      table.integer('rating').notNullable()
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
}

exports.down = function (knex) {
  return knex.schema
    .dropTable('Books')
}

exports.config = { transaction: false }
