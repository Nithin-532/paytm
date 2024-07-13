const mongoose = require('mongoose');

try {
  mongoose.connect('mongodb+srv://admin:DLcUVyS2ZmhzDf24@paytm.mdsr1ka.mongodb.net/paytm');
} catch(e) {
  console.log(e);
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  }
});

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  balance: {
    type: Number,
    required: true
  }
})

const User = mongoose.model('User', userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = {
  User,
  Account
}