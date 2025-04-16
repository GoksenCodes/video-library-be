const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
