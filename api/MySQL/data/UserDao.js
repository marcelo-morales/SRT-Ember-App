const connection = require('./db').connection;
const randomString = require("randomstring");
const ApiError = require('../models/ApiError');
const { hashPassword } = require('../util/hashing');
const table = "Users";

//NOTE:: uid_text is the hex representation of the uid.
class UserDao {
    //Passwords are auto generated.
    async create(username = undefined, role = "USER") {
        if (username === undefined) {
            username = randomString.generate({
                length: 10,
                charset: 'alphanumeric',
                capitalization: 'lowercase',
            });
        }
        const password = randomString.generate({
            length: 10,
            charset: 'alphanumeric',
        });
        const hash = await hashPassword(password);
        const query = new Promise((resolve, reject) => {
            connection.query(
            `INSERT INTO ${table} (username, password, role, failedLogin)
             VALUES (\"${username}\", \"${hash}\", \"${role}\", 0)`,
              (error, results, fields) => {
                if (error) {
                    console.log(error)
                    reject(error);
                } else {
                    resolve({ _ID: results.insertId ,username: username, password: password , role: role});
                } 
              }
            );
        });
        return query;
    }

    //Returns the password of the given username
    async read(username) {
        const query = new Promise((resolve, reject) => {
            connection.query(
            `SELECT _ID,username, password, role FROM ${table} WHERE username = \"${username}\"`,
              (error, results, fields) => {
                if (error) {
                    console.log(error)
                    reject(error);
                } else {
                    resolve(results[0]);
                }
              }
            );
        });
        return query;
    }

    async readAll() {
        const query = new Promise((resolve, reject) => {
            connection.query(`SELECT _ID, username, role, failedLogin FROM Users 
                                ORDER BY role ASC`,
            (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve (results);
                }
            });
        });
        return query;
    }

    async update(username, password) {
        const hash = await hashPassword(password);
        const query = new Promise((resolve, reject) => {
            connection.query(
            `UPDATE ${table} SET password = \"${hash}\" WHERE username = \"${username}\"`,
              (error, results, fields) => {
                if (results.affectedRows == 0) {
                    throw new ApiError(500, "Unable to update password.")
                }
                if (error) {
                   reject(error);
                } else {
                    resolve({ results: results });
                }
              }
            );
        });
    }

    async delete(id) {
        const query = new Promise((resolve, reject) => {
            connection.query(
            `DELETE FROM Users WHERE _ID = \"${id}\"`,
            (error, results, fields) => { 
                if (error) {
                    reject(error);
                } else {
                    resolve({ results: results });
                }
            }
            );
        });
    }
}

module.exports = UserDao;