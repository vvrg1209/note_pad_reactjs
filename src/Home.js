import React, { useState, useEffect } from 'react';
import apiReuest from './apiRequest';

const Home = ({ loginuser, API_URL }) => {
  const [title, setTitle] = useState('');
  const [notearea, setNotearea] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  const fetchItems = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw Error("Data not received");
      const listItems = await response.json();
      const lid = loginuser + "123";
      const obj = listItems.filter(obj => obj.lid === lid);
      setItems(obj);
      setFetchError(null);
    } catch (err) {
      setFetchError(err.message);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [API_URL, loginuser]);

  const handlenote = (e) => {
    e.preventDefault();
    if (!title || !notearea) return;
    if (editingItem) {
      // Update existing item
      handleEdit(editingItem.id, { title, notearea });
    } else {
      // Add new item
      handleAdd({ title, notearea, loginuser });
    }
    setTitle('');
    setNotearea('');
    setEditingItem(null);
  };

  const handleAdd = async ({ title, notearea, loginuser }) => {
    const lid = loginuser + "123";
    let regobj = { lid, title, notearea };
    const postOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(regobj)
    };
    try {
      const result = await apiReuest(API_URL, postOptions);
      if (result === null) {
        setFetchError("Note added successfully");
        fetchItems();
      } else {
        setFetchError("Failed to add notes.");
      }
    } catch (error) {
      setFetchError("Failed to add notes.",error);
    }
  };

  const handleEdit = async (id, { title, notearea }) => {
    const updateOptions = {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, notearea })
    };
    const reqUrl = `${API_URL}/${id}`;
    try {
      const result = await apiReuest(reqUrl, updateOptions);
      if (result === null) {
        setFetchError("Note updated successfully");
        fetchItems();
      } else {
        setFetchError("Failed to update notes.");
      }
    } catch (error) {
      console.error('Error updating note:', error);
      setFetchError("Failed to update notes.");
    }
  };

  const handleDelete = async (id) => {
    const deleteOptions = { method: 'DELETE' };
    const reqUrl = `${API_URL}/${id}`;
    try {
      const result = await apiReuest(reqUrl, deleteOptions);
      if (result === null) {
        setFetchError("Note deleted successfully");
        fetchItems();
      } else {
        setFetchError("Failed to delete note.");
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      setFetchError("Failed to delete note.");
    }
  };

  const handleEditClick = (item) => {
    setTitle(item.title);
    setNotearea(item.notearea);
    setEditingItem(item);
  };

  return (
    <div className="container">
      <h1>Notepad</h1>
      <div align="right">
      <a href="/" className='btn btn-danger'>Logout</a>
      </div>
      {fetchError && (
        <div className="alert alert-danger" role="alert">
          {fetchError}
        </div>
      )}
      <form onSubmit={handlenote}>
        <div>
          <label htmlFor="title">Title:</label><br />
          <input required type="text" className='form-control' value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div>
          <label htmlFor="note">Note:</label><br />
          <textarea
            required type="textarea" className='form-control'
            value={notearea} onChange={e => setNotearea(e.target.value)}
          />
        </div>
        <br />
        <div className='card-footer'>
          <button type="submit" className='btn btn-primary'>{editingItem ? 'Edit Note' : 'Add Notes'}</button>
        </div>
      </form>
      <br />
      <br />
    

      {/* Container to display saved notes */}
      {items.map((item) => (
        <div className="container bootstrap snippets bootdey" key={item.id}>
          <div className="card-big-shadow">
            <div className="card card-just-text" data-background="color" data-color="green" data-radius="none">
              <div className="content">
                <h4 className="title"><a href="#">{item.title}</a></h4>
                <p className="description">{item.notearea}</p>
                <br />
                <div className='card-footer'>
                  <button type="button" className="btn btn-primary" onClick={() => handleEditClick(item)}>Edit</button>&nbsp; &nbsp;
                  <button type="button" className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
