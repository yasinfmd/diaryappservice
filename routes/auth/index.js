const express = require('express')
const router = express.Router();
const authController = require('../../controllers/authController')
router.post("/signin", authController.login);
router.post("/signup", authController.register);
router.post("/forgotpassword", authController.forgotpassword );

module.exports = router;
