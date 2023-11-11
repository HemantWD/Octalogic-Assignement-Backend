import db from "../config/db.js";

const wheelerType = async (req, res) => {
  try {
    const connection = await db();
    const query = "SELECT DISTINCT wheeler FROM vechiles";
    const [rows] = await connection.execute(query);
    connection.end();

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Categories",
      });
    }

    res.json({ rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getVehicles = async (req, res) => {
  const wheeler = req.params.wheeler;

  try {
    const connection = await db();
    const query = "SELECT * FROM vechiles WHERE wheeler = ?";
    const [rows] = await connection.execute(query, [wheeler]);
    connection.end();

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Matching vehicles Found",
      });
    }

    res.json({ rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const vechileType = async (req, res) => {
  const type = req.params.type;
  try {
    const connection = await db();
    const query = "SELECT * FROM `vechiles` WHERE type = ?";
    const [rows] = await connection.execute(query, [type]);
    connection.end();
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No Vechiles found for this ${type} type `,
      });
    }
    res.json({ rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const bookVehicle = async (req, res) => {
  const { vehicleId, startDate, endDate } = req.body;
  let user = req.user;

  const firstName = user.name.split(" ")[0];
  const lastName = user.name.split(" ")[1];

  // Validate parameters
  if (!vehicleId || !startDate || !endDate) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required parameters" });
  }

  // Validate date formats
  if (
    isNaN(new Date(startDate).getTime()) ||
    isNaN(new Date(endDate).getTime())
  ) {
    return res.status(400).json({ success: false, message: "Invalid date" });
  }

  // Validate date range
  if (new Date(startDate) >= new Date(endDate)) {
    return res
      .status(400)
      .json({ success: false, message: "Start date must be before end date" });
  }

  // Validate start date is in the future
  if (new Date(startDate) <= new Date()) {
    return res
      .status(400)
      .json({ success: false, message: "Start date must be in the future" });
  }

  try {
    const connection = await db();

    // Use transaction for atomicity
    await connection.beginTransaction();

    const checkAvailabilityQuery =
      "SELECT * FROM booking WHERE vehicle_id = ? AND ((booking_date <= ? AND end_date >= ?) OR (booking_date <= ? AND end_date >= ?))";

    // Check if the selected vehicle is available
    const [rows] = await connection.execute(checkAvailabilityQuery, [
      vehicleId,
      startDate,
      endDate,
      startDate,
      endDate,
    ]);

    if (rows.length > 0) {
      await connection.rollback();
      return res.status(400).json({
        success: false,
        message: "Selected vehicle is already booked for the specified dates",
      });
    }

    const createBookingQuery =
      "INSERT INTO booking (user_first_name, user_last_name, vehicle_id, booking_date, end_date) VALUES (?, ?, ?, ?, ?)";

    // Create a new booking
    await connection.execute(createBookingQuery, [
      firstName,
      lastName,
      vehicleId,
      startDate,
      endDate,
    ]);

    // Commit the transaction
    await connection.commit();

    connection.end();
    return res
      .status(200)
      .json({ success: true, message: "Booking created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export { wheelerType, getVehicles, vechileType, bookVehicle };
