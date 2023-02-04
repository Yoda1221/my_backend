const express   = require('express')
const router    = express.Router()
const path      = require('path')
const { loginP } = require('../controllers/AuthController')
const { sendMessage, createCompletion } = require("../controllers/OpenAi")
const { allRecipes, cerateRecipe, deleteRecipe, updateRecipe } = require('../controllers/RecipeController')
const { allVehicle } = require('../controllers/VehicleController')
const { uploadFile } = require('../controllers/DataController')
//  FILEUPLOAD
const fileUpload    = require('express-fileupload')
//  MULTER
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

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


//  RECIPE BACKEND
router.route('/recipes')
    .get(allRecipes)
    .post(cerateRecipe)
    .patch(updateRecipe)
    .delete(deleteRecipe)


//  UPLOAD FILE
router.route('/image').post(fileUpload({ createParentPath: true }), uploadFile)

module.exports = router
