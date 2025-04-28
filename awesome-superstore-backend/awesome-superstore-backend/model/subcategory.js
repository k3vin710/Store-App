const db = require('../database/database');

class SubCategoryAccessor {

    static async findAllByCategory(categoryId) {
        const queryStr = 'CALL USP_GetAllSubcategoryByCategory(?)';
        const [result] = await db.query(queryStr, [categoryId]);
        return result[0];
    }
}

module.exports = SubCategoryAccessor;