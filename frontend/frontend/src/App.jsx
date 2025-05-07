import { useState, useEffect } from 'react';
import axios from 'axios';
import EventForm from './components/EventForm';
import MapView from './components/Mapview';

const App = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const response = await axios.get('http://localhost:3000/api/events');
    setEvents(response.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEventCreated = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Simple Events App</h1>
      <EventForm onEventCreated={handleEventCreated} />
      <div className="my-4">
        <MapView events={events} />
      </div>
    </div>
  );
};

export default App;
