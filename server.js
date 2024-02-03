const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Replace 'YOUR_MONGODB_CONNECTION_STRING' with your actual connection string
const dbUrl = 'mongodb+srv://u17ec130:NQivzvm5Sg2x3xPe@cluster0.p8pvifa.mongodb.net/';
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB successfully!');
});

const userSchema = new mongoose.Schema({
  name: String,
  organization: String,
  email: String,
  number: Number,
  requirements: String,
  purpose: String,
});

const UserModel = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
  try {
    debugger;
    const newUser = new UserModel(req.body);
    const result = await newUser.save();
    console.log('Data saved successfully:', result);
    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ success: false, error: 'Error registering user' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
