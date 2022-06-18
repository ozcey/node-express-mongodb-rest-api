const Purchase = require('../models/purchase');
const apiRes = require('../utils/apiRes');
const productController = require('./product');

const getPrices = async (res, items) => {
    let prices = [];
    for (const productId of items) {
        const product = await productController.getProductById(res, productId);
        prices.push(product.price);
    }
    return prices;
};

const getTimestamp = () => {
    const time = new Date().toLocaleTimeString();
    const date = new Date().toLocaleDateString();
    const timestamp = `${date} ${time}`;
    return timestamp;
};

exports.SubmitPurchase = async (req, res) => {
    const request = {
        discountCode: req.body.discountCode,
        items: req.body.items
    };

    const items = request.items;
    const prices = await getPrices(res, items);
    const initValue = 0;
    const totalPrice = prices.reduce((preValue, curValue) => (preValue + curValue), initValue);

    const purchase = new Purchase({
        date: getTimestamp(),
        total: totalPrice,
        discountCode: request.discountCode,
        items: request.items,
        customerId: req.customerData.customerId
    });

    purchase
        .save()
        .then((submittedPurchase) => {
            apiRes.createdResponseWithData(res, 'Purchase submitted successfully!', submittedPurchase);

        })
        .catch((err) => apiRes.errorResponseWithData(res, 'Purchase submitted failed!', err));

};