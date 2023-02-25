const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const router = require("./route/userRoutes");

const port = process.env.PORT || 5000;
const uri = "mongodb+srv://john088:A1122334455A@cluster0.hpiinuy.mongodb.net/?retryWrites=true&w=majority";

app.use(express.json());
app.use(cors());
app.use("/api/users", router);

mongoose
    .set('strictQuery', true)
    .connect(uri)
    .then(() =>
        app.listen(port, '127.0.0.1',() => {console.log(`Server running on port ${port}`)}))
    .catch((err) => console.log(err));
