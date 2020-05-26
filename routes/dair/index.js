const express = require('express')
const router = express.Router();
const dairController = require('../../controllers/dairController')
const dairService = require('../../business/dair/index')
router.post("/", dairController.index);
router.post("/create", [...dairService.validation("create")], dairController.store);
router.get("/:dairId", [...dairService.validation("show")], dairController.show);
router.post("/update", dairController.update);
router.post("/delete", dairController.destroy);
module.exports = router;
