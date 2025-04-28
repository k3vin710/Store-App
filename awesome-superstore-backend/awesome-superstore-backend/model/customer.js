const db = require('../database/database');

class CustomerAccessor {

  static async insert(name, segment, email, password) {
    const queryStr = 'CALL USP_UpsertCustomer(?,?,?,?)';
    const [result] = await db.query(queryStr, [
      name,
      segment,
      email,
      password
    ]);
    return result[0][0].cust_id;
  }

  static async findOneById(customerId) {
    const queryStr = 'CALL USP_GetCustomerById(?)'
    const [result] = await db.execute(queryStr,[customerId]);
    if (result[0].length == 0) return null;
    return result[0][0];
  }

  static async findOneByEmail(email) {
    const queryStr = 'CALL USP_GetCustomerByEmail(?)';
    const [result] = await db.execute(queryStr,[email]);
    if (result[0].length == 0) return null;
    return result[0][0];
  }

  static async update(custId, custName, segment, email, password) {
    const queryStr = 'CALL USP_UpdateCustomer(?,?,?,?,?)';
    const [result] = await db.execute(queryStr, [custId, custName, segment, email, password]);
    return result[0][0];
  }

  static async setAndGetOTP(email) {
    const queryStr = 'CALL USP_SetAndGetOTPByEmail(?)';
    const [result] = await db.execute(queryStr, [email]);
    return result[0][0];
  }

}

module.exports = CustomerAccessor;
