const multer = require("multer");
const path = require("path");
const errHandler=function errHandler(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        res.json({
            success: 0,
            message: err.message
        })
    }
  }
  const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
  })
  const upload = multer({
    storage: storage,
    limits: {
        fileSize:10 * 1024 * 1024
    }
  })
  module.exports={errHandler,upload}