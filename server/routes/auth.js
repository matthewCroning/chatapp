const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Auth = require("../controllers/auth");

router.post("/signup", Auth.signup);
router.post("/signin", Auth.signin);

// router.post("/signin", Auth.signin);


// router.get("/test", Auth.authMiddleware, function(req, res) {
//   res.json({ok: "ok"});
// });

module.exports = router;