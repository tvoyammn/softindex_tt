const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const UserModel = require('./models/User');

app.use(express.json());
app.use(cors());

mongoose.connect(
  'mongodb+srv://yevhenii_kriuchek:softindex_tt@softindextt.bti0s.mongodb.net/soft_index_tt?retryWrites=true&w=majority',
  { useNewUrlParser: true }
);

app.get('/users', async (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }

    res.send(result);
  })
});

app.post('/users', async (req, res) => {
  const user = new UserModel({
    name: req.body.name,
    phone: req.body.phone,
    gender: req.body.gender,
    age: req.body.age,
  })

  try {
    const savedUser = await user.save()
    res.send(savedUser);
  } catch(err) {
    console.log(err);
  }
});

app.listen(3001, () => {
  console.log('Server started on port 3001...');
});