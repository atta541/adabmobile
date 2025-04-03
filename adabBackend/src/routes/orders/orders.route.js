const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/orders/orders.controller');
const authMiddleware = require('../users/authMiddleware');

router.post('/', orderController.createOrder);
// router.get('/', orderController.getAllOrders);
// router.get('/:id', orderController.getOrdersByUserId);

router.put('/:id/status', orderController.updateOrderStatus);
router.delete('/:id', orderController.deleteOrder);



router.get('/', authMiddleware,orderController.getAllOrdersOfUser);


module.exports = router;
