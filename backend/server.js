const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 5000;
const uri = "mongodb+srv://john088:A1122334455A@cluster0.knubn2m.mongodb.net/?retryWrites=true&w=majority";
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/users", router);
app.use("/api/transactions", tranRouter);

app.use("/api/users", require("./route/userRoutes"));

mongoose
    .set('strictQuery', true)
    .connect(uri)
    .then(() =>
        app.listen(port, '0.0.0.0', () => {console.log(`Server running on port ${port}`)}))
    .catch((err) => console.log(err));
