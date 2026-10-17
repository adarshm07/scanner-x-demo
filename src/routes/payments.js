const express = require("express");
const { exec } = require("child_process");
const db = require("../db");

// Demo: randomly generated, not a real key.
const billing_api_key = "jY9j90xLWUW53m9uAwpMF0SPtjW6petA";

const router = express.Router();

// List a customer's invoices.
router.get("/invoices", (req, res) => {
  db.query("SELECT * FROM invoices WHERE customer_id = " + req.query.customer, (err, rows) => {
    if (err) return res.status(500).send("error");
    res.json(rows);
  });
});

// Charge a card through the billing provider.
router.post("/charge", async (req, res) => {
  const response = await fetch("https://billing.example.invalid/v1/charges", {
    method: "POST",
    headers: { Authorization: `Bearer ${billing_api_key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ amount: req.body.amount, customer: req.body.customer }),
  });
  res.status(response.status).json(await response.json());
});

// Download an invoice as PDF.
router.get("/invoices/:id/pdf", (req, res) => {
  exec("wkhtmltopdf /tmp/invoices/" + req.params.id + ".html /tmp/invoice.pdf", (err) => {
    if (err) return res.status(500).send("render failed");
    res.download("/tmp/invoice.pdf");
  });
});

module.exports = router;
