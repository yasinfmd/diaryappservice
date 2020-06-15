const imageDal = require("../../dataaccess/image/index")
const queryParser = require('../../utils/queryparser')
const multipleFileUpload = require('../../middleware/multipleimageuploads')
const { check, validationResult } = require('express-validator');
const dairDal = require("../../dataaccess/dair/index")
const fs = require('fs');
let imageService = {
    async update(request) {},
    async findById(imageId) {
        if (parseInt(imageId) > 0) {
            let data = await imageDal.show(imageId)
            return data
        } else {
            return []
        }
    },
    validation(type) {
        switch (type) {
            case "delete":
                return [check('urlparse').notEmpty(), check('imageid').notEmpty(), check('urlparse').isArray(), check('urlparse').isLength({ min: 1 }), check('filename').notEmpty(), check('filename').isString(), check('dairid').notEmpty()]
        }
    },
    uploadFileFromStorage(req, res, bodyData) {
        try {
            return new Promise(((resolve, reject) => {
                multipleFileUpload(req, res, function(error) {
                    if (error) {
                        reject(error)
                    } else {
                        resolve({ file: req.files, body: bodyData ? req.body[bodyData] : null })
                    }
                })
            }))
        } catch (error) {
            throw new Error(error.message)
        }
    },
    geterrors(request, response) {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
            /*       return {errors: errors.array()}*/
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
        try {
            const { urlparse, dairid, filename, imageid } = request.body;
            let where = queryParser.parseQuery(urlparse)
            const diarUpdate = await this.diarDeleteImage(dairid, imageid)
            if (diarUpdate != null) {
                const deletedImageDisk = await this.deleteFromStorage("uploads/images/" + filename)
                if (deletedImageDisk) {
                    const data = await imageDal.delete(where)
                    return data
                } else {
                    throw new Error("Dosya Fiziksel Olarak Silinemedi")
                }
            }
            return null
        } catch (e) {
            throw new Error(e.message)

        }

    },
    async diarDeleteImage(dairid, imageid) {
        try {
            let dair = await dairDal.show({ _id: dairid })
            if (dair != null) {
                const dairImages = dair.images.filter((img) => {
                    return img != imageid
                })
                const dairUpdateImages = await dairDal.update({ _id: dairid }, { images: dairImages })
                return dair
            } else {
                return null
            }

        } catch (error) {
            throw new Error(error.message)
        }
    },
    async diarAddImage(id, data) {
        try {
            const dair = await dairDal.show({ _id: id })
            if (dair == null) return null
            const dairImages = dair.images
            data.forEach((imageItem) => {
                dairImages.push(imageItem._id)
            })
            const dairUpdateImages = await dairDal.update({ _id: id }, { images: dairImages })
            return dairUpdateImages
        } catch (error) {
            throw new Error(error.message)
        }
    },
    async createDiarImage(request, response) {
        try {
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
                const addedimage = await this.diarAddImage(result.body, data)
                if (addedimage != null) return data
                return null

            } else {
                return []
            }

        } catch (error) {
            throw new Error(error.message)
        }
    },

    async all(request) {
        try {
            const { urlparse } = request.body;
            let where;
            if (urlparse === undefined || urlparse === null) {
                where = {};
            } else {
                where = queryParser.parseQuery(urlparse)
            }
            const data = await imageDal.all(where)
            return data
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

module.exports = imageService