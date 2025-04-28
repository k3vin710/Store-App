const db = require("../database/database");

class OrdersAccessor {
  static async insertOrderDetails(
    orderProductJSON,
    in_addr_id,
    in_cust_id,
    in_ship_mode,
    in_ship_date
  ) {
    const queryStr = "CALL USP_InsertOrdersData(?,?,?,?,?);";
    const [result] = await db.execute(queryStr, [
      orderProductJSON,
      in_addr_id,
      in_cust_id,
      in_ship_mode,
      in_ship_date,
    ]);
    return result;
  }

  static async findAllByCustomerAndReturned(customerId, isReturned) {
    const queryStr = 'CALL USP_GetOrdersByCustomer(?,?)';
    const [result] = await db.execute(queryStr, [customerId, isReturned]);
    return result[0];
  }

  static async updateToReturnedByCustomer(orderId) {
    const queryStr = 'CALL USP_ReturnOrder(?)';
    const [result] = await db.query(queryStr, [orderId]);
    return result[0];
  }

  static async getOrderDetails(orderId) {
    const queryStr = 'CALL USP_GetOrderProd(?)';
    const [result] = await db.query(queryStr, [orderId]);
    return result[0];
  }
}

module.exports = OrdersAccessor;
