import jwt from 'jsonwebtoken';

const JWT_SECRET = 'f9275f38c0b142bfb0d02c6d5ab3d5c7b18e47c172cf8b3447f85dc8fc02cda8'; // use process.env.JWT_SECRET in production

export const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;  // 👈 attach userId to the req
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
