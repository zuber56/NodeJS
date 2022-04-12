let express = require('express');
let authController = require('../controllers/AuthController');
let uploadController = require('../controllers/UploadController');
let { uploadFileMiddleware } = require('../middleware/fileupload');
var router = express.Router();

router.post('/login', authController.login);
router.post('/upload', uploadFileMiddleware.fields([{ name: "avatar" }, { name: "companylogo" }]), uploadController.uploadFiles);


module.exports = router;
