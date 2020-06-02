const userDal = require("../../dataaccess/user/index")
const User = require('../../models/user')
const queryParser = require('../../utils/queryparser')
const md5 = require('md5')
const sendMail = require("../../utils/sendemail")
const {check, query} = require('express-validator');
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const mailJob = require('../../jobs/sendmailJob')

const registerTitle = "Kayıt İçin Teşekkürler"
const registerText = "Herkesin Bir Günlüğe İhtiyacı Vardır "

let auhtService = {
    async checkemail(request) {
        const {email} = request.body
        const data = await userDal.show({email: email})
        return data
    },
    validation(type) {
        switch (type) {
            case "register":
                return [check("name").isString(), check('email').isString(), check('surname').isString(), check('email').isEmail(), check('password').isString(), check('password').isLength({min: 8}), check('name').isLength({min: 3}), check('surname').isLength({min: 2})]
            case "login":
                return [check('email').isString(), check('email').isEmail(), check('password').isString(), check('password').isLength({min: 8})]
            case "forgotpassword":
                return [check('email').isString(), check('email').isEmail()]
            case "newpassword":
                return [check('password').isString(), check('password').isLength({min: 8}), check('userid').isString()]
            case "checktoken":
                return [query("token").isString()]
        }
    },
    async register(request) {
        const {name, surname, email, password} = request.body
        const user = new User({
            image: process.env.DEFAULT_IMAGE,
            name: name,
            surname: surname,
            fullname: name + " " + surname,
            email: email,
            password: md5(password),
            diaries: []
        });
        mailJob([{to: email,  text: registerText, title: registerTitle}])
        const data = await userDal.create(user)
        return data
    },

    async login(request, response) {
        const {email, password} = request.body;
        const user = await userDal.show({email: email, password: md5(password)}, "email fullname image")
        if (user !== null) {
            const token = jwt.sign({
                    userid: user._id,
                    email: user.email,
                },
                process.env.SECRET,
                {
                    issuer: "localhost",
                    expiresIn: "2h"
                }
            )
            return {
                user,
                token
            }
        } else {
            return []
        }
    },
    async checkpasswordtoken(request) {
        const {token} = request.params
        const user = await userDal.show({resetToken: token, resetTokenExpiration: {$gt: Date.now()}}, "email")
        if (user === null) return []
        return user;
    },
    passwordreset: async function (request) {
        const {email} = request.body;
        let token
        await crypto.randomBytes(32, async (err, buffer) => {
            if (err) {
                console.error(err)
            }
            token = buffer.toString("hex")
            return token;
        })
        const user = await userDal.show({email: email}, "email")
        if (user === null) {
            return []
        }
        const updatedUserToken = await userDal.update({email: email}, {
            resetToken: token,
            resetTokenExpiration: Date.now() + 3600000
        })
        if (updatedUserToken.n && updatedUserToken.n > 0) {


            sendMail(email, "Parola  Sıfırlama", "", `
                <p>Parola Sıfırlama İsteğiniz </p>
                <p>Buraya <a href="http://localhost:3001/resetpassword/${token}"> Tıklayarak </a>  Parolanızı Sıfırlayın</p>
                `)
        }
        return updatedUserToken
    },

    async updatepassword(request) {
        const {userid, password} = request.body
        const updatedPassword = await userDal.update({_id: userid}, {password: md5(password)})
        if (updatedPassword.n && updatedPassword.n > 0) {
            return updatedPassword
        }
        return []
    }
}

module.exports = auhtService
