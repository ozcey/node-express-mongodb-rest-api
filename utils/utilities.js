const productController = require('../controllers/product');

exports.GetPrices = async (res, items) => {
    let prices = [];
    for (const productId of items) {
        const product = await productController.getProductById(res, productId);
        prices.push(product.price);
    }
    return prices;
};

exports.GetTimestamp = () => {
 const time = new Date().toLocaleTimeString();
 const date = new Date().toLocaleDateString();
 const timestamp = `${date} ${time}`;
 return timestamp;
};