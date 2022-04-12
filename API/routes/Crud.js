let express = require('express')
var router = express.Router();
let CrudController = require('../controllers/CrudController')
let { uploadFileMiddleware } = require('../middleware/fileupload')
// import auth from '../middleware/auth'
const auth = require('../middleware/auth')

router.get('/',auth, CrudController.get)
router.post('/', CrudController.create)
router.get('/getUserById/:id', CrudController.getById);
router.delete('/:id', CrudController.delete);
router.put('/chnagepassword/:id', CrudController.chnagePassword);
router.put('/:id', uploadFileMiddleware.fields([{ name: "avatar" }, { name: "companylogo" }]), CrudController.update);



module.exports = router