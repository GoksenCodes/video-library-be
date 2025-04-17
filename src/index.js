const express = require("express");
const cors = require("cors");
require("dotenv").config();

const errorHandler = require("./middlewares/error-handler");

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const videoRoutes = require("./routes/videos");
app.use("/videos", videoRoutes);

//Error middleware
app.use(errorHandler);

module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => console.log(`Listening on ${PORT}`));
}

if (require.main === module) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
