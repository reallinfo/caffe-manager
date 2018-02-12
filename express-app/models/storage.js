const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

let StorageSchema = new Schema({
  name: {
    type: String,
    unique: true
  }
});

StorageSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Storage', StorageSchema);