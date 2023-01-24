const express   = require('express')
const router    = express.Router()
const path      = require('path')
const { sendMessage, createCompletion } = require("../controllers/OpenAi")
const { allRecipes, cerateRecipe, deleteRecipe, updateRecipe } = require('../controllers/RecipeController')

router.get('^/$| /index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

//  AI BACKEND
router.route('/openAi').get(sendMessage).post(createCompletion)

//  RECIPE BACKEND
router.route('/recipes')
    .get(allRecipes)
    .post(cerateRecipe)
    .patch(updateRecipe)
    .delete(deleteRecipe)


module.exports = router
