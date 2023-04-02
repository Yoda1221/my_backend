const fs            = require('fs')
const path          = require("path")
const sharp         = require('sharp')
const multer        = require('multer')
const services      = require('../services/methods')

const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'files'),
  filename: (req, file, cb) => {
      cb(null, 'UP_' + file.originalname )    //* null as first argument means no error
  }
})

const uploadImage = async (req, res) => {
  console.log("RB ", req.body)
  try {
    let upload = multer({ storage: storage}).single('avatar')   //* 'avatar' is the name of our file input field in the HTML form
    upload(req, res, function(err) {
      console.log("🚀 → file: server.js:46 → upload → FILE", req.file)
      // req.file contains information of uploaded file
      // req.body contains information of text fields
      if (!req.file) return res.send('PLEASE SELECT AN IMAGE TO UPLOAD!')
      else if (err instanceof multer.MulterError) return res.send(`MULTER ERROR ${err}`)
      else if (err) return res.send(`ERROR ${err}`)

      const classifiedsadd = { image: req.file.filename }
      const sql = "INSERT INTO users SET ?";
          connection.query(sql, classifiedsadd, (err, results) => {  if (err) throw err;
      })
      // TODO RESIZING THE UPLOADED IMAGE
        res.json({ success: 1 })      
    })
  } catch (err) { console.log(err) }
}

const uploadFile = async (req, res) => {  
  const { rId, newName } = req.body
  const files = req.files
  Object.keys(files).forEach(async key => {
    const ext = files[key].name.split('.').pop()
    const filepath = path.join(__dirname, '..', 'files', files[key].name)
    files[key].mv(filepath, (err) => {
      if (err) return res.status(500).json({ status: "error", message: err })
      imageResizer(files[key].name, newName + "." + ext )
    })
    const sql = `UPDATE recipes SET image="recipeImgs/${newName}.${ext}" WHERE id = "${rId}" `
    const response = await services.updateDataInDb(sql)
    console.log("🚀 → DataController.js:50 → RESPONSE", response)
    /* fs.readFile(filepath, (err, data) => {
      if (!err && data) {
        //  TODO  REMOVE ORIGINAL FILE!
        fs.unlink(filepath, (err) => {
          if (err) throw err  
          console.log("Delete File successfully.")
        })
      }
    }) */
  })
  return res.json({ status: 'success', message: Object.keys(files).toString() })
}

async function imageResizer(fileName, newName) {
  const filepath  = path.join(__dirname, '..', 'files', fileName)
  const newPath   = path.join(__dirname, '..', 'public/recipeImgs', newName )
  try {
    sharp(filepath)
      .resize(400,300, {
        fit: "cover",
        position: "center"
      })
      .toFile(newPath)
  } catch (err) {
    console.log("FILE RESIZING ERROR ", err)
  }
}

module.exports = {
    uploadFile,
    uploadImage
}
