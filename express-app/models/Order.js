const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  inWhichTable: {
    type: String,
    required: true
  },
  updated_date: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    default: Date.now
  }

}, { autoIndex: false });

// Get Orders by Table IDs
module.exports.getOrdersByTableIds = function(location, callback) {
  let query = {location: location};
  Order.find(query, callback);
};

module.exports = mongoose.model('Order', OrderSchema);
