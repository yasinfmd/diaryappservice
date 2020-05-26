const AuthService = require('../business/auth/index')
const {validationResult} = require('express-validator');
exports.register = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const emailExist = await AuthService.checkemail(req);
        if (emailExist !== null) {
          return  res.status(204).json({'msg': 'Email Exist'});
        } else {
            const userRegister = await AuthService.register(req, res);
            return  res.status(200).json({msg: "Register Successful"})
        }
    } catch (error) {
        return   res.status(500).json({error: error})
    }
}
exports.login = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const result = await AuthService.login(req);
        if (result.length < 1) {
            res.status(204).json({msg: "Email Or Password Incorrect"})
        } else {
            res.status(200).json(result)
        }
    } catch (error) {
        res.status(500).json({error: error})
    }
}

exports.passwordtokenvalidate = async (req, res, next) => {
    try {
        const response = await AuthService.checkpasswordtoken(req)
        if (response.length < 1) {
            return  res.send(404).json();
        } else {
            return  res.status(200).json(response)
        }
    } catch (error) {
        return res.status(500).json({error: error})

    }
}

exports.forgotpassword = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const response = await AuthService.passwordreset(req)
        if (response.length < 1) {
            return   res.status(404).json()
        } else if (response.n && response.n > 0) {
            return   res.status(200).json({msg: "Success"})
        } else {
            return  res.status(500)
        }
    } catch (error) {
        return  res.status(500).json({error: error})
    }
}

exports.updatepassword = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const response = await AuthService.updatepassword(req)
        if (response.length < 1) {
            return   res.status(404).json()
        } else if (response.n && response.n > 0) {
            return   res.status(200).json({msg: "Success"})
        } else {
            return   res.status(500)
        }
    } catch (error) {
        return  res.status(500).json({error: error})
    }
}
