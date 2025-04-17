const { query, validationResult } = require("express-validator");

const validateVideoQuery = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Limit must be a positive integer"),
  query("sort_by")
    .optional()
    .isIn(["created_at", "title"])
    .withMessage("Invalid sort_by value"),
  query("order")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("Invalid order value"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Invalid query parameters");
      error.status = 400;
      error.details = errors.array();
      return next(error);
    }
    next();
  },
];

module.exports = {
  validateVideoQuery,
};
