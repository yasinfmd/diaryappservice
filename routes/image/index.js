const express = require('express')
const router = express.Router();
const imageController = require('../../controllers/imageController')
router.post("/", imageController.index);
router.post("/create", imageController.store);
router.get("/:imageId", imageController.show);
router.post("/update", imageController.update);
router.post("/delete", imageController.destroy);
module.exports = router;
