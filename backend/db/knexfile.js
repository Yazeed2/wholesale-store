// Update with your config settings.
require('dotenv/config')
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: process.env.DB ||  'my_db',
      user:     process.env.DB_USERNAME || 'username',
      password: process.env.DB_PASSWORD ||'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
};
