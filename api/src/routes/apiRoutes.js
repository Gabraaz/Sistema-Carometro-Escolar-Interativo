const router = require("express").Router();

router.get("/health", (req, res) => {
  res.send({ status: "OK", message: "API funcionando" });
});

module.exports = router;