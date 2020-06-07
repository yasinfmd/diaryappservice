const Video = require('../../models/video')
let VideoDataAccess = {
    async delete(where) {
        const videos = await Video.deleteMany(where)
        return videos
    },
    async update(techModel, where) {
    },
    async show(videoId) {
        const videos = await Video.findById(videoId)
        return videos
    },
    async create(videoModel) {
        const videos = await videoModel.save();
        return videos;
    },
    async all(where) {
        const videos = await Video.find(where)
        return videos
    }
}

module.exports = VideoDataAccess;
