const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    default: 0
  }
});

const AccountModel = mongoose.model('Account', accountSchema);

module.exports = AccountModel;
