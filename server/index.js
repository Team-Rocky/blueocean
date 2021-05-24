const express = require("express");
const app = express();
const helpers = require("./controllers/helpers");

app.use(express.json());
app.use(express.static(__dirname + "/../client/public"));

let port = 7625;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
