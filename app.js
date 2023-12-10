const express = require("express");
const app = express();
const database = require("./db");
const session = require("express-session");

const router = require("./routes/web");

const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/", router);

app.use((req, res, next) => {
  res.locals.message = req.session.message;
  next();
});

database.connect((err) => {
  if (err) throw err;
  console.log("Connected to database");
});

database.addListener("error", (err) => {
  if (err) throw err;
});

app.get("/", (req, res) => {
  const sql = "SELECT * FROM notes";

  database.query(sql, (err, result) => {
    if (err) throw err;
    res.render("index", { notes: result });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
