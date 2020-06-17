const dairDal = require("../../dataaccess/dair/index")
const queryParser = require('../../utils/queryparser')
const Dair = require('../../models/dair')
const {check, param, validationResult} = require('express-validator');
const userDal = require('../../dataaccess/user/index')
const imageDal = require('../../dataaccess/image/index')
const videoDal = require('../../dataaccess/video/index')
const imageService = require('../../business/image/index')
const io = require('../../socket')
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

    async destroy(request) {
        try {
            const {urlparse} = request.body
            let where = queryParser.parseQuery(urlparse)
            const populate = [{path: 'images videos'}]
            const diary = await dairDal.show(where, "", populate);
            let deletedAllFile = false
            if (diary !== null) {
                if (diary.images.length > 0) {
                    for (const image of diary.images) {
                        const deletedImageDisk = await imageService.deleteFromStorage("uploads/images/" + image.fileName)
                        if (deletedImageDisk) {
                            deletedAllFile = true
                        } else {
                            throw new Error("Dosya Fiziksel Olarak Silinemedi")
                        }
                    }
                    if (deletedAllFile) {
                        const deletedImages = await imageDal.delete({dairId: diary._id})
                    }
                }
                if (diary.videos.length > 0) {
                    const deletedVideoFromDisk = await imageService.deleteFromStorage("uploads/videos/" + diary.videos[0].videoUri.split('uploads/videos/')[1])
                    if (!deletedVideoFromDisk) {
                        throw new Error("Video Fiziksel Olarak Silinemedi")
                    } else {
                        const deletedVideos = await videoDal.delete({dairId: diary._id})
                    }
                }
                const findUserDiar = await userDal.show({diaries: diary._id})
                if (findUserDiar != null) {
                    let userDiars = findUserDiar.diaries.filter((diar) => {
                        return diar.toString() !== diary._id.toString()
                    })
                    const dairUpdateImages = await userDal.update({_id: findUserDiar._id}, {diaries: userDiars})

                }
                const deletedDair = await dairDal.delete(where)
                return {msg: "Success"}
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
                    check('title').isLength({min: 3}), check('content').isLength({min: 3})
                ]
            case "show":
                return [param('dairId').isString()]
            case "destroy":
                return [check('urlparse').notEmpty(), check('urlparse').isArray()]
            case "update":
                return [check('urlparse').notEmpty(), check('userid').notEmpty(), check('title').notEmpty(), check('title').isString(),
                    check('title').isLength({min: 3}),
                    check('content').isString(),
                    check('content').notEmpty(),
                    check('content').isLength({min: 3}),
                    check('urlparse').isArray(), check('urlparse').isLength({min: 1})
                ]

        }
    },
    async checktoday(userid) {
        /*{dairdateString: new Date().toLocaleDateString()}*/
        const data = await userDal.show({_id: userid}, "", {
            path: 'diaries',
            match: {dairdateString: new Date().toLocaleDateString()},
        })
        return data.diaries
    },
    async create(request) {
        try {
            const {userid, title, content} = request.body
            const todayExist = await this.checktoday(userid)
            if (todayExist.length < 1) {
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
                const user = await userDal.show({_id: userid}, "email fullname image diaries")
                const updateddiar = [...user.diaries, data._id]
                const userpushdiar = await userDal.update({_id: user._id}, {diaries: updateddiar})
                let socketpayload = {
                    title: data.title,
                    dairdate: data.dairdate,
                    diarid: data._id,
                    userId: {
                        fullname: user.fullname,
                        image: user.image,
                        email: user.email,

                    }
                }
                io.getIO().emit("diars", {action: "CREATE", payload: socketpayload})
                return data
            } else {
                return []
            }
        } catch (error) {
            throw new Error(error.message)
        }

    },
    async update(request) {
        try {
            const {urlparse, userid, title, content} = request.body
            let where = queryParser.parseQuery(urlparse)
            let dair = await dairDal.show(where, "")
            if (dair != null) {
                const data = await dairDal.update(where, {title: title, content: content, userId: userid})
                return data
            }
            return null

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
