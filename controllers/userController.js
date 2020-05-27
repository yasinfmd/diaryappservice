const userService = require('../business/user/index')
const {validationResult} = require('express-validator');
exports.show = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const response = await userService.show(req)
        if (response == null) {
            return res.status(404).json([])
        } else {
            return res.status(200).json(response)
        }
    } catch (error) {
        res.status(500).json({error})
    }
}

exports.index = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const response = await userService.all(req)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({error})
    }
}

exports.store = async (req, res, next) => {

}
exports.update = async (req, res, next) => {
}

exports.destroy = async (req, res, next) => {
}

exports.getdairgroup = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const response = await userService.getgroupdair(req)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({error})
    }
}

exports.getdair = async (req, res, next) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const response = await userService.getdair(req)
        if (response._id == undefined) {
            return res.status(404).json([])
        } else {
            return res.status(200).json(response)
        }
    } catch (error) {
        return res.status(500).json({error})
    }
}
