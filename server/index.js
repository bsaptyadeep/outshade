require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const rpvmailRoutes = require("./routes/verifymail");
const resetpassRoutes = require("./routes/resetpass");
const googleloginRoutes = require("./routes/google-login-auth");
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/rpvmail", rpvmailRoutes);
app.use("/api/resetpass", resetpassRoutes);
app.use("/api/google-login", googleloginRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
