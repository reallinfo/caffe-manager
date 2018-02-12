const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const StorageSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now
  }
},{ autoIndex: false });

StorageSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Storage', StorageSchema);
