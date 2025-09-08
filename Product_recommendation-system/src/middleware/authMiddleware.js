import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user info (id, role, email)
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

// ✅ (Optional) Check for admin role
export const verifyAdmin = (req, res, next) => {
  if (req.user.urole !== "admin") {
    console.log("role is "+req.user.urole);
    return res.status(403).json({ message: "Admins only" });
  }
  next();
};
export const verifyUser = (req, res, next) => {
  if (req.user.urole !== "user") {
    console.log("role is "+req.user.urole);
    return res.status(403).json({ message: "Admins only" });
  }
  next();
};
