const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderedArticleSchema = new Schema({
  orderedArticleName: {
    type: String
  },
  quantity: {
    type: Number
  }
}, { autoIndex: false });


module.exports = mongoose.model('OrderedArticle', OrderedArticleSchema);
