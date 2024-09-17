const express = require("express");
const cors = require("cors");

const todoRoutes = require("./routes/todoRoutes");
const healthCheckRoute = require("./routes/healthCheck");

const app = express();
app.use(express.json());

app.use(cors());

app.all("/", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// Routes
app.use("/health-check", healthCheckRoute);
app.use("/todos", todoRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
