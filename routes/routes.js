const express   = require('express')
const router    = express.Router()
const path      = require('path')
const { sendMessage, createCompletion } = require("../controllers/OpenAi")

router.get('^/$| /index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

router.route('/openAi').get(sendMessage).post(createCompletion)



module.exports = router
