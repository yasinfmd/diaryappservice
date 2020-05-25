const AuthService = require('../business/auth/index')
exports.register = async (req, res, next) => {
    try {
        const emailExist = await AuthService.checkemail(req);
        console.log("iş katmandan gelen", emailExist)
        if (emailExist !== null) {
            res.status(204).json({'msg': 'Email Exist'});
        } else {
            const userRegister = await AuthService.register(req, res);
            res.status(200).json({msg: "Register Successful"})
        }
    } catch (error) {
        res.status(500).json({error: error})
    }
}
exports.login = async (req, res, next) => {
    try {
        const result = await AuthService.login(req);
        console.log("result", result)
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
            res.send(404).json();
        } else {
            res.status(200).json(response)
        }
    } catch (error) {
        res.status(500).json({error: error})

    }
}

exports.forgotpassword = async (req, res, next) => {
    try {
        const response = await AuthService.passwordreset(req)
        if (response.length < 1) {
            res.status(404).json()
        } else if (response.n && response.n > 0) {
            res.status(200).json({msg: "Success"})
        } else {
            res.status(500)
        }
    } catch (error) {
        res.status(500).json({error: error})
    }
}

exports.updatepassword = async (req, res, next) => {
    try {
        const response = await AuthService.updatepassword(req)
        if (response.length < 1) {
            res.status(404).json()
        } else if (response.n && response.n > 0) {
            res.status(200).json({msg: "Success"})
        } else {
            res.status(500)
        }
    } catch (error) {
        res.status(500).json({error: error})
    }
}
