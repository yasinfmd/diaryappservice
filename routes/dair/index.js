const express = require('express')
const router = express.Router();
const dairController = require('../../controllers/dairController')
router.post("/", dairController.index);
router.post("/create", dairController.store);
router.get("/:dairId", dairController.show);
router.post("/update", dairController.update);
router.post("/delete", dairController.destroy);
module.exports = router;
