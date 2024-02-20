const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  totalPrice: { type: Number },
  orderDate: { type: Date }
})


const customerSchema = new mongoose.Schema({
  fname: { type: String },
  lname: { type: String },
  email: { type: String },
  orders: [{ type: orderSchema }],
  wishList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }],
});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;