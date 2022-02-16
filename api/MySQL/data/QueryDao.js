const connection = require('./db').connection;
const ApiError = require('../models/ApiError');
const table = process.env.MYSQL_TABLE_QUERIES;

class QueryDao {
    async create(command, email) {
        const query = new Promise((resolve, reject) => {
            connection.query(
            `INSERT INTO ${table} (command, email) VALUES (\"${command}\", \"${email}\")`,
              (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({ resultsID: results.insertId });
                } 
              }
            );
        });
        return query;
    }

    async read(id) {
        const query = new Promise((resolve, reject) => {
            connection.query(
            `SELECT * FROM ${table} WHERE _ID=${id}`,
              (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({ results: results });
                }
              }
            );
        });
        return query;
    }

    async readAll() {
        const query = new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM ${table}`, 
              (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({ results: results });
                }
            });
        });
        return query;
    }

    async delete(id) {
        const read = this.read(id);
        const query = new Promise((resolve, reject) => {
            connection.query(
            `DELETE FROM ${table} WHERE _ID = ${id}`,
              (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({ results: results });
                }
              }
            );
        });
        return read;
    }
}
module.exports = QueryDao;
