import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "yash"); // Verify token (use a strong secret)
    req.user = decoded; // Store user data in request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
