const userDal = require("../../dataaccess/user/index")
const queryParser = require('../../utils/queryparser')
const {check, param} = require('express-validator');
const mongoose = require('mongoose')
const Diar = require('../../models/dair')
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
    validation(type) {
        switch (type) {
            case "register":
                return [check("name").isString(),
                    check('name').notEmpty(),
                    check('email').notEmpty(),
                    check('email').isString(),
                    check('surname').isString(),
                    check('surname').isEmpty(),
                    check('email').isEmail(), check('password').isString(),
                    check('password').notEmpty(),
                    check('password').isLength({min: 8}), check('name').isLength({min: 3}), check('surname').isLength({min: 2})]
            case "show":
                return [param('userId').isString(), param('userId').notEmpty()]
            case "delete":
                return [check('urlparse').isArray(), check('urlparse').notEmpty()]
            /*     case "updateimg":
                     return [check('userid').isString()]*/
            case "dairgroup":
                return [check('userId').isString(), check('userId').notEmpty()]
        }
    },
    async updateImage(request, response) {
        const {userid} = request.body
        const image = request.file;
        const user = await userDal.show({_id: userid}, "")
        if (user === null) {
            return response.status(404).json([])
        }
        const updatedUserImage = await userDal.update({_id: userid}, {
            image: "http://localhost:3000/" + image.destination + image.filename,
        })
        if (updatedUserImage.n && updatedUserImage.n > 0) {
            return {image: "http://localhost:3000/" + image.destination + image.filename}
        }
    },
    async delete(request) {
        const {urlparse} = request.body
        const where = queryParser.parseQuery(urlparse)
        const deleted = userDal.delete(where)
        return deleted
    },
    async getgroupdair(request) {
        const {userId} = request.body
        const data = await Diar.aggregate([
            {"$unwind": {"path": "$userId"}},
            {"$match": {userId: mongoose.Types.ObjectId(userId)}},
            {
                "$lookup": {
                    "from": "user",
                    "localField": "userId",
                    "foreignField": "_id",
                    "as": "userId"
                }
            },
            {
                "$group": {
                    "_id": {
                        month: {$month: "$dairdate"},
                        year: {$year: "$dairdate"}
                    },
                    count: {$sum: 1}
                },
            },
        ]);
        return data
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
            const data = await userDal.all(where, fields ? fields : "", populate)
            return data
        } catch (e) {
            console.log(e)
        }

    }
}

module.exports = userService
