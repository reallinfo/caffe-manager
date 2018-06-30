const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const ArticleSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String
  },
  inStorage: {
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

// Get articles by storages
module.exports.getArticlesByStorage = function(inStorage, callback) {
  let query = {inStorage: inStorage};
  Article.find(query, callback);
};

module.exports = mongoose.model('Article', ArticleSchema);
