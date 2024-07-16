require("dotenv").config();
const express = require("express");
const mainRouter = require("./routes/main");
const errorHandlerMiddleware = require("./middlewares/errorHandler");
const notFoundMiddleware = require("./middlewares/notFoundHandler");
const app = express();

app.use(express.json());
app.use("/api/v1", mainRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        app.listen(port, () => {
            console.log(`app is listening on port ${port}`);
        });
    } catch (err) {
        console.log(err);
    }
};

start();
