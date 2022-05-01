const express = require('express');
const ApiError = require('../models/ApiError');
const UserDao = require('../data/UserDao');
const user = new UserDao();
const { verifyPassword } =  require('../util/hashing');
const { createToken, verifyToken, parseBearer, decodeToken} = require('../util/token');
const router = express.Router();

router.get('/authenticate', async (req, res, next) => {
    try {
        let { username, password } = req.query;
        let userData = await user.read(username);
        

        if (userData == undefined) {
            throw new ApiError(403, "Invalid login. Wrong username or password");
        }
        
        const hashedPassword = userData.password;
        delete userData.password;
        
        const isAuthenticated = await verifyPassword(password, hashedPassword);
        if (isAuthenticated) {
            res.status(200).json({
                message: "Successful Authentication",
                token: createToken(userData, "2d"),
                role: userData.role
            });
        } else {
            throw new ApiError(403, "Invalid login. Wrong username or password"); 
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
});

router.post("/verify", async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new ApiError(400, "You must provide a token!");
    }

    const token = parseBearer(authorization);
    const isValid = await verifyToken(token);
    if (!isValid) {
      throw new ApiError(403, "Invalid or expired token!");
    }
    const decoded = decodeToken(token);
    return res.json({
      message: "Token verified, and it is valid!",
      token: token,
      role: decoded.role
    });
  } catch (err) {
      console.log(err)
    next(err);
  }
});

module.exports = router;