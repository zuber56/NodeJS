let express = require('express')
var router = express.Router();
let UserController = require('../controllers/UserController')
let { uploadFileMiddleware } = require('../middleware/fileupload')
// import auth from '../middleware/auth'
const auth = require('../middleware/auth')

router.get('/',auth, UserController.get)
router.post('/', UserController.create)
router.get('/getUserById/:id', UserController.getById);
router.delete('/:id', UserController.delete);
router.put('/chnagepassword/:id', UserController.chnagePassword);
router.put('/:id', uploadFileMiddleware.fields([{ name: "avatar" }, { name: "companylogo" }]), UserController.update);



module.exports = router