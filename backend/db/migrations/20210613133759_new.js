
exports.up = function(knex) {
  return knex.schema.createTable('inventory', table=> { 
      table.increments('id')
      table.string('name').notNullable()
      table.specificType('min_qty_price', 'INT[]')
      table.specificType('max_qty_price', 'INT[]')
      table.specificType('price_per_qty', 'INT[]')
      table.integer('store_id').references('users.id')
    table.timestamps(true, true);

  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('inventory');

};
