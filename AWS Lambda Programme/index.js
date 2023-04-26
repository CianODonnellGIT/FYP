var mySql = require('mysql2');

exports.handler = async (event, context, callback) => {
    let connect = mySql.createConnection({
        host:   'fyp-database.cauvst9l0ldn.eu-west-1.rds.amazonaws.com',
        user:   'admin',
        password:'firstData',
        port:   '3306',
        database: 'fypdb'
    });

    let str1 = JSON.stringify(event, null, 2);
    let data = JSON.parse(str1);
    let end = new Date();
    let time = end.getTime();
    let cardId = data['Card UID'];
    let insert = 'insert into iot values (\'';
    let am = insert + time;
    let str2   = '\',';
    let am2 = am + str2 + cardId;
    let x = ')';
    let y = am2 + x;

    connection.query(y, function (error, results, fields){
        if (error) throw error;
        console.log('The solution is ', results);
    });
}