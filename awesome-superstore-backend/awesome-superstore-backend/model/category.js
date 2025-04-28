const db = require('../database/database');

class CategoryAccessor {

    static async findAll() {
        const queryStr = 'CALL USP_GetAllCategory()';
        const [result] = await db.query(queryStr);
        return result[0];
    }
}

module.exports = CategoryAccessor;