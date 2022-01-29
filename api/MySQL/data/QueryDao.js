const connection = require("./db").connection
const ApiError = require("../models/ApiError");


class QueryDao {
    async create(command, table) {
        const query = new Promise((resolve, reject) => {
            connection.query(`INSERT INTO ${table} (command) VALUES (\"${command}\")`, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({"resultsID": results.insertId});
                }
            });
        });
        return query;
    }

    async read(id, table) {
        const query = new Promise((resolve, reject) => { 
            connection.query(`SELECT * FROM ${table} WHERE _ID=${id}`, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({"results": results});
                }
            });
        });
        return query;
    }

    async readAll(table) {
        const query = new Promise((resolve, reject) => { 
            connection.query(`SELECT * FROM ${table}`, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({"results": results});
                }
            });
        });
        return query;
    }

    async delete(id, table) {
        const read = this.read(id, table);
        const query = new Promise((resolve, reject) => { 
            connection.query(`DELETE FROM ${table} WHERE _ID = ${id}`, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    console.log(results)
                    resolve({"results": results});
                }
            });
        });
        return read;
    }

    //Can only update the results table, not the query table
    async update(id, { data, image }, table) {
        const query = new Promise((resolve, reject) => { 
            connection.query(`UPDATE ${table} SET data = \"${data}\", image= \"${image}\" WHERE _ID = ${id}`
              , (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    console.log(results)
                    resolve({"results": results});
                }
            });
        });
        return query;
    }
}

module.exports = QueryDao;