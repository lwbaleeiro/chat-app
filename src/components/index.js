import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Importando páginas
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
//import ChatRoom from '../pages/ChatRoom';

// Componente para rotas privadas (acessíveis apenas para usuários autenticados)
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  // Se estiver carregando, mostra uma mensagem de loading
  if (loading) {
    return <div>Carregando...</div>;
  }
  
  // Se não estiver autenticado, redireciona para a página de login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // Se estiver autenticado, renderiza o conteúdo da rota
  return children;
};

// Componente principal de roteamento
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Rotas privadas */}
        <Route 
          path="/" 
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } 
        />
        {/* <Route 
          path="/chat/:id" 
          element={
            <PrivateRoute>
              <ChatRoom />
            </PrivateRoute>
          } 
        /> */}
        
        {/* Rota padrão (redireciona para home) */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;