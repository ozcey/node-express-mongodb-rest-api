const Purchase = require('../models/purchase');
const apiRes = require('../utils/apiRes');
const utils = require('../utils/utilities');

const submitPurchase = async (req, res) => {
    const request = {
        discountCode: req.body.discountCode,
        items: req.body.items
    };

    const items = request.items;
    const prices = await utils.getPrices(res, items);
    const initValue = 0;
    const totalPrice = prices.reduce((preValue, curValue) => (preValue + curValue), initValue);

    const purchase = new Purchase({
        date: utils.getTimestamp(),
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

const updatePurchase = (req, res) => {
    const purchase = new Purchase({
        _id: req.params.id,
        date: req.body.date,
        total: req.body.total,
        discountCode: req.body.discountCode,
        items: req.body.items,
        customerId: req.customerData.customerId
    });

    Purchase.updateOne({
            _id: req.params.id
        }, purchase)
        .then((result) => {
            if (result.modifiedCount > 0) {
                apiRes.successResponse(res, 'Purchase updated successfully!');
            } else {
                apiRes.notFoundResponse(res, 'Purchase not found!');
            }
        })
        .catch((err) => {
            apiRes.errorResponseWithData(res, 'Updating purchase failed!', err)
        });
};

const retrivePurchase = (req, res) => {
    Purchase
        .find()
        .then((purchases) => {
            apiRes.successResponseWithOnlyData(res, purchases);
        })
        .catch((err) => apiRes.errorResponseWithData(res, 'Fetching purchases failed!', err));
};

const retrivePurchaseById = (req, res) => {
    Purchase
        .findById(req.params.id)
        .then((purchase) => {
            if (purchase) {
                apiRes.successResponseWithOnlyData(res, purchase);
            } else {
                apiResponses.notFoundResponse(res, 'Not found!');
            }
        })
        .catch((err) => apiRes.errorResponseWithData(res, 'Fetching purchase by id failed!', err));
};


const deletePurchase = (req, res) => {
    Purchase
        .deleteOne({
            _id: req.params.id
        })
        .then((result) => {
            if (result.deletedCount > 0) {
                apiRes.successResponse(res, 'Purchase deleted successfully!');
            } else {
                apiRes.notFoundResponse(res, 'Purchase not found!');
            }
        })
        .catch((err) => apiRes.errorResponse(res, 'Deleting purchase failed!'));
};

module.exports = {
    submitPurchase,
    updatePurchase,
    retrivePurchase,
    retrivePurchaseById,
    deletePurchase
};