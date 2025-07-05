import React from 'react';
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavLeft from './Components/Navigation/NavLeft';
import Header from './Components/Header/Header';
import Overview from './Components/Overview';
import Demands from './Components/Demands';
import Proposals_ from './Components/Proposals_'; Conversations
import GroupResearch from './Components/GroupResearch';
import Conversations from './Components/Conversations';

function App() {
  return <div className='grid-container'>
    <BrowserRouter>
      <NavLeft />
      <Header />
      <Routes>
        <Route path="/overview" element={<Overview />} />
        <Route path="/demands" element={<Demands />} />
        <Route path="/proposals" element={<Proposals_ />} />
        <Route path="/research-group" element={<GroupResearch />} />
        <Route path="/conversations" element={<Conversations />} />
      </Routes>
    </BrowserRouter>

  </div>
}

export default App;
