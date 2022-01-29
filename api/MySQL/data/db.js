require("dotenv").config();
const mysql = require("mysql");
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DB,
    table: process.env.SQL_TABLE_QUERIES
});
async function connect() {
    try { 
        connection.connect(function (err) {
            if (err) {
                console.error('error:' + err.message);
            }
        });
                    
    } catch (error) {
        console.log(err);
    } 
}

module.exports = { connect, connection }