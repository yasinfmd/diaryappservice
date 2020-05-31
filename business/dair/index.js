const dairDal = require("../../dataaccess/dair/index")
const queryParser = require('../../utils/queryparser')
const Dair = require('../../models/dair')
const {check, query} = require('express-validator');
const userDal = require('../../dataaccess/user/index')
let dairService = {
    async show(request) {
        try {
            const {dairId} = request.params
            const {fields, populate} = request.body
            const data = await dairDal.show({_id: dairId}, fields ? fields : "", populate)
            return data
        } catch (error) {
            throw new Error(error.message)
        }
    },
    async checktoday() {
        const data = await dairDal.show({dairdateString: new Date().toLocaleDateString()})
        return data
    },
    validation(type) {
        switch (type) {
            case "create":
                return [
                    check("userid").isString(), check('title').isString(),
                    check('content').isString(),
                    check('title').isLength({min: 3}), check('content').isLength({min: 3})]
            case "show":
                return [query('dairId').isString()]

        }
    },
    async create(request) {
        /*dosya işlemleri*/

        try {
            const {userid, title, content} = request.body
            const todayExist = await this.checktoday()
            if (todayExist === null) {
                const dair = new Dair({
                    userId: userid,
                    dairdate: new Date(),
                    dairdateString: new Date().toLocaleDateString(),
                    title: title,
                    content: content,
                    images: [],
                    videos: []
                });
                const data = await dairDal.create(dair)
                /*    console.log("yeni data", data)*/
                const user = await userDal.show({_id: userid})
                /*   console.log("kullanıcım", user)*/
                const updateddiar = [...user.diaries, data._id]

                const userpushdiar = await userDal.update({_id: user._id}, {diaries: updateddiar})
                /*        console.log("yeni",userpushdiar)*/
                return data
            } else {
                return []
            }
        } catch (error) {
            throw new Error(error.message)
        }

    },
    async all(request) {
        try {
            const {urlparse, fields, populate} = request.body
            let where = {}
            if (urlparse != undefined) {
                where = queryParser.parseQuery(urlparse)
            }
            const data = await dairDal.all(where, fields ? fields : "", populate)
            return data
        } catch (error) {
            throw new Error(error.message)
        }

    }
}

module.exports = dairService
