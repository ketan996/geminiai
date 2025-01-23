const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

if (!JWT_SECRET) {
    console.error('JWT_SECRET is not set. Exiting...');
    process.exit(1);
}


const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const actualToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token;

        const decoded = jwt.verify(actualToken, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('JWT verification error:', error.message);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Unauthorized: Token has expired' });
        }

        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = { isAuthenticated };
