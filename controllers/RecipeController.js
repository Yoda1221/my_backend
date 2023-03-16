const services      = require('../services/methods')
const { validationResult } = require('express-validator')

/**
 ** ALL RECIPES FROM DATABASE
 *
 * @param { Object} req 
 * @param { Object} res
 ** table { Object} TABLE NAMES FROM BODY (base, join1 ...) 
 ** param2 { Object} PARAMETERS TO WHERE STRING SUCH AS { id: 1 } 
 */
const allRecipes = async (req, res) => {
    const resp  = await services.getDataFromDb({base: "recipes"}, {  })
    res.status(200).json({ resp })
}

const cerateRecipe = async (req, res) => {
    //* https://www.npmjs.com/package/react-image-file-resizer
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { name, description, ingredients, completion, type, temperature, completionTime, difficulty } = req.body
    const params = req.body
    console.log("🚀 → req.body: ", req.body)
    {name,type,difficulty,temperature,completion,ingredients,completionTime,description}
    const resp  = await services.saveDataToDb("recipes", params )
    res.status(200).json(resp)
}

const updateRecipe = async (req, res) => {
    const { id, name, type, difficulty, completion, ingredients, description, temperature, completionTime } = req.body
    console.log("RQUB UPD " , req.body)
    const query = `UPDATE recipes 
    SET name="${name}", description="${description}", ingredients="${ingredients}", completion="${completion}", 
    type="${type}", temperature="${temperature}", completionTime="${completionTime}", difficulty="${difficulty}"
    WHERE id = ${id}`
    const resp  = await services.updateDataInDb(query)
    res.status(200).json(resp)
}

const deleteRecipe = async (req, res) => {
    console.log("RQUB DEL " , req.body)
    const { id } = req.body
    const tableName = "recipes"
    const resp  = await services.deleteDataFromDb(id, tableName)
    console.log("🚀 → file: recipeController.js:72 → deleteRecipe → resp", resp)
    res.status(200).json(resp)
}


const uploadFile = async (req, res) => {
    const { recipeName, recipeDescription, recipeTemperature, recipeCompletionTime, recipeDifficulty } = req.body
    console.log("🚀 ~ file: recipeController.js ~ line 18 ~ uploadFile ~ files", req.files)
    console.log("🚀 ~ file: recipeController.js ~ line 18 ~ uploadFile ~ body", req.body)
    /* Object.keys(files).forEach(key => {
        const filepath = path.join(__dirname, 'uploadedImages', files[key].name)
        files[key].mv(filepath, (err) => {
            if (err) return res.status(500).json({ status: "error", message: err })
        })
    })
    return res.json({ status: 'success', message: Object.keys(files).toString() }) */
    return res.json({ status: 'success', message: "Recept mentve" })
}

module.exports = {
    allRecipes,
    uploadFile,
    cerateRecipe,
    updateRecipe,
    deleteRecipe
}
