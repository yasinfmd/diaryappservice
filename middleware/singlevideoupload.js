const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/videos/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + "-" + file.originalname)
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype == "video/mp4" || file.mimetype == "application/mp4" || file.mimetype=="video/quicktime") {
        cb(null, true)
    } else {
        return cb(new Error('Dosya Türü Desteklenmiyor'), false);
    }
}
const upload = multer({storage: storage, fileFilter: fileFilter})
module.exports = upload
