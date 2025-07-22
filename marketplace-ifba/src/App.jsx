import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import NavLeft from './Components/Navigation/NavLeft';
import Header from './Components/Header/Header';
import Overview from './Components/Overview';
import Demands from './Components/Demands';
import Proposals_ from './Components/Proposals_';
import GroupResearch from './Components/GroupResearch';
import Conversations from './Components/Conversations';
import Home from './Components/Home';


function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className={isHome ? '' : 'grid-container'}>
      {!isHome && <NavLeft />}
      {!isHome && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/demands" element={<Demands />} />
        <Route path="/proposals" element={<Proposals_ />} />
        <Route path="/research-group" element={<GroupResearch />} />
        <Route path="/conversations" element={<Conversations />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
