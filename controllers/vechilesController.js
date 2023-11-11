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

export { wheelerType, getVehicles, vechileType };
