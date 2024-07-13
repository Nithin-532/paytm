const express = require("express");
const router = require("./routes");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/api/v1", router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
})

app.listen(3000, () => {
  console.log("App is listening on Port 3000");
});