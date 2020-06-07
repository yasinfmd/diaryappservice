const videoDal = require("../../dataaccess/video/index")
const queryParser = require('../../utils/queryparser')
const dairDal = require("../../dataaccess/dair/index")
const Video = require('../../models/video')
const fs = require('fs');
let videoService = {
    async update(request) {
    },
    async findById(videoId) {
        if (parseInt(videoId) > 0) {
            let data = await videoDal.show(videoId)
            return data
        } else {
            return []
        }
    },
    validation(type) {
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
    async delete(request) {

        const {urlparse} = request.body;
        let where = queryParser.parseQuery(urlparse)
        const data = await videoDal.delete(where)
        return data
    },
    async createDiarVideo(request, response) {
        try {
            const {dairid} = request.body
            const video = request.file;
            if (!video) {
                throw new Error("Video Yok")
            }
            const dair = await dairDal.show({_id: dairid})
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
            const dairUpdateVideos = await dairDal.update({_id: dairid}, {videos: newdairvideos})
            return data;

        } catch (error) {
            throw new Error(error.message)
        }
    },

    async all(request) {
        const {urlparse} = request.body;
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
