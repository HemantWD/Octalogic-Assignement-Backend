import JWT from "jsonwebtoken";

export const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send({ message: "Authorization is Required" });
    }
    const decode = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    res.status(403).send({ error });
  }
};
