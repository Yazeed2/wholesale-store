const cases = require('change-case')
const  {camelCase} =cases
const snakeToCamel = (obj) => { 
    let keys = Object.keys(obj)
    let newObj = {}
    for(key of keys){ 
        newObj[camelCase(key)] = obj[key] 
    }
    return newObj 
}

module.exports = snakeToCamel