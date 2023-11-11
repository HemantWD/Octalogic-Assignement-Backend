import JWT from "jsonwebtoken";

export const loginController = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    // validation
    if (!firstName || !lastName) {
      return res.status(404).send({
        success: false,
        messgae: "First Name or Last Name Required",
      });
    }
    // token creation
    const token = await JWT.sign(
      { name: `${firstName}${lastName}` },
      process.env.JWT_SECRET,
      { expiresIn: "5m" }
    );
    res.status(200).send({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    req.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};
