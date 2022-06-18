const Purchase = require('../models/purchase');
const Product = require('../models/product');
const apiRes = require('../utils/apiRes');

const getPrice = (res, productId) => {
    return Product
        .findById(productId)
        .then((product) => {
            if (product) {
                return product.price;
            } else {
                apiResponses.notFoundResponse(res, 'Not found!');
            }
        })
        .catch((err) => {
            return apiRes.errorResponse(res, 'Fetching product by id failed!');
        });
}

const getTotalPrice = async (res, items) => {
    let prices = [];
    for (const productId of items) {
        const price = await getPrice(res, productId);
        prices.push(price);
    }
    return prices;
};

exports.SubmitPurchase = async (req, res) => {

    const request = {
        discountCode: req.body.discountCode,
        items: req.body.items
    };

    const items = request.items;
    const prices = await getTotalPrice(res, items);
    const initValue = 0;
    const totalPrice = prices.reduce((preValue, curValue) => (preValue + curValue), initValue);

    const purchase = new Purchase({
        date: formatDate(),
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

const formatDate = () => {
    const time = new Date().toLocaleTimeString();
    const date = new Date().toLocaleDateString();
    const timestamp = `${date} ${time}`;
    return timestamp;
};