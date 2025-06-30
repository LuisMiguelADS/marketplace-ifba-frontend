import React from 'react';
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavLeft from './Components/Navigation/NavLeft';
import Header from './Components/Header/Header';
import Overview from './Components/Overview';
import Demands from './Components/Demands';

function App() {
  return <main>
    <BrowserRouter>
      <NavLeft />
      <Header />
      <Routes>
        <Route path="/overview" element={<Overview />} />
        <Route path="/demands" element={<Demands />} />
      </Routes>
    </BrowserRouter>

  </main>
}

export default App;
