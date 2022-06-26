const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    category: {type: String , required: true },
    product: {type: String , required: true }
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;