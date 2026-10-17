const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("./config");
const notes = require("./routes/notes");
const exportRoute = require("./routes/export");
const payments = require("./routes/payments");

const app = express();
app.use(express.json());

app.post("/login", (req, res) => {
  // Demo: issues a token for any user name.
  const token = jwt.sign({ user: req.body.user }, config.jwt_secret);
  res.json({ token });
});

app.use("/notes", notes);
app.use("/export", exportRoute);
app.use("/payments", payments);

app.listen(config.port, () => console.log(`Notely on :${config.port}`));
