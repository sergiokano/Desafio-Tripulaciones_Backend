const express = require("express");

const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8081;
const cors = require("cors");

const { dbConnection } = require("./config/config");
app.use(cors())
app.use(express.json());

app.use("/users", require("./routes/users"));
app.use("/posts", require("./routes/posts"));
app.use(express.static('imagesmulter'));



dbConnection();
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
