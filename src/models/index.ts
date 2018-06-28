import * as Sequelize from 'sequelize';

const { DB_USER = 'user', DB_PW = '1234' } = process.env;

export const sequelize = new Sequelize('auth', DB_USER, DB_PW, {
  host: 'localhost',
  dialect: 'sqlite', //'mysql'|'sqlite'|'postgres'|'mssql'
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  // SQLite only
  storage: 'database.sqlite',
  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false,
});

export * from './user';
