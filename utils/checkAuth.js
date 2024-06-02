import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(token, "secret123");

      req.userId = decoded._id;
      next();
    } catch (e) {
      tokenError(res);
    }
  } else {
    tokenError(res);
  }
};

const tokenError = (res) => {
  return res.status(401).json({ message: "Auth error" });
};
