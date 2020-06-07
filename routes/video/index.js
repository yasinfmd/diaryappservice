const express = require('express')
const router = express.Router();
const videoController = require('../../controllers/videoController')
const checkToken = require('../../middleware/auth')
const upload = require('../../middleware/singlevideoupload')
router.post("/", videoController.index);
router.post("/create",checkToken,upload.single('file'), videoController.store);
router.get("/:videoId", videoController.show);
router.post("/update", videoController.update);
router.post("/delete", videoController.destroy);
module.exports = router;
