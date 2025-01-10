const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

const verifyToken = (req, res, next) => {
    let token = req.header("Authorization");

    if (!token) {
        return res.status(403).send({
            message: "No token provided!",
        });
    }

    // Split the token from the header (assuming format "Bearer <token>")
    let tokenArray = token.split(" ");
    // Extract the token value
    let tokenValue = tokenArray[1];

    // Verify the token
    jwt.verify(tokenValue, config.secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!",
            });
        }
        // If token is valid, attach the decoded user data to the request object
        req.user_data = decoded;
        // Call the next middleware or route handler
        next();
    });
};

module.exports = { verifyToken };
