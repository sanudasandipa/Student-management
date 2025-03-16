const jwt = require('jsonwebtoken');

// Middleware to check if the user is authenticated
const protect = (req, res, next) => {
    let token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Remove 'Bearer ' from the token if present
    token = token.replace(/^Bearer\s/, '');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the user information to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = protect;
