const fs            = require('fs')
const fsPromises    = fs.promises
const path          = require("path")
const services      = require('../services/methods')

const uploadFile = (req, res) => {      
      const files = req.files
      console.log("FILES ", files)
        Object.keys(files).forEach(key => {
            const filepath = path.join(__dirname, '..', 'files', files[key].name)
            files[key].mv(filepath, (err) => {
                if (err) return res.status(500).json({ status: "error", message: err })
            })
        })
        return res.json({ status: 'success', message: Object.keys(files).toString() })
}

module.exports = {
    uploadFile
}
