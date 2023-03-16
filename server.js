const cors          = require('cors')
const http          = require('http')
const path          = require('path')
const colors        = require('colors')
const express       = require('express')
const cookieParser  = require('cookie-parser')
const services      = require('./services/methods')
const corsOptions   = require('./config/corsOprions')
const errorHandler  = require('./middlewares/ErrorHandler')
const { logEvents, logger } = require('./middlewares/logEvents')
const { tieFighter } = require('./starwars/starships')

require('dotenv').config()

const app           = express()
const httpServer    = http.createServer(app)
const PORT          = process.env.PORT || 5091 //** 5090

services.isInternetOnline( (res, isOnline) => { 
    if (isOnline) res.send("NO INTERNET CONNECTION!")
}) 

app.use(logger)
app.use(errorHandler)
app.use(cors(corsOptions)) // Cross Origin Resource Sharing
app.use(express.json())
app.use(cookieParser())
app.use('/', require('./routes/routes'))
app.use('/', express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html'))        res.sendFile(path.join(__dirname, 'views', '404.html'))
    else if (req.accepts('json'))   res.json({message: '404 Not Found'})
    else                            res.type('txt').send('404 Not Found')
})

const time  = new Date()
const df    = new Intl.DateTimeFormat("hu-hu", {
    dateStyle: "full",
    timeStyle: "full"
})

httpServer.listen( PORT, () => {
    logEvents(`SERVER IS RUNNING ON PORT: ${PORT}`, 'serverRunLog.txt')
    console.log(`\n\n${tieFighter}\n\nSERVER IS RUNNING ON PORT:\t${PORT.brightCyan.bold}\t${colors.gray(df.format(time))}\n`.yellow)
})
