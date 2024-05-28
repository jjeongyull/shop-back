const mongoose = require('mongoose');
const User = require("./User");
const Product = require("./Product");
const Schema = mongoose.Schema;
const cartSchema = Schema({
  userId: { type: mongoose.ObjectId, ref: User },
  items: [{
    productId: { type: mongoose.ObjectId, ref: Product },
    size: { type: String, require: true },
    qty: { type: Number, default: 1 }
  }]
}, { timestamps: true });
cartSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.__v;
  delete obj.updateAt;
  delete obj.creatAt;
  return obj;
}

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;