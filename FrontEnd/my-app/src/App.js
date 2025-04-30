import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [editId, setEditId] = useState(null);

  const Api = 'http://localhost:8080/api/todos';

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const res = await axios.get(Api);
      setTodos(res.data);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId !== null) {
        await axios.put(`${Api}/${editId}`, formData);
      } else {
        await axios.post(Api, formData);
      }
      setFormData({ title: '', description: '' });
      setEditId(null);
      loadTodos();
    } catch (error) {
      console.error('Failed to save todo:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${Api}/${id}`);
      loadTodos();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const handleEdit = (todo) => {
    setFormData({ title: todo.title, description: todo.description });
    setEditId(todo.id);
  };

  return (
    <div className="container">
      <h1>ToDo List</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <button type="submit">{editId !== null ? 'Update' : 'Add'}</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <strong>{todo.title}</strong>: {todo.description}
            <div className="actions">
              <button onClick={() => handleEdit(todo)}>Edit</button>
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
