const express = require('express');
const ordersRouter = express.Router();

const Order = require('../database/ordersModel');
const authenticate = require('../middleware/authenticate');
const admin = require('../middleware/admin');

ordersRouter.get('/admin/orders', authenticate, admin, async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', '_id name').exec();
        return res.status(200).json(orders);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

ordersRouter.post('/orders/create', authenticate, async (req, res) => {
    try {
        const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

        if (orderItems.length === 0) {
            const error = new Error('No order found!');
            return res.status(422).json({ error: error.message });
        }
        const order = { user: req.user._id, orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice }
        const createdOrder = new Order(order);
        await createdOrder.save();
        return res.status(201).json(createdOrder);

    } catch (error) {

        return res.status(400).json({ error: error.message });
    }
});

ordersRouter.patch('/orders/:id/pay', authenticate, async (req, res) => {
    try {
        const _id = req.params.id;
        const order = await Order.findById(_id).populate('user');

        if (!order) {
            const error = new Error('Order not found');
            return res.status(404).json({ error: error.message });
        }

        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            store: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
            status: req.body.status
        }
        const updatedOrder = await order.save({ validateBeforeSave: false });
        return res.status(200).json(updatedOrder);

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

ordersRouter.get('/orders/myorders', authenticate, async (req, res) => {
    try {
        const myOrders = await Order.find({user: req.user._id});

        return res.status(200).json(myOrders);

    } catch (error) {

        return res.status(400).json({ error: error.message });
    }
});

ordersRouter.get('/orders/:id', authenticate, async (req, res) => {
   try {
       const user = req.user._id;
       const _id = req.params.id;
       const getOrder = await Order.findById(_id).populate('user').exec();

       if (!getOrder) {
           const error = new Error('Order not found!');
           return res.status(404).json({ error: error.message });
       }

       return res.status(200).json(getOrder);
   } catch (error) {

       return res.status(400).json({ error: error.message });

   }
});

ordersRouter.patch('/admin/orders/:id/deliver', authenticate, admin, async (req, res) => {
   try {
       const order = await Order.findById(req.params.id).populate('user', '_id name email');

       if (!order) {
           const error = new Error('Order not found');
           return res.status(404).json({ error: error.message });
       }

       order.isDelivered = true;
       await order.save();
       return res.status(200).json(order);

   } catch (error) {
       return res.status(500).json({ error: error.message })
   }
});

ordersRouter.delete('/deleteAll',  async (req, res) => {
    await Order.deleteMany();
})

module.exports = ordersRouter;