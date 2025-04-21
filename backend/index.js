const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const products = [
  { id: 1, name: "Classic Tee", category: "Shirt", gender: "Unisex", price: 19.99 },
  { id: 2, name: "Elegant Skirt", category: "Skirt", gender: "Women", price: 39.90 },
  { id: 3, name: "Running Sneakers", category: "Shoes", gender: "Men", price: 59.99 }
];

app.get('/products', (req, res) => {
  res.json(products);
});

app.post('/order', (req, res) => {
  const { email, items, total } = req.body;
  console.log("New Order:", { email, items, total });
  // Later: store this in DynamoDB
  res.status(201).json({ message: 'Order received' });
});

if (require.main === module) {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } else {
    module.exports = app;
  }