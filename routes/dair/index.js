const express = require('express')
const router = express.Router();
const dairController = require('../../controllers/dairController')
const dairService = require('../../business/dair/index')
const checkToken = require('../../middleware/auth')
router.post("/",  dairController.index);
router.post("/update", checkToken, [...dairService.validation('update')], dairController.update);
router.post("/delete",  [...dairService.validation('destroy')], dairController.destroy);
router.post("/create", checkToken, [...dairService.validation("create")], dairController.store);
router.post("/:dairId",checkToken, [...dairService.validation("show")], dairController.show);

module.exports = router;
