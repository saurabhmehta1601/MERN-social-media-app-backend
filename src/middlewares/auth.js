import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, userId) => {
      if (err) {
        return res.status(403).json({ message: "Invalid auth token" });
      }
      req.userId = userId;
      next();
    });
  } else {
    return res.sendStatus(401).json({ message: "Missing auth token" });
  }
};
