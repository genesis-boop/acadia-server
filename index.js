const express = require("express");
const app = express();
const PORT = 8080;
const todoRoutes = require("./routes/todoRoutes");
const cors = require("cors");

// Middleware
app.use(cors());
app.use(express.json());
app.use("/static-files", express.static("files"));
app.use((_req, _res, next) => {
    console.log("Middleware running");
    next();
})

app.use("/todo", todoRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})