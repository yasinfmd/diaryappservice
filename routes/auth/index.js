const express = require('express')
const router = express.Router();
const authController = require('../../controllers/authController')
router.post("/signin", authController.login);
router.post("/signup", authController.register);
router.post("/forgotpassword", authController.forgotpassword);
router.get("/checktoken/:token", authController.passwordtokenvalidate)
router.post("/updatepassword",authController.updatepassword)
module.exports = router;
