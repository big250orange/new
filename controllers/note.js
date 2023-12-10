const db = require("../db.js");
const session = require("express-session");

const add = (req, res) => {
  // kung may extra fields add alng kayo dito
  // const { note, body } = req.body;
  const { note } = req.body;

  if (!note) {
    req.session.message = "Note is required";
    return res.redirect("/");
  }

  // Same sa sql, wag kalimutan yung "?"
  // const sql = "INSERT INTO notes (note, body) VALUES (?, ?)";
  const sql = "INSERT INTO notes (note) VALUES (?)";

  // Ganun din dito
  // db.query(sql, [note, body], (err, result) => {
  db.query(sql, [note], (err, result) => {
    if (err) throw err;
    res.redirect("/");
  });
};

const edit = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM notes WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) throw err;

    if (result.length === 0) {
      req.session.message = "Note not found";
      return res.redirect("/");
    }

    res.render("edit", { note: result[0] });
  });
};

const update = (req, res) => {
  const { id } = req.params;
  const { note } = req.body;
  const sql = "UPDATE notes SET note = ? WHERE id = ?";
  db.query(sql, [note, id], (err, result) => {
    if (err) throw err;
    res.redirect("/");
  });
};

const destroy = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM notes WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.redirect("/");
  });
};

module.exports = {
  add,
  edit,
  update,
  destroy,
};
