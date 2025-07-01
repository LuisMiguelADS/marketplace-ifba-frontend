import React from 'react';
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavLeft from './Components/Navigation/NavLeft';
import Header from './Components/Header/Header';
import Overview from './Components/Overview';
import Demands from './Components/Demands';
import Login from './Components/pages/login/Login';
import Register from './Components/pages/register/Register';

function App() {
  return <main>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
          <NavLeft />
          <Header />
          <Demands />
        </>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/overview" element={
          <>
          <NavLeft />
          <Header />
          <Overview />
        </>
        } />
        <Route path="/demands" element={
          <>
          <NavLeft />
          <Header />
          <Demands />
        </>
        } />
      </Routes>
    </BrowserRouter>

  </main>
}

export default App;
