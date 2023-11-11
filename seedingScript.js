import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// MySQL Connection Configuration
const db = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

// Creating MySql connection
const mysqlConnection = await mysql.createConnection(db);

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

const seedMySqlDatabase = async () => {
  try {
    // Create table
    await mysqlConnection.execute(createTable);

    console.log("MySql database seeded successfully");

    const insertQuery =
      "INSERT INTO vechiles (type, wheeler, brand) VALUES (?, ?, ?)";

    for (const myVehicle of dummyData) {
      await mysqlConnection.execute(insertQuery, [
        myVehicle.type,
        myVehicle.wheeler,
        myVehicle.brand,
      ]);
      console.log("Data seeded into the Database");
    }

    console.log("All data seeded successfully");
  } catch (error) {
    console.error("Error: ", error);
  } finally {
    await mysqlConnection.end();
    console.log("Disconnected from MySQL Database");
  }
};

try {
  console.log("Connecting to MySQL Database");
  await seedMySqlDatabase();
} catch (error) {
  console.error("Error in Connecting to the DB : ", error);
}
