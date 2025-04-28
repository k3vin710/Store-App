const db = require('../database/database');

class RegionAccessor {

    static async findAll() {
        const queryStr = 'CALL USP_GetAllRegions()';
        const [result] = await db.query(queryStr);
        return result[0];
    }
}

module.exports = RegionAccessor;