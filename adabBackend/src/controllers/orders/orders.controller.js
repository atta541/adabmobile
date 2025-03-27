const Order = require('../../models/orders.model');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const sendNotificationToDevice = require('../notifications/notification'); 

const easyinvoice = require('easyinvoice');

const generateInvoice = async (order) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = {
                "documentTitle": "INVOICE",
                "currency": "PKR",
                "taxNotation": "vat",
                "sender": {
                    "company": "Adab Restaurant",
                    "address": "22B, Main Gulberg Road",
                    "zip": "54039",
                    "city": "Lahore",
                    "country": "Pakistan",
                    "email": process.env.EMAIL_USER
                },
                "client": {
                    "company": order.name,
                    "address": order.address,
                    "zip": "",
                    "city": order.nearestPlace || "N/A",
                    "country": "Pakistan",
                    "email": order.email,
                    "phone": order.phone
                },
                "invoiceNumber": order._id,
                "invoiceDate": new Date().toISOString().split('T')[0],
                "products": order.cartItems.map(item => ({
                    "quantity": item.quantity,
                    "description": item.productId?.name || "Unknown Product",
                    "price": item.price
                })),
                "bottomNotice": "Thank you for your purchase!"
            };

            
            const result = await easyinvoice.createInvoice(data);
            const filePath = path.join(__dirname, `../invoices/invoice-${order._id}.pdf`);

            
            fs.writeFileSync(filePath, result.pdf, 'base64');

            resolve(filePath);
        } catch (error) {
            reject(error);
        }
    });
};

const sendInvoiceEmail = async (order, filePath) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: order.email,
        subject: 'Order Invoice from Adab resturent',
        text: `Dear ${order.name},\n\nPlease find attached your order invoice.\n\nThank you!`,
        attachments: [{ filename: `invoice-${order._id}.pdf`, path: filePath }]
    };

    return transporter.sendMail(mailOptions);
};

exports.createOrder = async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, phone, address, nearestPlace, cartItems, totalPrice, fcmToken } = req.body;

        if (!name || !email || !phone || !address || !cartItems.length || !totalPrice) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        const newOrder = new Order({ name, email, phone, address, nearestPlace, cartItems, totalPrice });

        await newOrder.save();
        const invoicePath = await generateInvoice(newOrder);
        await sendInvoiceEmail(newOrder, invoicePath);

        
        if (fcmToken) {
            await sendNotificationToDevice(
                fcmToken,
                'Your order has been placed',
                `Hi ${name}, your order has been placed successfully. Your bill amount is ${totalPrice}.`
            );
        }

        res.status(201).json({ message: 'Order placed successfully! Invoice sent.', order: newOrder });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};



exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 }).populate('cartItems.productId');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('cartItems.productId');
        if (!order) return res.status(404).json({ message: 'Order not found!' });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });

        if (!order) return res.status(404).json({ message: 'Order not found!' });

        res.status(200).json({ message: 'Order status updated!', order });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found!' });

        res.status(200).json({ message: 'Order deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
