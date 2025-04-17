const express = require('express');
const cors = require('cors');
require('dotenv').config();

const errorHandler = require('./middlewares/error-handler');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const videoRoutes = require('./routes/videos');
app.use('/videos', videoRoutes);

//Error middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
