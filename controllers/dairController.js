const dairService = require('../business/dair/index')

exports.show = async (req, res, next) => {
    try {
        dairService.geterrors(req, res)
        const response = await dairService.show(req)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

exports.index = async (req, res, next) => {
    try {
        dairService.geterrors(req, res)
        const response = await dairService.all(req)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({error: error.message})

    }
}

exports.store = async (req, res, next) => {
    try {
        dairService.geterrors(req, res)
        const response = await dairService.create(req)
        if (response.length < 1) {
            return res.status(204).json();
        } else {
            return res.status(200).json(response)
        }
    } catch (error) {
        return res.status(500).json({error: error.message})

    }

}
exports.update = async (req, res, next) => {
}

exports.destroy = async (req, res, next) => {
    try {
        dairService.geterrors(req, res)
        const response = await dairService.destroy(req)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}
