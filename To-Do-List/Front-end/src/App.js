import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ id: '', name: '', description: '' });

  useEffect(() => {
    axios.get('http://localhost:3000/items')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching items', error);
      });
  }, []);

  const addItem = () => {
    axios.post('http://localhost:3000/items', newItem)
      .then(response => {
        setItems([...items, response.data]);
        setNewItem({ id: '', name: '', description: '' });
      })
      .catch(error => {
        console.error('Error adding item', error);
      });
  };

  const deleteItem = (id) => {
    axios.delete(`http://localhost:3000/items/${id}`)
      .then(() => {
        setItems(items.filter(item => item.id !== id));
      })
      .catch(error => {
        console.error('Error deleting item', error);
      });
  };

  const updateItem = (id) => {
    const updatedName = prompt('Enter new name');
    const updatedDescription = prompt('Enter new description');
    axios.put(`http://localhost:3000/items/${id}`, { name: updatedName, description: updatedDescription })
      .then(response => {
        setItems(items.map(item => (item.id === id ? response.data : item)));
      })
      .catch(error => {
        console.error('Error updating item', error);
      });
  };

  return (
    <div className="App">
      <h1>CRUD App</h1>
      <div>
        <input
          type="text"
          value={newItem.id}
          placeholder="ID"
          onChange={e => setNewItem({ ...newItem, id: e.target.value })}
        />
        <input
          type="text"
          value={newItem.name}
          placeholder="Name"
          onChange={e => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="text"
          value={newItem.description}
          placeholder="Description"
          onChange={e => setNewItem({ ...newItem, description: e.target.value })}
        />
        <button onClick={addItem}>Add Item</button>
      </div>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <strong>ID:</strong> {item.id} <br />
            <strong>Name:</strong> {item.name} <br />
            <strong>Description:</strong> {item.description} <br />
            <button onClick={() => deleteItem(item.id)}>Delete</button>
            <button onClick={() => updateItem(item.id)}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
