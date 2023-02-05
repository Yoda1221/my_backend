const fs            = require('fs/promises')
const path          = require("path")
const services      = require('../services/methods')

const sharp         = require('sharp')

const uploadFile = async (req, res) => {      
  const files = req.files
  //console.log("FILES ", files)
  Object.keys(files).forEach(async key => {
    const filepath = path.join(__dirname, '..', 'files', files[key].name)
    files[key].mv(filepath, (err) => {
        if (err) return res.status(500).json({ status: "error", message: err })
        imageResizer(files[key].name)
    })
  })
  return res.json({ status: 'success', message: Object.keys(files).toString() })
}

async function imageResizer(fileName) {
  const filepath  = path.join(__dirname, '..', 'files', fileName)
  const newPath   = path.join(__dirname, '..', 'files', `small_${fileName}` )
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
    uploadFile
}
