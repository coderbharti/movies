import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShowList from './component/ShowList';
import ShowSummary from './component/ShowSummary';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShowList />} />
        <Route path="/show/:id" element={<ShowSummary />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
