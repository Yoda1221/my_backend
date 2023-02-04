const admin         = require('../firebase/firAdmin')
const { firebase, firAuth } = require('../firebase/firebase')
const { logEvents } = require('../middlewares/LogEvents')
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
            const accessToken   = services.createAccessToken(res, uid, maxAge)
            res.json({ accessToken, userRecord })
        })
        .catch( (error) => {
            const errors = handleErrors(error)
            console.log('Login ERROR', errors)
            res.json( { errors } )        
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
