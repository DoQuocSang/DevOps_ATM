const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Account = require('./models/account');
const cors = require('cors');

const app = express();
app.use(cors()); 

app.use(bodyParser.json());

app.get('/all-emails', async (req, res) => {
  try {
    const emails = await Account.find().select('email');
    res.status(200).json({
      success: true,
      emails: emails.map(account => account.email),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


app.post('/register', async (req, res) => {
  const accountEmail = req.body.email;
  const accountPassword = req.body.password;

  try {
    // Kiểm tra điều kiện và tạo người dùng mới
    const existingAccount = await Account.findOne({ name: accountEmail });
    if (existingAccount) {
      throw new Error('Account with this email already exists!');
    }

    // Tạo một người dùng mới
    const account = new Account({
      email: accountEmail,
      password: accountPassword,
      amount: 0
    });

    // Lưu người dùng vào cơ sở dữ liệu
    await account.save();
    res.status(201).json({ success: true, message: 'Account created successfully!', account: account.toObject() });
  } catch (error) {
    res.status(201).json({ success: false, message: error.message });
  }
});

app.delete('/delete-account', async (req, res) => {
  const accountEmail = req.query.email;
  const accountPassword = req.query.password;

  try {
    // Kiểm tra xem tài khoản tồn tại và mật khẩu khớp hay không
    const existingAccount = await Account.findOne({ email: accountEmail, password: accountPassword });
    if (!existingAccount) {
      res.status(200).json({ success: false, valid: false, message: 'Invalid email or password!' });
      return;
    }

    // Xóa tài khoản khỏi cơ sở dữ liệu
    await Account.deleteOne({ email: accountEmail });
    res.status(200).json({ success: true, valid: true, message: 'Account deleted successfully!' });
  } catch (error) {
    res.status(200).json({ success: false, valid: true, message: error.message });
  }
});


app.post('/login', async (req, res) => {
  const accountEmail = req.body.email;
  const accountPassword = req.body.password;

  try {
    // Kiểm tra xem tài khoản tồn tại và mật khẩu có khớp hay không
    const existingAccount = await Account.findOne({ email: accountEmail, password: accountPassword });
    if (!existingAccount) {
      throw new Error('Invalid email or password!');
    }

    // Đăng nhập thành công, trả về thông tin tài khoản
    res.status(200).json({ success: true, message: 'Login successful!', account: existingAccount.toObject() });
  } catch (error) {
    res.status(200).json({ success: false, message: error.message });
  }
});

mongoose.connect(
  // -- Local
  // 'mongodb://127.0.0.1:27017/atm-app'
  // -- Docker
  'mongodb://host.docker.internal:27017/atm-app'
  , { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log(err);
    console.log("Kết nối không thành công");
  } else {
    app.listen(3000);
    console.log("Kết nối thành công!");
  }
});
