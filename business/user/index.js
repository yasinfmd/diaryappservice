const userDal = require("../../dataaccess/user/index")
const queryParser = require('../../utils/queryparser')
let userService = {
    async show(request) {
        try {
            const {userId} = request.params
            const {fields, populate} = request.body
            const data = await userDal.show({_id: userId}, fields ? fields : "", populate)
            return data
        } catch (e) {
            console.log(e)
        }
    },
    async getdair(request) {

        const {userId} = request.params
        const {fields, dairfields, urlparse} = request.body
        let where = {}
        if (urlparse != undefined) {
            where = queryParser.parseQuery(urlparse)
        }
        if (userId != null) {
            const populate = [{
                path: 'diaries',
                select: dairfields ? dairfields : "",
                match: where,
                populate: [
                    {
                        path: "images"
                    },
                    {
                        path: "videos"
                    }
                ],
            }]
            const user = await userDal.show({_id: userId}, fields ? fields : "", populate)
            if (user == null) {
                return {}
            } else {
                return user;
            }
        } else {
            return {}
        }
    },
    async all(request) {
        try {
            const {urlparse, fields, populate} = request.body
            let where = {}
            if (urlparse != undefined) {
                where = queryParser.parseQuery(urlparse)
            }
            const data = await userDal.show(where, fields ? fields : "", populate)
            return data
        } catch (e) {
            console.log(e)
        }

    }
}

module.exports = userService
