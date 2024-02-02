const Users = require("../models/Users");
const rateLimit = require("express-rate-limit");

const minutes = 15;

// Rate limit configuration
const limiter = rateLimit({
  windowMs: minutes * (60 * 1000),
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});

// Apply rate limiter to specific routes
const verifyAuth = async (req, res, next) => {
  try {
    const { email, id } = req.body;
    if (!email || !id) {
      return res.status(401).send("Invalid Credentials");
    }

    // Use the findOne method to find a user by primary key (id)
    const foundUser = await Users.findByPk({ where: { id: id, email: email } });

    if (!foundUser) return res.status(404).send("No user found");

    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json("Server error");
  }
};

// Additional middleware for more protection
const additionalMiddleware = (req, res, next) => {
  // Add your additional middleware logic here
  // For example, you can check for authentication tokens, validate input, etc.
  next();
};

module.exports = {
  verifyAuth: limiter(verifyAuth), // Apply rate limiter to verifyAuth middleware
  additionalMiddleware: additionalMiddleware,
};
