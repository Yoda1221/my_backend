const moment    = require('moment')
const mysqlConn = require('../config/mysqlConn')

/**
 ** QUERY DATA FROM DATABASSE WITH QUERY STRING
 
 *  @param { String }   tablename 
 *  @param { Object }   params
 */
const queryWithQueryString = async (queryString) => {
    const data  = new Promise( async (resolve, reject) => {
        await mysqlConn.query(queryString, (err, result) => {
            if(err) return reject(err)
            else return resolve(result)
        })
    })
    return data
}
/**
 ** QUERY DATA FROM DATABASSE
 
 *  @param { String }   tablename 
 *  @param { Object }   params
 */
const queryDataFromDb = async (fields, table, params) => {
    let query
    if (Object.keys(params).length > 0) {
        query = `SELECT ${fields} FROM ${table} WHERE ?`
    } else {
        query = `SELECT ${fields} FROM ${table}`
    }
    const data  = new Promise( async (resolve, reject) => {
        await mysqlConn.query(query, params, (err, result) => {
            if(err) return reject(err)
            else return resolve(result)
        })
    })
    return data
}
/**
 ** QUERY DATA FROM DATABASSE
 
 *  @param { String }   tablename 
 *  @param { Object }   params
 */
const getDataFromDb = async (tables, params) => {
    let query
    if (Object.keys(tables).length > 1) {
        query = `SELECT * FROM ${tables.base} t1
        JOIN ${tables.join1} t2
        ON t1.id = t2.recept_id
        ORDER BY t1.id`
    } else {
        if (Object.keys(params).length > 0) {
            query = `SELECT * FROM ${tables.base} WHERE ?`
        } else {
            query = `SELECT * FROM ${tables.base}`
        }
    }
    const data = new Promise( async (resolve, reject) => {
        await mysqlConn.query(query, params, (err, result) => {
            if(err) return reject(err)
            else return resolve(result)
        })
    })
    return data
}

/**
 ** SAVE DATA TO DATABASSE

 *  @param { String }   tablename 
 *  @param { Object }   params 
 */
const saveDataToDb = async (tablename, params) => {
    const query = `INSERT INTO ${tablename} SET ?`
    const data = new Promise( async (resolve, reject) => {
        await mysqlConn.query(query, params, (err, result) => {
            if(err) return reject(err)
            else return resolve(result)
        })
    })
    return `DATA SAVED ${data}`
}

/**
 ** UPDATE DATA IN DATABASE
 * 
 * @param { String } query 
 * @returns 
 */
const updateDataInDb = (query) => {
    const data = new Promise( async (resolve, reject) => {
        await mysqlConn.query(query, (err, result) => {
            if(err) return reject(err)
            else return resolve(result)
        })
    })
    return data
}

/**
 ** DELETE DATA FROM DATABASE
 * 
 * @param { String } id 
 * @param { String } tableName 
 * @returns 
 */
const deleteDataFromDb = (id, tableName) => {
    const query = `DELETE FROM ${tableName} WHERE id="${id}" `
    const data = new Promise( async (resolve, reject) => {
        await mysqlConn.query(query, (err, result) => {
            if(err) return reject(err)
            else return resolve(result)
        })
    })
    return data
}

/**
 ** CONT DATA ROWS 
 * 
 * @param { String }    tablename 
 * @param { Object}     params 
 * @returns 
 */
const countData = (tablename, params) => {
    const query = `SELECT COUNT(*) darab FROM ${tablename} WHERE deviceId = '${params.deviceId}'`
    const rows = new Promise( async (resolve, reject) => {
        await mysqlConn.query(query, params, (err, result) => {
            if(err) return reject(err)
            else return resolve(result)
        })
    })
    return rows
}

/**
 * *    CURRENT TIMESTAMP
 */
const timeStamp = () => { return moment(new Date()).format('YYYY-MM-DD HH:mm:ss') }

const services = {
    countData,
    timeStamp,
    saveDataToDb,
    getDataFromDb,
    updateDataInDb,
    queryDataFromDb,
    deleteDataFromDb,
    queryWithQueryString
}

module.exports = services
