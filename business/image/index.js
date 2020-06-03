const imageDal = require("../../dataaccess/image/index")
const queryParser = require('../../utils/queryparser')
const multipleFileUpload = require('../../middleware/multipleimageuploads')
const dairDal = require("../../dataaccess/dair/index")
const fs = require('fs');
let imageService = {
    async update(request) {
    },
    async findById(imageId) {
        if (parseInt(imageId) > 0) {
            let data = await imageDal.show(imageId)
            return data
        } else {
            return []
        }
    },
    validation(type) {
    },
    uploadFileFromStorage(req, res, bodyData) {
        try {
            return new Promise(((resolve, reject) => {
                multipleFileUpload(req, res, function (error) {
                    if (error) {
                        reject(error)
                    } else {
                        resolve({file: req.files, body: bodyData ? req.body[bodyData] : null})
                    }
                })
            }))
        } catch (error) {
            throw new Error(error.message)
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
    async delete(request) {

        const {urlparse} = request.body;
        let where = queryParser.parseQuery(urlparse)
        const data = await imageDal.delete(where)
        return data
    },
    async createDiarImage(request, response) {
        try {
            console.log("2.olarak bende")
            const result = await this.uploadFileFromStorage(request, response, "diarId")

            let imgList = []
            if (result.file) {

                result.file.forEach((image) => {
                    imgList.push({
                        dairId: result.body,
                        imageUri: process.env.HOST + image.destination + image.filename,
                        fileName: image.filename
                    })
                })
                const data = await imageDal.create(imgList)
                const dair = await dairDal.show({_id: result.body})
                const dairImages = dair.images
                data.forEach((imageItem) => {
                    dairImages.push(imageItem._id)
                })
                const dairUpdateImages = await dairDal.update({_id:result.body}, {images: dairImages})
                return data
            } else {
                return []
            }

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
        const data = await imageDal.all(where)
        return data
    }
}

module.exports = imageService
