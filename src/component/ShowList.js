import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ShowList.css'

const ShowList = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetch('https://api.tvmaze.com/search/shows?q=all')
      .then(response => response.json())
      .then(data => setShows(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1 className='h1'>TV Shows</h1>
      <ul className="show-list-container">
        {shows.map(show => (
          <li key={show.show.id} className='list'>
            <h2>{show.show.name}</h2>
            <p>{show.show.type}</p>
            <p>{show.show.language}</p>
            <p>{show.show.genres.join(', ')}</p>
            <Link to={`/show/${show.show.id}`} className='btnViewSummary'>View Summary</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowList;


