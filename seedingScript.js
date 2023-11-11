import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

// MySQL Connection Configuration
const db = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

// Creatinf MySql connection
const mysqlConnection = mysql.createConnection(db);

// mysql query
const createTable = `CREATE TABLE IF NOT EXISTS vechiles (id INT AUTO_INCREMENT PRIMARY KEY, type VARCHAR(255), wheeler INT, brand VARCHAR(255))`;

const dummyData = [
  { type: "hatchback", wheeler: 4, brand: "Hyundai i20" },
  { type: "hatchback", wheeler: 4, brand: "Tata Altroz" },
  { type: "hatchback", wheeler: 4, brand: "Toyota Glanza" },
  { type: "suv", wheeler: 4, brand: "Hyundai Creta" },
  { type: "suv", wheeler: 4, brand: "Tata Harrier" },
  { type: "suv", wheeler: 4, brand: "MG Hector" },
  { type: "sedan", wheeler: 4, brand: "Hyundai Verna" },
  { type: "sedan", wheeler: 4, brand: "Porche Panamera" },
  { type: "sedan", wheeler: 4, brand: "Audi A6" },
  { type: "cruiser", wheeler: 2, brand: "Kawasaki Vulcan S" },
  { type: "cruiser", wheeler: 2, brand: "Triumph Rocket 3" },
  { type: "cruiser", wheeler: 2, brand: "Royal Enfield Meteor" },
  { type: "sports", wheeler: 2, brand: "BMW S1000RR" },
  { type: "sports", wheeler: 2, brand: "Aprilla RSV4" },
  { type: "sports", wheeler: 2, brand: "Duati Panigate v4" },
];

const seedMySqlDatabase = () => {
  mysqlConnection.query(createTable, (error) => {
    if (error) {
      console.log("Error in creating Table :", error);
      mysqlConnection.end();
      return;
    }

    console.log("MySql database seeded successfully");

    const insertQuery =
      "INSERT INTO vechiles (type,wheeler,brand)VALUES(?,?,?)";
    let count = 0;

    const nextData = () => {
      if (count < dummyData.length) {
        const myVechile = dummyData[count];
        mysqlConnection.query(
          insertQuery,
          [myVechile.type, myVechile.wheeler, myVechile.brand],
          (error) => {
            if (error) {
              console.log("Error inserting Data");
            } else {
              console.log("Data seeded into the Database");
            }
            count++;
            nextData();
          }
        );
      } else {
        mysqlConnection.end();
        console.log("Disconnected from MySQL Database");
      }
    };
    nextData();
  });
};

mysqlConnection.connect((error) => {
  if (error) {
    console.log("Error in Connecting to the DB : ", error);
  } else {
    console.log("Connected to MYSQL Database");
    seedMySqlDatabase();
  }
});
