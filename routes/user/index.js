const express = require('express')
const router = express.Router();
const userController = require('../../controllers/userController')
const userService = require('../../business/user/index')
const checkToken = require('../../middleware/auth')
router.post("/dairgroup", checkToken, [...userService.validation("dairgroup")], userController.getdairgroup)
router.post("/",  userController.index);
router.post("/:userId", [checkToken], [...userService.validation("show")], userController.show);
router.post("/update", [checkToken], userController.update);
router.post("/delete", [checkToken], userController.destroy);
router.post("/:userId/dair", [checkToken], userController.getdair)
module.exports = router;
/* [...userService.validation("getdair")]*/
