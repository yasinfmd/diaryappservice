const multer = require('multer')
const maxSize = 2 * 1024 * 1024;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/images/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix+ "-"+file.originalname)
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true)
    } else {
        return cb(new Error('Dosya Türü Desteklenmiyor'), false);
    }
}
const upload = multer({storage: storage, fileFilter: fileFilter, limits: {fileSize: maxSize},})
module.exports = upload
