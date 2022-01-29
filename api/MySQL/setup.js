require("dotenv").config();
const mysql = require("mysql");

try {
    let con = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.SQL_PASSWORD,
    });
    con.connect()
    con.query(`CREATE DATABASE ${process.env.SQL_DB}`, (error) => {
        if (error) {
            console.error("Database already exists", error);
        } else {
            console.log("Database created")
        }
    });
    con.query(`USE ${process.env.SQL_DB}`);
    con.query(`DROP TABLE IF EXISTS ${process.env.SQL_TABLE_RESULTS}`); 
    con.query(`DROP TABLE IF EXISTS ${process.env.SQL_TABLE_QUERIES}`);
    con.query(`CREATE TABLE ${process.env.SQL_TABLE_QUERIES} (_ID INT AUTO_INCREMENT NOT NULL PRIMARY KEY, command MEDIUMTEXT NOT NULL)`,
        (error) => { 
            if (error) throw error; 
            console.log("Queris Table created");
    });
    con.query(`CREATE TABLE ${process.env.SQL_TABLE_RESULTS} (_ID INT AUTO_INCREMENT NOT NULL PRIMARY KEY, command MEDIUMTEXT NOT NULL, image TEXT, data LONGTEXT)`, 
        (error) => { 
            if (error) throw error; 
            console.log("Results Table created");
    });
    con.end();

} catch(error) {
    console.error(error.message);
}