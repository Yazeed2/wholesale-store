
exports.up = function(knex) {
  return knex.schema.table('inventory', table => { 
    table.specificType('price_per_qty', 'FLOAT[]').alter() 

  })
};

exports.down = function(knex) {
  
};
