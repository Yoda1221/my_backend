const express           = require('express')
const router            = express.Router()
const path              = require('path')
const { loginP, userLoginP, userRegP }        = require('../controllers/AuthController')
const { allVehicle }    = require('../controllers/VehicleController')
const { sendMessage, createCompletion } = require("../controllers/OpenAi")
const { allRecipes, cerateRecipe, deleteRecipe, updateRecipe } = require('../controllers/RecipeController')
const { getUser, getAllCustomers, getAllGeography, getAllProducts, getAllTransactions } = require('../controllers/DashboardController')

//  FILEUPLOAD
const { uploadFile, uploadImage }   = require('../controllers/DataController')
const fileUpload            = require('express-fileupload')
const FileExtLimiter        = require('../middlewares/FileExtLimiter')
const FileSizeLimiter       = require('../middlewares/FileSizeLimiter')
const FilesPayloadExists    = require('../middlewares/FilesPayloadExists')

router.get('^/$| /index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

//  AI BACKEND
router.route('/openAi').get(sendMessage).post(createCompletion)

//  VEHICLES FIREBASE AUTH BACKEND
router.route('/authV').post(loginP)

//  VEHICLE BACKEND
router.route('/vehicles').get(allVehicle)

//  RECIPES AUTH BACKEND
router.route('/login').post(userLoginP)
router.route('/register').post(userRegP)

//  RECIPE BACKEND
router.route('/recipes')
    .get(allRecipes)
    .post(cerateRecipe)
    .patch(updateRecipe)
    .delete(deleteRecipe)


//  UPLOAD FILE
router.route('/imageupload').post(uploadImage)
router.route('/image').post(
    fileUpload({ createParentPath: true }), 
    FileSizeLimiter,
    FilesPayloadExists,
    FileExtLimiter(['.png', '.jpg', '.jpeg']),
    uploadFile
)

//  TO DASHBOARD
router.route('/getuser/:id').get(getUser)
router.route('/getproducts').get(getAllProducts)
router.route('/getcustomers').get(getAllCustomers)
router.route('/getgeography').get(getAllGeography)
router.route('/gettransactions').get(getAllTransactions)    //! NOT FINISHED


module.exports = router
