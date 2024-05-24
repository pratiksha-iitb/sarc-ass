import axios from 'axios';
import{useState,useEffect} from 'react';
import React from 'react';
import Register from './Register';


function EventList(){
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [feedback, setFeedback] = useState({ name: '', email: '', message: '' });
  const [filter, setFilter] = useState({ date: '', location: '' });
  const [registeringEvent, setRegisteringEvent] = useState(null);
  useEffect(()=>{
    axios.get('http://127.0.0.1:8001/api/events/')
    .then(response=>{
       setEvents(response.data);
       setFilteredEvents(response.data);
    })
   .catch(error=>{
     console.error('There was an error fetching the events!',error);
    });
  },[]);
  useEffect(() => {
      let results = events.filter(event =>
        (filter.date === '' || event.date === filter.date) &&
        (filter.location === '' || event.location.toLowerCase().includes(filter.location.toLowerCase())) 
      );
  
    
        results = results.sort((a, b) => new Date(a.date) - new Date(b.date));
  
      setFilteredEvents(results);
    }, [filter,  events]);

  const sortByDate=()=>{
      const sortedEvents=[...filteredEvents].sort((a,b)=>new Date(a.date)-new Date(b.date));
      setFilteredEvents(sortedEvents);
  };
  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };
  const handleFilterChange = (e) => {
   const { name, value } = e.target;
   setFilter({ ...filter, [name]: value });
  };
  const handleRegisterClick = (eventId) => {
    setRegisteringEvent(eventId);
    };

    const handleRegisterFormClose = () => {
        setRegisteringEvent(null);
    };
    
    
    return(
        <div>
          <header>
          <h1>Alumination Events</h1>
          </header>
          
            <div className="filters">
            
             <input
                type="date"
                 name="date"
                 value={filter.date}
                onChange={handleFilterChange}
             />
             <input
                type="text"
                 name="location"
                placeholder="Filter by location..."
                value={filter.location}
                 onChange={handleFilterChange}
             />
             <button onClick={sortByDate}>Sort by Date</button>
           </div>
            <div className='event-container'>
                {filteredEvents.map(event=>(
                       <div  className='event-card' key={events.id}>
                         <div className='event-details'>
                        <h2>{event.id}: {event.eventname}</h2>
                        <p><strong>Time:</strong>{event.time}</p>
                        <p><strong>Date:</strong>{event.date}</p>
                        <p><strong>Venue:</strong>{event.location}</p>
                        <p>{event.description}</p>
                         <button onClick={()=>handleRegisterClick(event.id)}>Register</button>
                        </div>
                    </div>
                ))}
            </div>
                    {registeringEvent && (
                          <div className="modal">
                        <Register eventId={registeringEvent} onClose={handleRegisterFormClose} />
                           </div>   
            )}
            <div className="feedback">
        <h2>Feedback</h2>
        <form onSubmit='event.preventDefault()'>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={feedback.name} onChange={handleFeedbackChange} required />
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={feedback.email} onChange={handleFeedbackChange} required />
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" value={feedback.message} onChange={handleFeedbackChange} required></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="contact">
        <h2>Contact Us</h2>
        <p><strong>Email:</strong> dean.acr.office@iitbombay.org</p>
        <p><strong>Phone:</strong> 9122-2576-4889</p>
      </div>
   </div>
    );
}
export default EventList;