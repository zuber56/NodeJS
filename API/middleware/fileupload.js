let multer = require("multer")
let path = require("path")

const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `public/upload/${file.fieldname}`)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const uploadFileMiddleware = multer({
  storage: Storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|JPG|png|PNG)$/)) {
      req.fileValidationError = "Only JPG OR PNG allowed!";
      return cb("Only .png and .jpg are allowed! ", false);
    }
    cb(null, true);
  }
})

module.exports = {
  uploadFileMiddleware
}