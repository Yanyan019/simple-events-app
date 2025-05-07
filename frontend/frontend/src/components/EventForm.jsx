import { useState } from 'react';
import axios from 'axios';

const EventForm = ({ onEventCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    lat: '',
    lng: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:3000/api/events', formData);
    onEventCreated(response.data);
    setFormData({ title: '', description: '', lat: '', lng: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full mb-2 p-2 border"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full mb-2 p-2 border"
        required
      />
      <input
        type="number"
        name="lat"
        placeholder="Latitude"
        value={formData.lat}
        onChange={handleChange}
        className="w-full mb-2 p-2 border"
        required
      />
      <input
        type="number"
        name="lng"
        placeholder="Longitude"
        value={formData.lng}
        onChange={handleChange}
        className="w-full mb-2 p-2 border"
        required
      />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        Create Event
      </button>
    </form>
  );
};

export default EventForm;
