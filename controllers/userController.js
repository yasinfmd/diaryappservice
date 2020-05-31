const userService = require('../business/user/index')
const {validationResult} = require('express-validator');
exports.show = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const response = await userService.show(req, res)
        if (response == null) {
            return res.status(404).json([])
        } else {
            return res.status(200).json(response)
        }
    } catch (error) {
        return res.status(500).json({error: error.message})

    }
}

exports.index = async (req, res, next) => {
    try {
        const response = await userService.all(req, res)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}


exports.update = async (req, res, next) => {
    try {
        const response = await userService.update(req, res)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({error: error.message})

    }
}

exports.updateImage = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const response = await userService.updateImage(req, res)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

exports.destroy = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const response = await userService.delete(req, res)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({error: error.message})

    }
}

exports.getdairgroup = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const response = await userService.getgroupdair(req, res)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({error: error.message})

    }
}

exports.getdair = async (req, res, next) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const response = await userService.getdair(req, res)
        if (response._id == undefined) {
            return res.status(404).json([])
        } else {
            return res.status(200).json(response)
        }
    } catch (error) {
        return res.status(500).json({error: error.message})

    }
}
