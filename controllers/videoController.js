const videoService=require('../business/video/index')
exports.show = async (req, res, next) => {
}

exports.index = async (req, res, next) => {
}

exports.store = async (req, res, next) => {
    try {
        const response = await videoService.createDiarVideo(req)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
exports.update = async (req, res, next) => {
}

exports.destroy = async (req, res, next) => {
}
