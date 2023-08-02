const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Import the 'path' module

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Set up static file serving for the client-side code
app.use(express.static(path.join(__dirname, 'public')));

// Define the routes for each page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/customer_list', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'customer_list.html'));
});

app.get('/create_update_customer', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'create_update_customer.html'));
});

app.get('/delete_customer', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'delete_customer.html'));
});

// Dummy data to simulate the database
let customers = [];

// API endpoint for login
app.post('/login', (req, res) => {
  // Your login logic here to validate login credentials and generate a bearer token
  const bearerToken = 'YOUR_BEARER_TOKEN';
  res.status(200).json({ token: bearerToken });
});

// API endpoint to fetch the list of customers
app.get('/customers', (req, res) => {
  res.status(200).json(customers);
});

// API endpoint to create or update a customer
app.post('/customers', (req, res) => {
  // Your logic to create or update a customer here
  // For demo, let's assume the customer was updated/created successfully
  const customer = req.body;
  if (customer.uuid) {
    customers = customers.map((c) => (c.uuid === customer.uuid ? customer : c));
  } else {
    customer.uuid = Date.now().toString(); // Generate a UUID for new customers
    customers.push(customer);
  }
  res.status(200).json({ message: 'Customer saved successfully!' });
});

// API endpoint to delete a customer
app.post('/customers/delete', (req, res) => {
  const { uuid } = req.body;
  // Your logic to delete the customer by UUID here
  // For demo, let's assume the customer was deleted successfully
  customers = customers.filter((customer) => customer.uuid !== uuid);
  res.status(200).json({ message: 'Customer deleted successfully!' });
});

const port = 6385;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
