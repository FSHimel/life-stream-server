import { adminAuth } from "../config/firebaseAdmin.js";

const verifyFBToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ message: "unauthorized access" });
  }

  try {
    const idToken = token.split(" ")[1];
    const decoded = await adminAuth.verifyIdToken(idToken);
    req.decoded_email = decoded.email;

    next();
  } catch (err) {
    res.status(401).send({ message: "unauthorized access" });
  }
};

export default verifyFBToken;
