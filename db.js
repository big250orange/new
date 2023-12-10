const mysql = require("mysql");

const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodequiz",
  multipleStatements: true,
});

module.exports = database;
