// schema.js
const userSchema = {
    id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
    username: 'TEXT NOT NULL',
    password: 'TEXT NOT NULL',
  };
  
  module.exports = userSchema;
  