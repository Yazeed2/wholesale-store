
exports.up = function(knex) {
    return knex.schema.createTable('receipts', table=>{
        table.increments('id')
        table.integer('client_id').references('users.id').notNullable()
        table.integer('store_id').references('users.id').notNullable()
        table.specificType('qty', 'INT[]').notNullable()
        table.timestamps(true, true);
        table.float('total').notNullable()


    });

};

exports.down = function(knex) {
    return knex.schema.dropTable('receipts');

};
