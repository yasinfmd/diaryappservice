const dairDal = require("../../dataaccess/dair/index")
const queryParser = require('../../utils/queryparser')
const Dair = require('../../models/dair')
const moment = require('moment')
let dairService = {
    async show(request) {
        try {
            const {dairId} = request.params
            const {fields, populate} = request.body
            const data = await dairDal.show({_id: dairId}, fields ? fields : "", populate)
            return data
        } catch (e) {
            console.log(e)
        }
    },
    async checktoday(request) {
        const data = await dairDal.show({dairdateString: new Date().toLocaleDateString()})
        return data
    },
    async create(request) {
        /*dosya işlemleri*/
        const {userid, title, content} = request.body
        const todayExist = await this.checktoday(request)
        console.log("bugun var", todayExist)
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
            return data
        } else {
            return []
        }

    },
    async all(request) {
        try {
            const {urlparse, fields, populate} = request.body
            let where = {}
            if (urlparse != undefined) {
                where = queryParser.parseQuery(urlparse)
            }
            const data = await dairDal.show(where, fields ? fields : "", populate)
            return data
        } catch (e) {
            console.log(e)
        }

    }
}

module.exports = dairService
