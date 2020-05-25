const userService = require('../business/user/index')
const User = require('../models/user')
exports.show = async (req, res, next) => {
    try {
        const response = await userService.show(req)
        if (response == null) {
            res.status(404).json([])
        } else {
            res.status(200).json(response)
        }
    } catch (error) {
        res.status(500).json({error})
    }
}

exports.index = async (req, res, next) => {
    try {
        const response = await userService.all(req)
        res.status(200).json(response)
        /*"diaries","dairdate"*/
        /*    let test = await User.find({}).select("name email").populate([{
                path: 'diaries',
                /!*  match: { age: { $gte: 21 } },*!/
                // Explicitly exclude `_id`, see http://bit.ly/2aEfTdB
                select: '',
                populate: [{
                    path: "images"
                },
                    {
                        path: "videos"
                    }
                ],
                /!*   match: {_id: "5ec6d248e05e2446b80a3618"},*!/

            }
            ])
            res.send(test)*/
        /* const result = await userService.all(req)
         res.status(200).json(result)*/
    } catch (error) {
        res.status(500).json({error})
    }
}

exports.store = async (req, res, next) => {

}
exports.update = async (req, res, next) => {
}

exports.destroy = async (req, res, next) => {
}
exports.getdair = async (req, res, next) => {

     try {
          const response = await userService.getdair(req)
          if (response._id == undefined) {
              res.status(404).json([])
          } else {
              res.status(200).json(response)
          }
      } catch (error) {
          res.status(500).json({error})

      }
}
