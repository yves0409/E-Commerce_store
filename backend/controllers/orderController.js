import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

//Route : POST /api/orders
//What it does: Add new order to db
//Who : Protected
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAdress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems == 0) {
    res.status(400);
    throw new Error("No Orders");
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id, //to get the token bv it is protected
      shippingAdress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const orderCreated = await order.save();

    res.status(201).json(orderCreated);
  }
});

//Route : GET /api/orders/:id
//What it does: get order by Id
//Who : Protected
const getOrderById = asyncHandler(async (req, res) => {
  //note: req.params.id here means we are getting the id from the url
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

//Route : GET /api/orders/:id/pay
//What it does: Update order to paid
//Who : Protected
const updateOrderToPaid = asyncHandler(async (req, res) => {
  //note: req.params.id here means we are getting the id from the url
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    //Payment result is what you get back fron paypal, if you use different gateways to pay
    //it might be that you need to add different information
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});

//Route : GET /api/orders/myorders
//What it does: orders from the logged in user
//Who : Protected
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders };
