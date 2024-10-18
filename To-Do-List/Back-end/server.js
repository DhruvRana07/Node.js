const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const dbFilePath = './db.json';

const readDB = () => {
  const data = fs.readFileSync(dbFilePath);
  return JSON.parse(data);
};

const writeDB = (data) => {
  fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
};

app.get('/items', (req, res) => {
  const data = readDB();
  res.json(data.items);
});

app.post('/items', (req, res) => {
  const newItem = req.body;
  const data = readDB();
  data.items.push(newItem);
  writeDB(data);
  res.status().json(newItem);
});

app.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const updatedItem = req.body;
  const data = readDB();
  const index = data.items.findIndex(item => item.id === parseInt(id));

  if (index !== -1) {
    data.items[index] = { ...data.items[index], ...updatedItem };
    writeDB(data);
    res.json(data.items[index]);
  } else {
    res.status().json({ message: 'Item not found' });
  }
});

app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  const data = readDB();
  const filteredItems = data.items.filter(item => item.id !== parseInt(id));

  if (filteredItems.length !== data.items.length) {
    data.items = filteredItems;
    writeDB(data);
    res.json({ message: 'Item deleted' });
  } else {
    res.status().json({ message: 'Item not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
