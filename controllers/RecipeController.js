const fs            = require('fs')
const fsPromises    = fs.promises
const path          = require("path")
const services      = require('../services/methods')

/**
 ** ALL RECIPES FROM DATABASE
 *
 * @param { Object} req 
 * @param { Object} res
 ** table { Object} TABLE NAMES FROM BODY (base, join1 ...) 
 ** param2 { Object} PARAMETERS TO WHERE STRING SUCH AS { id: 1 } 
 */
const allRecipes = async (req, res) => {
    const respRecipe        = await services.getDataFromDb({base: "recipes"}, {  })
    //const respIndegrients   = await services.getDataFromDb({base: "ingredients"}, {  })
    res.status(200).json({respRecipe})  //  , respIndegrients
}

const cerateRecipe = async (req, res) => {
    /*const file = req?.files?.img ? req?.files?.img : null
    console.log('RFI ', file)
    const filePath = file !== null ? `recipeImgs/${file.name}` : ""
    if (file !== null) {
        console.log('FOLDER ', !fs.existsSync(path.join(__dirname, '..', 'public', 'recipeImgs')))
        if (!fs.existsSync(path.join(__dirname, '..', 'public', 'recipeImgs'))) 
            await fsPromises.mkdir(path.join(__dirname, '..', 'public', 'recipeImgs'))

        file.mv(`public/recipeImgs/${file.name}`, err => {
            if (err) {
              console.error(err);
              return res.status(500).send(err);
            }
        
            console.log({ fileName: file.name, filePath });
        })
    }*/
    //* https://www.npmjs.com/package/react-image-file-resizer
    /* else {return res.status(400).json({ message: 'NO FILE UPLOADED!' })} */
    const { name, description, ingredients, completion, type, temperature, completionTime, difficulty } = req.body
    const params = { 
        name,
        type,
        difficulty,
        temperature,
        completion,
        ingredients,
        completionTime,
        description,
        //image: filePath
    }
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
    const resp  = await services.deleteDataFromDb(id)
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
    }) */
    //return res.json({ status: 'success', message: Object.keys(files).toString() })
    return res.json({ status: 'success', message: "Recept mentve" })
}

module.exports = {
    allRecipes,
    uploadFile,
    cerateRecipe,
    updateRecipe,
    deleteRecipe
}