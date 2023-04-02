const services      = require('../services/methods')
const { validationResult } = require('express-validator')

const { PrismaClient } = require('@prisma/client')

const prisma    = new PrismaClient()

/**
 ** ALL RECIPES FROM DATABASE
 *
 * @param { Object} req 
 * @param { Object} res
 ** table { Object} TABLE NAMES FROM BODY (base, join1 ...) 
 ** param2 { Object} PARAMETERS TO WHERE STRING SUCH AS { id: 1 } 
 */
const allRecipes = async (req, res) => {
    let resp = await prisma.recipes.findMany({})
    res.status(200).json({ resp })
}

const cerateRecipe = async (req, res) => {
    //* https://www.npmjs.com/package/react-image-file-resizer
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
    console.log("🚀 → req.body: ", req.body)
    const resp = await prisma.recipes.create({ data: req.body })
    res.status(200).json(resp)
}

const updateRecipe = async (req, res) => {
    const { id, name, type, difficulty, completion, ingredients, description, temperature, completionTime } = req.body
    console.log("RQUB UPD " , req.body)
    const data = { name, type, difficulty, completion, ingredients, description, temperature, completionTime }
    const resp  = await prisma.recipes.update({ where: { id }, data: { data } })
    res.status(200).json(resp)
}

const deleteRecipe = async (req, res) => {
    console.log("RQUB DEL " , req.body)
    const { id } = req.body
    const resp = await prisma.recipes.delete({ where: {id} })
    console.log("🚀 → file: recipeController.js:72 → deleteRecipe → resp", resp)
    res.status(200).json(resp)
}

module.exports = {
    allRecipes,
    cerateRecipe,
    updateRecipe,
    deleteRecipe
}

/* 
allrecipe
    const resp  = await services.getDataFromDb({base: "recipes"}, {  })

createrecipe
    const { name, description, ingredients, completion, type, temperature, completionTime, difficulty } = req.body
    {name,type,difficulty,Number(temperature),completion,ingredients,Number(completionTime),description}
    const params = req.body
    const resp  = await services.saveDataToDb("recipes", params )
    
updaterecipe
    const query = `UPDATE recipes 
    SET name="${name}", description="${description}", ingredients="${ingredients}", completion="${completion}", 
    type="${type}", temperature="${temperature}", completionTime="${completionTime}", difficulty="${difficulty}"
    WHERE id = ${id}`
    const resp  = await services.updateDataInDb(query)

deleterecipe
    const tableName = "recipes"
    const resp  = await services.deleteDataFromDb(id, tableName)

uploadfile
    const uploadFile = async (req, res) => {
        const { recipeName, recipeDescription, recipeTemperature, recipeCompletionTime, recipeDifficulty } = req.body
        console.log("🚀 ~ file: recipeController.js ~ line 18 ~ uploadFile ~ files", req.files)
        console.log("🚀 ~ file: recipeController.js ~ line 18 ~ uploadFile ~ body", req.body)
        Object.keys(files).forEach(key => {
            const filepath = path.join(__dirname, 'uploadedImages', files[key].name)
            files[key].mv(filepath, (err) => {
                if (err) return res.status(500).json({ status: "error", message: err })
            })
        })
        return res.json({ status: 'success', message: Object.keys(files).toString() })
        return res.json({ status: 'success', message: "Recept mentve" })
    }

*/