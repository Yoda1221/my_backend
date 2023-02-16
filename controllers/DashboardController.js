const services          = require('../services/methods')
const getCountryIso3    = require("country-iso-2-to-3")

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getUser = async (req, res) => {
    //console.log("RB ", req.body)
    const { id } = req.params
    //  TODO    CHECK LOGGED USER ID AND ROLE (ADMIN, USER)
    //  TODO    GET ALL USER FROM MYSQL DATABASE AND FIREBASE DATABASE
    try {
        const resp  = await services.queryDataFromDb("id,username,email,role,country","users", { id }  )
        res.status(200).json({ resp })
    } catch (error) {
        res.status(400).json({ error })
    }
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getAllProducts = async (req, res) => {
    console.log("RB ", req.body)
    //  TODO    CHECK LOGGED USER ID AND ROLE (ADMIN, USER)
    //  TODO    GET ALL USER FROM MYSQL DATABASE AND FIREBASE DATABASE
    try {
        const resp  = await services.getDataFromDb({base: "recipes"}, {  })
        res.status(200).json({ resp })
    } catch (error) {
        res.status(400).json({ error })
    }
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getAllCustomers = async (req, res) => {
    console.log("RB ", req.body)
    //  TODO    CHECK LOGGED USER ID AND ROLE (ADMIN, USER)
    //  TODO    GET ALL USER FROM MYSQL DATABASE AND FIREBASE DATABASE
    try {
        const resp  = await services.queryDataFromDb("id,username,email,role", "users", {  })
        res.status(200).json({ resp })
    } catch (error) {
        res.status(400).json({ error })
    }
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getAllTransactions = async (req, res) => {
    console.log("RB ", req.body)
    //  TODO    CHECK LOGGED USER ID AND ROLE (ADMIN, USER)
    //  TODO    GET ALL USER FROM MYSQL DATABASE AND FIREBASE DATABASE
    /* try {
        const resp  = await services.getDataFromDb({base: "recipes"}, {  })
        res.status(200).json({ resp })
    } catch (error) {
        res.status(400).json({ error })
    } */
    res.json({transacion: {}})
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getAllGeography = async (req, res) => {
    //  TODO    CHECK LOGGED USER ID AND ROLE (ADMIN, USER)
    //  TODO    GET ALL USER FROM MYSQL DATABASE AND FIREBASE DATABASE
    const query = "SELECT country id, COUNT(id) value FROM users GROUP BY country ORDER BY id"
    try {
        const users = await services.queryWithQueryString(query )
        console.log("🚀 → file: DashboardController.js:80 → getAllGeography → USERS", users)
        const mappedLocation = users.map( acc  => {
            console.log("🚀 → file: DashboardController.js:83 → mappedLocation → acc", acc)
            const countryISO3 = getCountryIso3(acc.id)
            console.log("🚀 → file: DashboardController.js:84 → mappedLocation → countryISO3", countryISO3)
            acc.id = countryISO3
            //if (!acc[countryISO3]) acc[countryISO3] = 0
            //acc[countryISO3]++
            return acc
        }, {})
        console.log("🚀 → file: DashboardController.js:89 → mappedLocation → mappedLocation", mappedLocation)
        /* const formattedLocation = Object.entries(mappedLocation).map((item) => {
            console.log("🚀 → file: DashboardController.js:92 → formattedLocation → CCCCC", item)
            return { id: item.country, value: item }
        }) */
        res.status(200).json(mappedLocation)
    } catch (error) {
        res.status(400).json({ error })
    }
}


module.exports = {
    getUser,
    getAllProducts,
    getAllCustomers,
    getAllGeography,
    getAllTransactions
}
