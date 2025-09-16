import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Header from './Components/Header/Header';

import Login from './Pages/Login';
import Home from './Pages/Home';

// Demandantes
import NavigationRequester from './Components/Navigation/NavigationRequester';
import OverviewRequester from './Pages/requester/OverviewRequester';
import DemandsRequester from './Pages/requester/DemandsRequester';
import OffersSolutionRequester from './Pages/requester/OffersSolutionRequester';
import ProjectsRequester from './Pages/requester/ProjectsRequester';
import GroupResearchRequester from './Pages/requester/GroupResearchRequester';
import ConversationsRequester from './Pages/requester/ConversationsRequester';
import JoinOrganization from './Pages/requester/JoinOrganization';
import ProfileRequester from './Pages/requester/ProfileRequester';


// Demandados
import NavigationProvider from './Components/Navigation/NavigationProvider';
import OverviewProvider from './Pages/provider/OverviewProvider';
import OfferSolutionProvider from './Pages/provider/OfferSolutionProvider';
import DemandsProvider from './Pages/provider/DemandsProvider';
import ProjectsProvider from './Pages/provider/ProjectsProvider';
import ConversationsProvider from './Pages/provider/ConversationsProvider';
import ProfileProvider from './Pages/provider/ProfileProvider';

import NotFound from './Pages/NotFound';
import { UserStorage } from './Components/UserContext';
import ProtectedRouter from './Components/ProtectedRouter';
import Register from './Pages/Register';
import JoinGroupResearch from './Pages/provider/JoinGroupResearch';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return <div className='grid-container'>
    <BrowserRouter>
      <UserStorage>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />

          <Route element={<ProtectedRouter allowedRoles={['ADMIN', 'EXTERNO']} />}>
            <Route path="/requester" element={
              <>
                <NavigationRequester isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                <Header onMenuToggle={handleMenuToggle} />
                <Outlet />
              </>
            }>
              {/* Rotas dos demandantes/solicitantes */}
              <Route path="overview" element={<OverviewRequester />} />
              <Route path="demands" element={<DemandsRequester />} />
              <Route path="offers" element={<OffersSolutionRequester />} />
              <Route path="projects" element={<ProjectsRequester />} />
              <Route path="research-group" element={<GroupResearchRequester />} />
              <Route path="conversations" element={<ConversationsRequester />} />
              <Route path="organization" element={<JoinOrganization />} />
              <Route path="profile" element={<ProfileRequester />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>

          <Route element={<ProtectedRouter allowedRoles={['ADMIN', 'PROFESSOR', 'ALUNO']} />}>
            <Route path="/provider" element={
              <>
                <NavigationProvider isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                <Header onMenuToggle={handleMenuToggle} />
                <Outlet />
              </>
            }>

              {/* Rotas dos demandados/solicitados */}
              <Route path="overview" element={<OverviewProvider />} />
              <Route path="offers-solutions" element={<OfferSolutionProvider />} />
              <Route path="demands" element={<DemandsProvider />} />
              <Route path="projects" element={<ProjectsProvider />} />
              <Route path="research-group" element={<JoinGroupResearch />} />
              <Route path="conversations" element={<ConversationsProvider />} />
              <Route path="profile" element={<ProfileProvider />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>

          {/* Todas as rotas que não foram estabelecidas, vai mostrar uma tela 'Not Found' */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </UserStorage>
    </BrowserRouter>
  </div >
}

export default App;
