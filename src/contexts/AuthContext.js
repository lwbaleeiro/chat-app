import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Criando o contexto de autenticação
const AuthContext = createContext({});

// API mockada para simulação (em produção, usaríamos um servidor real)
const api = {
  login: async (email, password) => {
    // Simulando uma chamada de API com delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Credenciais de exemplo (em um app real, isso seria validado pelo servidor)
        if (email === 'user@example.com' && password === 'password') {
          resolve({
            success: true,
            user: { id: 1, name: 'Usuário Teste', email },
            token: 'token-simulado-123456'
          });
        } else {
          resolve({ success: false, error: 'Credenciais inválidas' });
        }
      }, 1000);
    });
  },
  
  register: async (name, email, password) => {
    // Simulando uma chamada de API com delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Em um app real, validaríamos os dados e criaríamos o usuário no servidor
        resolve({
          success: true,
          user: { id: Date.now(), name, email },
          token: `token-simulado-${Date.now()}`
        });
      }, 1000);
    });
  }
};

// Componente provedor do contexto de autenticação
export const AuthProvider = ({ children }) => {
  // Estado para armazenar os dados do usuário autenticado
  const [user, setUser] = useState(null);
  // Estado para controlar se está carregando informações de autenticação
  const [loading, setLoading] = useState(true);

  // Efeito para verificar se há um usuário já logado (ao carregar a aplicação)
  useEffect(() => {
    // Verificamos no localStorage se há um token salvo
    const storedUser = localStorage.getItem('@ChatApp:user');
    const storedToken = localStorage.getItem('@ChatApp:token');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      
      // Configurando o token para todas as requisições futuras
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
    
    setLoading(false);
  }, []);

  // Função para realizar login
  const signIn = async (email, password) => {
    try {
      const response = await api.login(email, password);
      
      if (response.success) {
        const { user, token } = response;
        
        // Salvando dados no localStorage para persistência
        localStorage.setItem('@ChatApp:user', JSON.stringify(user));
        localStorage.setItem('@ChatApp:token', token);
        
        // Configurando o token para todas as requisições futuras
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        setUser(user);
        return { success: true };
      }
      
      return { success: false, error: response.error };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Ocorreu um erro ao fazer login. Tente novamente.'
      };
    }
  };

  // Função para registrar um novo usuário
  const signUp = async (name, email, password) => {
    try {
      const response = await api.register(name, email, password);
      
      if (response.success) {
        const { user, token } = response;
        
        // Salvando dados no localStorage para persistência
        localStorage.setItem('@ChatApp:user', JSON.stringify(user));
        localStorage.setItem('@ChatApp:token', token);
        
        // Configurando o token para todas as requisições futuras
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        setUser(user);
        return { success: true };
      }
      
      return { success: false, error: response.error };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Ocorreu um erro ao registrar. Tente novamente.'
      };
    }
  };

  // Função para fazer logout
  const signOut = () => {
    // Removendo dados do localStorage
    localStorage.removeItem('@ChatApp:user');
    localStorage.removeItem('@ChatApp:token');
    
    // Removendo token das requisições
    delete axios.defaults.headers.common['Authorization'];
    
    // Limpando o estado do usuário
    setUser(null);
  };

  // Disponibilizando as funções e estados através do contexto
  return (
    <AuthContext.Provider value={{ 
      user, 
      loading,
      signIn,
      signUp,
      signOut,
      isAuthenticated: !!user // Converte user para booleano
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para facilitar o uso do contexto
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  
  return context;
}