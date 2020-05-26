const dairService = require('../business/dair/index')

exports.show = async (req, res, next) => {
}

exports.index = async (req, res, next) => {
    try {
        const response = await dairService.all(req)
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({error: error})
    }
}

exports.store = async (req, res, next) => {
    try {
        const response = await dairService.create(req)
        if (response.length < 1) {
            res.status(204).json();
        } else {
            res.status(200).json(response)
        }
    } catch (error) {
        res.status(500).json({error: error})
    }

}
exports.update = async (req, res, next) => {
}

exports.destroy = async (req, res, next) => {
}
