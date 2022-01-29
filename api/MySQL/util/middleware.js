const globalErrorHandler = (err, req, res, next) => {
    if (err) {
      // debug(err);
      return res
        .status(err.status || 500)
        .json({ message: err.message || "Internal server error!" });
    }
    next();
};

module.exports = {
      globalErrorHandler
  };