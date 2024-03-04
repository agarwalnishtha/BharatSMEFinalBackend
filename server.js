const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
}));
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
  businessType: String,
  city: String,
});

const UserModel = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
  try {
    const newUser = new UserModel(req.body);
    const result = await newUser.save();
    console.log('Data saved successfully:', result);
    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ success: false, error: 'Error registering user' });
  }
});

const loanSchema = new mongoose.Schema({
  name: String,
  organization: String,
  gstNumber: String,
  email: String,
  number: Number,
  city: String,
  loanAmount: Number,
});

const LoanModel = mongoose.model('Loan', loanSchema);

app.post('/loan', async (req, res) => {
  try {
    const newLoan = new LoanModel(req.body);
    const result = await newLoan.save();
    console.log('Data saved successfully:', result);
    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ success: false, error: 'Error registering user' });
  }
});

const partnershipSchema = new mongoose.Schema({
  name: String,
  organization: String,
  email: String,
  number: Number,
  description: String,
});

const PartnershipModel = mongoose.model('Partnership', partnershipSchema);

app.post('/partnership', async (req, res) => {
  try {
    const newPartnership = new PartnershipModel(req.body);
    const result = await newPartnership.save();
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
