// Demo only: these values are randomly generated and not real credentials.
// They're here so the secret scanner has something to catch.
module.exports = {
  port: process.env.PORT || 3000,
  db: {
    host: process.env.DB_HOST || "localhost",
    user: "notely",
    database: "notely",
  },
  payments_api_key: "znVeuF42TbRgZXI0FuBrDS6FQo975T8c",
  jwt_secret: "mn07CRRbV9fAj4GFEIedumGxIu4bJtZoHdWWa3wl",
};
