// using mysql2 library as it is an enhanced version of the mysql library and provides better performance for JS features
import mysql from "mysql2/promise";

export default async function db() {
  const host = process.env.HOST;
  const user = process.env.USER;
  const password = process.env.PASSWORD;
  const database = process.env.DATABASE;

  try {
    const pool = await mysql.createPool({
      host,
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    console.log("Connected to the MYSQL Database");
    return pool;
  } catch (error) {
    console.log("Error in connecting with the database", err);
    error;
  }
}
