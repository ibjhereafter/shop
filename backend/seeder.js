const mongoose = require('mongoose');
const users = require('../data/users');
const products = require('../data/products');
const Product = require('../backend/database/productsModel');
const Order = require('../backend/database/ordersModel');
const User = require('../backend/database/usersModel');

require('dotenv').config({path: './config/.env'});
require('./database/connection');

const importData = async () => {
    try {

        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;

        const sampleProduct = products.map((product) => {
            return { ...product, user: adminUser}
        });

        await Product.insertMany(sampleProduct);
        process.exit();

    } catch (error) {
        console.log(error);
        process.exit();

    }
};

const destroyData = async () => {
    try {

        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

    } catch (error) {
        console.log(error);
        process.exit();

    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}


