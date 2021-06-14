
exports.up = function(knex) {
    return Promise.all[knex.schema.table('receipts', table => {
        table.dropColumn('qty');
      }),
      knex.schema.createTable('receipts_relation', table=>{ 
        table.increments('id')
        table.integer('receipt_id').references('receipts.id').notNullable()
        table.integer('inventory_id').references('inventory.id').notNullable()
        table.integer('qty').notNullable() 
        
      })
    ]

};

exports.down = function(knex) {
  
};
