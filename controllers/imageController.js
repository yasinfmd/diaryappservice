const imageService = require('../business/image/index')

exports.show = async (req, res, next) => {
    try {
        const {imageId} = req.params;
        const image = await imageService.findById(imageId);
        if (image !== null) {
            res.status(200).json(image)
        } else {
            res.status(404).json([])
        }
    } catch (error) {
        res.status(500).json({err: error})
    }
}

exports.index = async (req, res, next) => {

    try {

        let images = await imageService.all(req)
        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({err: error})
    }
}

exports.store = async (req, res, next) => {

}
exports.update = async (req, res, next) => {
}

exports.destroy = async (req, res, next) => {
}
