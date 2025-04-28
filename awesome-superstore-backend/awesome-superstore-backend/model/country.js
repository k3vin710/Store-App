const db = require('../database/database');

class CountryAccessor {

    static async findAllByRegion(regionId) {
        const queryStr = 'CALL USP_GetAllCountriesByRegion(?)';
        const [result] = await db.query(queryStr, [regionId]);
        return result[0];
    }
}

module.exports = CountryAccessor;