const mongoose = require("mongoose");
/* Database connection (Driver => MongoDB) */
const connection = mongoose
  .connect("mongodb+srv://root:root@cluster0.0g7pxnd.mongodb.net/?retryWrites=true&w=majority")
  .then(() => console.log("Connected successfully!"))
  .catch(notConnected =>
    console.log("Database not connected: " + notConnected)
  );

module.exports = connection;