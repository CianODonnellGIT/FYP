/*
This code was inspired by the following reference
    GitHub, "olbega/nextjs-crud-mysql" [Online]. Available: https://github.com/oelbaga/nextjs-crud-mysql.
    GitHub, "auth0/nextjs-auth0: Next.js SDK for signing in with Auth0" [Online]. Available: https://github.com/auth0/nextjs-auth0.
*/
import mysql from "mysql2/promise";

export async function query({query, value = []}){

    const mySQLconnect = await mysql.createConnection({
        host: 'fyp-database.cauvst9l0ldn.eu-west-1.rds.amazonaws.com',
        user: 'admin',
        password: 'firstData&',
        port: 3306,
        database: 'fypdb'
    });

    try{
        const [result] = await mySQLconnect.execute(query, value);
        mySQLconnect.end();
        return result;
    }catch(error) {
        throw Error(error.message);
    }
}

