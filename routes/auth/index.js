const express = require('express')
const router = express.Router();
const authController = require('../../controllers/authController')
const authService = require('../../business/auth/index')
router.post("/signin", [...authService.validation('login')], authController.login);
router.post("/signup", [...authService.validation("register")], authController.register);
router.post("/forgotpassword",[...authService.validation('forgotpassword')], authController.forgotpassword);
router.get("/checktoken/:token", authController.passwordtokenvalidate)
router.post("/updatepassword",[...authService.validation('newpassword')], authController.updatepassword)
module.exports = router;
