require('dotenv').config();
const jwt = require('jsonwebtoken');

const fetchuser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.json({ success: false, message: "Authentication token is required." });
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = data.user;
        next();
    } catch (error) {
        res.json({ success: false, message: "Authentication token is not valid." });
        console.log(error.message);
    }
}

module.exports = fetchuser;