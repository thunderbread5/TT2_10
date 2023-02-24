const express = require("express");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./db.js");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     next();
// });

app.get("/", (req, res) => {
    res.status(200).json({ messsage: "Welcome" });
});

app.use("/api/users", require("./route/userRoutes"));
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
