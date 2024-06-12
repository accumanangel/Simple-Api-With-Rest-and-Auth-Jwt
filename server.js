import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import authRoutes from "./routes/auth.js";


const app = express();

dotenv.config()

const PORT = process.env.PORT || 5000;

app.use(express.json())

app.use('/api/auth',authRoutes)

// Route to handle GET requests to /api/echo
app.get('/', (req, res) => {
  // Get the data from the query parameter
  res.status(200).json({
    "message":"The api is working"
  })
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});