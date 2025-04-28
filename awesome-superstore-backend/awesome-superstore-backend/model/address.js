const db = require('../database/database');

class AddressAccessor {

    static async insert(cityId, postalCode, custId) {
        const queryStr = 'CALL USP_UpsertAddress(?,?,?)';
        const result = await db.query(queryStr, [cityId, postalCode, custId]);
        return result[0][0][0];
    }

    static async findAllByCustomer(custId) {
        const queryStr = 'CALL USP_GetAddressByCustomer(?)';
        const result = await db.query(queryStr, [custId]);
        return result[0][0];
    }

    static async update(addrId, cityId, postalCode) {
        const queryStr = 'CALL USP_UpdateAddress(?,?,?)';
        const result = await db.query(queryStr, [addrId, cityId, postalCode]);
        return result[0][0];
    }

    static async findOneById(addrId) {
        const queryStr = 'CALL USP_GetAddressById(?)';
        const result = await db.query(queryStr, [addrId]);
        return result[0][0][0];
    }
}

module.exports = AddressAccessor;