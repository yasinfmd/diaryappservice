const express = require('express')
const router = express.Router();
const videoController = require('../../controllers/videoController')
router.post("/", videoController.index);
router.post("/create", videoController.store);
router.get("/:videoId", videoController.show);
router.post("/update", videoController.update);
router.post("/delete", videoController.destroy);
module.exports = router;
