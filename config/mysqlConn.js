const mysql     = require('mysql')
const colors    = require('colors')
const { logEvents, logger } = require('../middlewares/LogEvents')

require('dotenv').config()

const mysqlConn = mysql.createConnection({
    host      : process.env.DB_HOST,
    port      : process.env.DB_PORT,
    user      : process.env.DB_USER,
    password  : process.env.DB_PASS,
    database  : process.env.DB_DATABASE
})

const time  = new Date()
const df    = new Intl.DateTimeFormat("hu-hu", {
    dateStyle: "full",
    timeStyle: "full"
}) 

mysqlConn.connect( (err) => {
    if (err) {
      console.error('Connect error: ' + err.message)
      mysqlConn.end()
      return
    }
    logEvents(`Connected to mySqlDb, Id:\t${mysqlConn.threadId}`, 'dbConnectLog.txt')
    console.log(`Connected to mySqlDb, Id:\t${colors.yellow(mysqlConn.threadId)}\t${colors.cyan(df.format(time))}\n`.gray )
})

module. exports = mysqlConn
