require("dotenv").config();
const mysql = require("mysql");

try {
    let con = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB,
    });
    con.connect()
    /*con.query(`CREATE DATABASE ${process.env.MYSQL_DB}`, (error) => {
        if (error) {
            console.error("Database already exists", error);
        } else {
            console.log("Database created")
        }
    });*/
    con.query(`USE ${process.env.MYSQL_DB}`);
    con.query(`DROP TABLE IF EXISTS ${process.env.MYSQL_TABLE_RESULTS}`); 
    con.query(`DROP TABLE IF EXISTS ${process.env.MYSQL_TABLE_QUERIES}`);
    con.query("DROP TABLE IF EXISTS USERS");
    con.query(`CREATE TABLE ${process.env.MYSQL_TABLE_QUERIES} (_ID INT AUTO_INCREMENT NOT NULL PRIMARY KEY, command MEDIUMTEXT NOT NULL, email TEXT NOT NULL)`,
        (error) => { 
            if (error) throw error; 
            console.log("Queris Table created");
    });
    con.query(`CREATE TABLE ${process.env.MYSQL_TABLE_RESULTS} (_ID INT AUTO_INCREMENT NOT NULL PRIMARY KEY, command MEDIUMTEXT NOT NULL, plot TEXT, data LONGTEXT)`, 
        (error) => { 
            if (error) throw error; 
            console.log("Results Table created");
    });
    con.query(`CREATE TABLE Users (_ID INT AUTO_INCREMENT NOT NULL PRIMARY KEY, username VARCHAR(100) NOT NULL UNIQUE, password VARCHAR(100) NOT NULL, role VARCHAR(10) NOT NULL, failedLogin TINYINT);`, 
        (error) => { 
            if (error) throw error; 
            console.log("Users Table created");
    });
    con.end();

} catch(error) {
    console.error(error.message);
}