const asyncWrapper = (fn) => {
  //we are trying to avoid the try catch using the middleware function
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error); //passing error to the next  middlware in this case default error handler
    }
  };
};
module.exports = asyncWrapper;
