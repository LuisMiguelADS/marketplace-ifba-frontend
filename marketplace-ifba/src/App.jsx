import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Header from './Components/Header/Header';

import Login from './Pages/Login';
import Home from './Pages/Home';

// Demandantes
import NavigationRequester from './Components/Navigation/NavigationRequester';
import OverviewRequester from './Pages/requester/OverviewRequester';
import DemandsRequester from './Pages/requester/DemandsRequester';
import ProposalsRequester from './Pages/requester/ProposalsRequester';
import ProjectsRequester from './Pages/requester/ProjectsRequester';
import GroupResearchRequester from './Pages/requester/GroupResearchRequester';
import ConversationsRequester from './Pages/requester/ConversationsRequester';

// Demandados
import NavigationProvider from './Components/Navigation/NavigationProvider';
import OverviewProvider from './Pages/provider/OverviewProvider';
import DemandsProvider from './Pages/provider/DemandsProvider';
import ProposalsProvider from './Pages/provider/ProposalsProvider';
import ProjectsProvider from './Pages/provider/ProjectsProvider';
import GroupResearchProvider from './Pages/provider/GroupResearchProvider';
import ConversationsProvider from './Pages/provider/ConversationsProvider';

import NotFound from './Pages/NotFound';
import { UserStorage } from './Components/UserContext';
import ProtectedRouter from './Components/ProtectedRouter';

function App() {
  return <div className='grid-container'>
    <BrowserRouter>
      <UserStorage>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/requester" element={
            <>
              <NavigationRequester />
              <Header />
              <Outlet />
            </>
          }>
            {/* Rotas dos demandados/solicitados */}
            <Route element={<ProtectedRouter allowedRoles={['ADMIN']} />}>
              <Route path="overview" element={<OverviewRequester />} />
            </Route>
            <Route path="demands" element={<DemandsRequester />} />
            <Route path="proposals" element={<ProposalsRequester />} />
            <Route path="projects" element={<ProjectsRequester />} />
            <Route path="research-group" element={<GroupResearchRequester />} />
            <Route path="conversations" element={<ConversationsRequester />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="/provider" element={
            <>
              <NavigationProvider />
              <Header />
              <Outlet />
            </>
          }>
            {/* Rotas dos demandantes/solicitantes */}
            <Route path="overview" element={<OverviewProvider />} />
            <Route path="demands" element={<DemandsProvider />} />
            <Route path="proposals" element={<ProposalsProvider />} />
            <Route path="projects" element={<ProjectsProvider />} />
            <Route path="research-group" element={<GroupResearchProvider />} />
            <Route path="conversations" element={<ConversationsProvider />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Todas as rotas que não foram estabelecidas, vai mostrar uma tela 'Not Found' */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </UserStorage>
    </BrowserRouter>
  </div>
}

export default App;
