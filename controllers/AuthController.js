const bcrypt                = require('bcrypt')
const jwt                   = require('jsonwebtoken')
const services              = require('../services/methods')
const admin                 = require('../firebase/firAdmin')
const { firebase, firAuth } = require('../firebase/firebase')
const { logEvents }         = require('../middlewares/LogEvents')
require('colors')

const auth          = firAuth.getAuth()
const maxAge        = 60 * 60 * 24 * 1000
const cookieName    = process.env.COOKIENAME

module.exports = {
    //** ---------- ##### POST ##### ---------- **/
    /**
     ** LOGIN POST
     *
     * @access  Public
     * @route   POST authV/login
     * 
     * @param { Object } req 
     * @param { Object } res 
     */
    loginP: async (req, res) => {
        const { email, password } = req.body
        //  CHECK IS THE EMAIL AND PASSWORD FIELDS IS NOT EMPTY
        if (!email || !password) {
            const error = {
                code: 'auth/incomplete data',
                message: 'e-mail or password is missing!',
                a: null
            }
            const errors = handleErrors(error)
            res.json({ errors })
            return
        }
        firAuth.signInWithEmailAndPassword(auth, email, password)
        .then((userRecord) => {
            const uid = userRecord.user.uid
            const accessToken = services.createAccessToken(res, uid, maxAge)
            res.json({ accessToken, userRecord })
        })
        .catch( (error) => {
            const errors = handleErrors(error)
            console.log('Login ERROR', errors)
            res.json( { errors } )        
        })
    },
    userLoginP: async (req, res) => {
        const { email, password } = req.body
        if (!email || !password) return res.status(400).json({ message: 'ALL FIELDS ARE REQUIRED' })
        const params = { email }
        const foundUser = await services.getDataFromDb({base: "users"}, params)
        console.log("🚀 → foundUser", foundUser)
        if (foundUser.length === 0) return res.status(401).json({ message: 'UNAUTHORIZED!' })
        const match = await bcrypt.compare(password, foundUser[0].password)
        console.log("🚀 → match", match)
        if (!match) return res.status(401).json({ message: 'UNAUTHORIZED!!!' })
        const accessToken = jwt.sign({
                "id": foundUser[0].id,
                "email": foundUser[0].email,
                "username": foundUser[0].username
            },
            process.env.ACCTOKENSECRET,
            { expiresIn: '50m' }
        )
        const refreshToken = jwt.sign({
                "id": foundUser[0].id,
                "email": foundUser[0].email,
                "username": foundUser[0].username
            },
            process.env.REFTOKENSECRET,
            { expiresIn: '1d' }
        )
        console.log('COOKIESECURE ', process.env.COOKIESECURE )
        //  CREATE SECURE COOKIE WITH REFRESH TOKEN 
        res.cookie(process.env.COOKIENAME, refreshToken, {
            httpOnly: true,                     //? accessible only by web server 
            //sameSite: 'None',                 //? cross-site cookie 
            maxAge: 24 * 60 * 60 * 1000,        //? cookie expiry: set to match rT
            secure: process.env.COOKIESECURE    //? http false, https true
        })
        //  SEND ACCESTOKEN CONTAINING userName AND roles
        res.json({ accessToken, role: foundUser[0].role })        
    },
    userRegP: async (req, res) => {
        console.log("RQB ", req.body)
        const saltRounds = 10
        const { country, email, password, passwd2, username } = req.body
        if (!email || !password) return res.status(400).json({ message: 'ALL FIELDS ARE REQUIRED' })
        if (password !== passwd2) return res.status(400).json({ message: 'PASSWORDS IS NOT EQUAL' })
        //  TODO    CHECK DATA, POASSWORD IS EQUAL, HASH PASSWORD AND SAVE TO DB
        //  TODO    IF HAVE ERROR SEND BACK TPO CLIENT SIDE, IF NO ERROR, SEND BACK SUCCESS
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err)  throw err
            const params = { country, email, password: hash, username }
            const response = services.saveDataToDb("users", params)
            console.log("🚀 → response", response)
            res.status(200).json(response)
        })
    }
}

/**
 ** RETURN ERROR CODE AND MESSAGE
 *
 * @param   {*} err
 * @return  {*} 
 */
 const handleErrors = (err) => {
    let errors = { emailErr: '', password: ''}
    console.log('ERR ', err)
    if (err.code == 'email-already-exists')         errors.emailErr = err.message
    if (err.code == 'appRegisteredError')           errors.emailErr = err.message
    if (err.code == 'auth/invalid-email')           errors.emailErr = err.message
    if (err.code == 'auth/wrong-password')          errors.password = err.message
    if (err.code == 'auth/user-not-found')          errors.emailErr = err.message
    if (err.code == 'auth/incomplete data')         errors.emailErr = err.message
    if (err.code == 'auth/invalid-password')        errors.password = err.message
    if (err.code == 'auth/too-many-requests')       errors.emailErr = err.message
    if (err.code == 'auth/email-already-exists')    errors.emailErr = err.message
    if (err.code == 'auth/creating new user error') errors.emailErr = err.message
    if (err.code == 'auth/internal-error')          errors.emailErr = err.message
    
    //**    SAVE ERROR  TO LOG FILFE
    logEvents(`SERVER IS RUNNING ON PORT: ${errors}`, 'errorLog.txt');
    return errors
}
