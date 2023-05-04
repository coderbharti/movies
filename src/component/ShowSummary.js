

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ShowSummary.css';

const ShowSummary = () => {
  const { id } = useParams();
  const [show, setShow] = useState({});
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [formData, setFormData] = useState({ movieName: '', details: '', userName: '', email: '' });

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then(response => response.json())
      .then(data => setShow(data))
      .catch(error => console.error(error));
  }, [id]);

  const handleBookingClick = () => {
    setFormData({ movieName: show.name, details: `Show: ${show.name}`, userName: '', email: '' });
    setShowBookingForm(true);
  };
   const CancelButtonHandler =()=>{
    setShowBookingForm(false );
   }

  const handleFormSubmit = e => {
    e.preventDefault();
    localStorage.setItem('bookingData', JSON.stringify(formData));
    setShowBookingForm(false);
  };

  return (
    <div>
      <h1>{show.name}</h1>
      <p>{show.summary}</p>
      <a href={show.officialSite} className='link'>Official Site</a>
      <button className='btn' onClick={handleBookingClick}>Book Movie Ticket</button>
      {showBookingForm && (
        <div className="backdrop">
          <div className="booking-form">
            <h2>Booking Form</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="movieName">Movie Name:</label>
                <input type="text" id="movieName" name="movieName" value={formData.movieName} readOnly />
              </div>
              <div className="form-group">
                <label htmlFor="details">Details:</label>
                <textarea id="details" name="details" value={formData.details} onChange={e => setFormData({ ...formData, details: e.target.value })}></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="userName">User Name:</label>
                <input type="text" id="userName" name="userName" value={formData.userName} onChange={e => setFormData({ ...formData, userName: e.target.value })} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
              </div>
              <button type="submit">Submit</button>
              <button className='Cancel' onClick={CancelButtonHandler}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowSummary;
