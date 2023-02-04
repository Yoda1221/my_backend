require('dotenv').config()

const firebase  = require('firebase/app')
const firAuth = {
    getAuth,
    signOut,
    signInWithEmailAndPassword
}   = require('firebase/auth')

//  INITIALIZE FIREBASE
firebase.initializeApp({
    appId:              process.env.APP_ID,
    apiKey:             process.env.API_KEY,
    projectId:          process.env.PROJECT_ID,
    databaseURL:        process.env.DATBASE_URL,
    authDomain:         process.env.AUTH_DOMAIN,
    measurementId:      process.env.MEASUREMENTID,
    storageBucket:      process.env.STORAGE_BUCKET,
    messagingSenderId:  process.env.MESSAGING_SENDER_ID
})

module.exports = {firebase, firAuth}
