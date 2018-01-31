const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const StorageSchema = new Schema({
  name: String
});

StorageSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Storage', StorageSchema);
