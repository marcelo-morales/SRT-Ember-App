require("dotenv").config();
const mysql = require("mysql");
const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
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