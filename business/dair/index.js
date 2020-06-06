const dairDal = require("../../dataaccess/dair/index")
const queryParser = require('../../utils/queryparser')
const Dair = require('../../models/dair')
const {check, param, validationResult} = require('express-validator');
const userDal = require('../../dataaccess/user/index')
const imageDal = require('../../dataaccess/image/index')
const imageService = require('../../business/image/index')
let dairService = {
    async show(request) {
        try {
            const {dairId} = request.params
            const {fields, populate, userid} = request.body
            let where;
            if (userid) {
                where = {_id: dairId, userId: userid}
            } else {
                where = {_id: dairId}
            }
            const data = await dairDal.show(where, fields ? fields : "", populate)

            return data
        } catch (error) {
            throw new Error(error.message)
        }
    },
    async checktoday() {
        const data = await dairDal.show({dairdateString: new Date().toLocaleDateString()})
        return data
    },
    async destroy(request) {
        try {
            console.log("bu fonksiyon")
            const {urlparse} = request.body
            let where = queryParser.parseQuery(urlparse)
            const populate = [{path: 'images'}]
            const diary = await dairDal.show(where, "", populate);
            let deletedAllFile = false
            if (diary !== null) {
                if (diary.images.length > 0) {
                    for (const image of diary.images) {
                        const deletedImageDisk = await imageService.deleteFromStorage("uploads/images/" + image.fileName)
                        if (deletedImageDisk) {
                            deletedAllFile = true
                        } else {
                            throw  new Error("Dosya Fiziksel Olarak Silinemedi")
                        }
                    }
                    if (deletedAllFile) {
                        const deletedImages = await imageDal.delete({dairId: diary._id})
                        const deletedDair = await dairDal.delete(where)
                        return {msg: "Success"}
                    }
                } else {
                    console.log("burda ve şart", where)
                    const deletedDair = await dairDal.delete(where)
                    return {msg: "Success"}
                }
            } else {
                throw new Error("Günlük Bulunamadı")
            }
        } catch (error) {
            throw new Error(error.message)
        }
    },
    geterrors(request, response) {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({errors: errors.array()});
            /*       return {errors: errors.array()}*/
        }
    },
    validation(type) {
        switch (type) {
            case "create":
                return [
                    check("userid").isString(), check('title').isString(),
                    check('content').isString(),
                    check('title').isLength({min: 3}), check('content').isLength({min: 3})]
            case "show":
                return [param('dairId').isString()]
            case "destroy":
                return [check('urlparse').notEmpty(), check('urlparse').isArray()]

        }
    },
    async create(request) {
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
                const user = await userDal.show({_id: userid})
                const updateddiar = [...user.diaries, data._id]
                const userpushdiar = await userDal.update({_id: user._id}, {diaries: updateddiar})
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
