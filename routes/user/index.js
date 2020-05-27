const express = require('express')
const router = express.Router();
const userController = require('../../controllers/userController')
const userService = require('../../business/user/index')
router.post("/", userController.index);
router.post("/create", userController.store);
router.post("/:userId", [...userService.validation("show")], userController.show);
router.post("/update", userController.update);
router.post("/delete", userController.destroy);
router.post("/:userId/dair", userController.getdair)
module.exports = router;
/* [...userService.validation("getdair")]*/
