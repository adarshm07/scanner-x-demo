const express = require("express");
const db = require("../db");

const router = express.Router();

// Search notes by title.
router.get("/search", (req, res) => {
  const q = req.query.q;
  // VULNERABLE (demo): user input concatenated into SQL.
  db.query("SELECT id, title FROM notes WHERE title LIKE '%" + q + "%'", (err, rows) => {
    if (err) return res.status(500).send("error");
    res.json(rows);
  });
});

// Preview a note title as HTML.
router.get("/preview", (req, res) => {
  // VULNERABLE (demo): reflected XSS.
  res.send("<h1>" + req.query.title + "</h1>");
});

module.exports = router;
