const dairService = require('../business/dair/index')
const {validationResult} = require('express-validator');

exports.show = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const response = await dairService.show(req)
        return res.status(200).json(response)
    } catch (error) {
      return   res.status(500).json({error: error})
    }
}

exports.index = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const response = await dairService.all(req)
        return   res.status(200).json(response)
    } catch (error) {
        return  res.status(500).json({error: error})
    }
}

exports.store = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const response = await dairService.create(req)
        if (response.length < 1) {
            return  res.status(204).json();
        } else {
            return res.status(200).json(response)
        }
    } catch (error) {
        return res.status(500).json({error: error})
    }

}
exports.update = async (req, res, next) => {
}

exports.destroy = async (req, res, next) => {
}
