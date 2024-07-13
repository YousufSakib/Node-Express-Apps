const express = require("express");
const path = require("path");
const record = require("./routes/record.js");
const app = express();

const port = process.env.PORT || 3000;
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(express.json()); //for parsing application/json
app.use(express.urlencoded({ extended: true })); //for parsing application/x-www-form-urlencoded

app.use("/api/v1", record);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
