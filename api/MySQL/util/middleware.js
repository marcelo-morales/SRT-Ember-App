const ApiError = require("../models/ApiError");
const { verifyToken, decodeToken, parseBearer } = require("./token");


const checkToken = async (req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization ? parseBearer(authorization) : "";
    const valid = await verifyToken(token);
    const user = decodeToken(token);
    if (!valid) {
        next(new ApiError(403, "You are not authorized to access this resource."));
    } else {
        req.user = user;
        next();
    }
};
  
const checkAdmin = async (req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization ? parseBearer(authorization) : "";
    const valid = await verifyToken(token);
    const user = decodeToken(token);
    if (!valid || user.role !== "ADMIN") {
        next(new ApiError(403, "You are not authorized to perform this action."));
    } else {
        next();
    }
};

const globalErrorHandler = (err, req, res, next) => {
    if (err) {
      // debug(err);
      if (err.status) {
        return res 
            .status(err.status)
            .json({ message: err.message });
        } else {
          res
            .status(500)
            .json("Internal server error!" );
      }
    }
    next();
};

module.exports = {
    checkAdmin,
    checkToken,
    globalErrorHandler
};