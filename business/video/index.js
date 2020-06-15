const videoDal = require("../../dataaccess/video/index")
const queryParser = require('../../utils/queryparser')
const dairDal = require("../../dataaccess/dair/index")
const Video = require('../../models/video')
const { check, validationResult } = require('express-validator');
const fs = require('fs');
let videoService = {
    async update(request) {},
    async findById(videoId) {
        if (parseInt(videoId) > 0) {
            let data = await videoDal.show(videoId)
            return data
        } else {
            return []
        }
    },
    geterrors(request, response) {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
            /*       return {errors: errors.array()}*/
        }
    },
    validation(type) {
        switch (type) {
            case "delete":
                return [check('urlparse').notEmpty(), check('videoid').notEmpty(), check('urlparse').isArray(), check('urlparse').isLength({ min: 1 }), check('filename').notEmpty(), check('filename').isString(), check('dairid').notEmpty()]
        }
    },

    async deleteFromStorage(path) {
        if (fs.existsSync(path)) {
            fs.unlink(path, (err) => {
                if (err) return false;
                return true
            });
        }
        return true
    },
    async diarDeleteVideo(dairid, videoid) {
        try {
            let dair = await dairDal.show({ _id: dairid })
            if (dair != null) {
                const dairVideos = dair.videos.filter((video) => {
                    return video != videoid
                })
                const dairUpdateVideos = await dairDal.update({ _id: dairid }, { videos: dairVideos })
                return dair
            } else {
                return null
            }

        } catch (error) {
            throw new Error(error.message)
        }
    },
    async delete(request) {
        try {
            const { urlparse, dairid, filename, videoid } = request.body;
            const diarUpdate = await this.diarDeleteVideo(dairid, videoid)
            if (diarUpdate != null) {
                let where = queryParser.parseQuery(urlparse)
                const deletedVideoDisk = await this.deleteFromStorage("uploads/videos/" + filename)
                if (deletedVideoDisk) {
                    const data = await videoDal.delete(where)
                    return data
                } else {
                    throw new Error("Dosya Fiziksel Olarak Silinemedi")
                }
            }
            return null
        } catch (error) {
            throw new Error(error.message)
        }
    },
    async createDiarVideo(request, response) {
        try {
            const { dairid } = request.body
            const video = request.file;
            if (!video) {
                throw new Error("Video Yok")
            }
            const dair = await dairDal.show({ _id: dairid })
            if (dair === null) {
                throw new Error("404 Not Found")
                return
            }
            const newvideo = new Video({
                videoUri: process.env.HOST + video.destination + video.filename,
                fileName: video.originalname,
                dairId: dairid,
            });
            const data = await videoDal.create(newvideo)
            const dairvideos = dair.videos;
            const newdairvideos = [...dairvideos, newvideo._id]
            const dairUpdateVideos = await dairDal.update({ _id: dairid }, { videos: newdairvideos })
            return data;

        } catch (error) {
            throw new Error(error.message)
        }
    },

    async all(request) {
        const { urlparse } = request.body;
        let where;
        if (urlparse === undefined || urlparse === null) {
            where = {};
        } else {
            where = queryParser.parseQuery(urlparse)
        }
        const data = await videoDal.all(where)
        return data
    }
}

module.exports = videoService