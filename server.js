const express = require("express");
const connectDB = require("./config/dbConnect");
const app = express();
const { errorHandler } = require("./middleware/errorHandler");
require("dotenv").config();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/auth", require("./routes/refreshTokenRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/admins", require("./routes/adminRoutes"));
app.use("/api/products", require("./routes/productRoutes"));

// error handler
app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
