const { validationResult } = require("express-validator");

const OrdersAccessor = require("../model/orders");

exports.insertOrders = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation error",
      errors: errors.array(),
    });
  }
  const orderProductJSON = req.body.order;
  const in_addr_id = req.body.addr_id;
  const in_cust_id = req.body.cust_id;
  const in_ship_mode = req.body.ship_mode;
  const in_ship_date = new Date(req.body.ship_date)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  const result = await OrdersAccessor.insertOrderDetails(
    JSON.stringify(orderProductJSON),
    in_addr_id,
    in_cust_id,
    in_ship_mode,
    in_ship_date
  );
  return res.status(200).json({ message: "Succesfully placed orders " });
};

exports.getOrdersByCustomerAndReturned = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation error",
      errors: errors.array(),
    });
  }
  const customerId = req.query.customerId;
  const isReturned = req.query.isReturned;
  const orders = await OrdersAccessor.findAllByCustomerAndReturned(customerId, isReturned);
  return res.status(200).json(orders);
}

exports.postOrderReturnedByCustomer = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation error",
      errors: errors.array(),
    });
  }
  const orderId = req.params.orderId;
  const newOrder = await OrdersAccessor.updateToReturnedByCustomer(orderId);
  return res.status(200).json({
    message: "Order is returned successfully"
  });
}

exports.getOrderDetails = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation error",
      errors: errors.array(),
    });
  }
  const orderId = req.params.orderId;
  const orderDetail = await OrdersAccessor.getOrderDetails(orderId);
  return res.status(200).json(orderDetail);
}