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
  inStorage: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
  
}, { autoIndex: false });

ArticleSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Article', ArticleSchema);
