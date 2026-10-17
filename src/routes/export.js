const express = require("express");
const { exec } = require("child_process");

const router = express.Router();

// Export a note to PDF with an external tool.
router.post("/pdf", (req, res) => {
  // VULNERABLE (demo): user-controlled file name in a shell command.
  exec("wkhtmltopdf /tmp/notes/" + req.body.name + ".html /tmp/out.pdf", (err) => {
    if (err) return res.status(500).send("export failed");
    res.download("/tmp/out.pdf");
  });
});

module.exports = router;
