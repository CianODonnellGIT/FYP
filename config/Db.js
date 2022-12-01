const {createPool} = require('mysql2');
const pool = createPool({
    host : 'localhost',
    user : 'root',
    password: 'mySQLatu22&',
    port: 3306,
    database: 'employee_db',
});

pool.getConnection((err)=>{
    if(err) {
        console.log('Error connecting to mySQL database');
    }
    else console.log('Connected to db...');
});

const executeQuery = (query, arrayParams) => {
    return new Promise((resolve, reject) => {
        try {
            pool.query(query, arrayParams, (err, data) => {
                if(err) {
                    console.log("error in executing the query");
                    reject(err);
                }
                resolve(data);
            });
        } catch (err) {
            reject(err);
        }
});
};

module.exports = {executeQuery};