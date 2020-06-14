const express = require('express')
const router = express.Router();
const imageController = require('../../controllers/imageController')
const imageService = require('../../business/image/index')
const checkToken = require('../../middleware/auth')
router.post("/", checkToken, imageController.index);
router.post("/create", imageController.store);
router.get("/:imageId", imageController.show);
router.post("/update", imageController.update);
router.post("/delete",checkToken, [...imageService.validation('delete')], imageController.destroy);
module.exports = router;
