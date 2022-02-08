const connection = require("./db").connection
const table = process.env.MYSQL_TABLE_RESULTS;


class ResultsDao {
    async create(command, data, plot) {
        const query = new Promise((resolve, reject) => {
            connection.query(`INSERT INTO ${table} (command, plot, data) VALUES (\"${command}\",\"${plot}\", \"${data}\")`, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({"resultsID": results.insertId});
                }
            });
        });
        return query;
    }

    async read(command) {
        const query = new Promise((resolve, reject) => { 
            connection.query(`SELECT * FROM ${table} WHERE command=\"${command}\"`, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({"results": results});
                }
            });
        });
        return query;
    }

    async readAll() {
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

    async delete(id) {
        const read = this.read(id);
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
    async update(id, { data, plot }) {
        const query = new Promise((resolve, reject) => { 
            connection.query(`UPDATE ${table} SET data = \"${data}\", plot= \"${plot}\" WHERE _ID = ${id}`
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

module.exports = ResultsDao;