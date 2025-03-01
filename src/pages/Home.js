import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import ConversationItem from '../components/ConversationItem';
import chatService from '../services/chatService';

// Estilização da página
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: #3498db;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  margin: 0;
  font-size: 20px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled.span`
  margin-right: 16px;
  font-weight: 500;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ConversationList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 24px;
  text-align: center;
  color: #666;
`;

const EmptyStateIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  color: #bbb;
`;

const NewConversationContainer = styled.div`
  padding: 16px;
  border-top: 1px solid #eee;
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 16px;
  color: #666;
`;

// Componente da página inicial
const Home = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  // Carregar as conversas ao montar o componente
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const data = await chatService.getConversations();
        setConversations(data);
      } catch (error) {
        console.error('Erro ao carregar conversas:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchConversations();
    
    // Ouvinte para atualizar conversas quando houver novas mensagens
    const handleNewMessage = (event) => {
      const { conversationId } = event.detail;
      
      setConversations(prevConversations => 
        prevConversations.map(conv => {
          if (conv.id === conversationId) {
            return {
              ...conv,
              unread: conv.unread + 1
            };
          }
          return conv;
        })
      );
    };
    
    window.addEventListener('newMessage', handleNewMessage);
    
    // Limpeza ao desmontar o componente
    return () => {
      window.removeEventListener('newMessage', handleNewMessage);
    };
  }, []);
  
  // Função para criar uma nova conversa
  const handleNewConversation = async () => {
    try {
      setCreating(true);
      // Em um app real, você pediria o nome do contato
      const name = `Contato ${Math.floor(Math.random() * 1000)}`;
      const newConversation = await chatService.createConversation(name);
      
      setConversations(prev => [newConversation, ...prev]);
      // Navega para a nova conversa
      navigate(`/chat/${newConversation.id}`);
    } catch (error) {
      console.error('Erro ao criar conversa:', error);
    } finally {
      setCreating(false);
    }
  };
  
  // Renderização condicional baseada no estado de carregamento
  if (loading) {
    return (
      <Container>
        <Header>
          <Title>Chat App</Title>
        </Header>
        <LoadingContainer>
          Carregando conversas...
        </LoadingContainer>
      </Container>
    );
  }
  
  return (
    <Container>
      <Header>
        <Title>Chat App</Title>
        <UserInfo>
          <UserName>{user?.name}</UserName>
          <Button 
            variant="secondary" 
            onClick={signOut}
          >
            Sair
          </Button>
        </UserInfo>
      </Header>
      
      <Content>
        {conversations.length === 0 ? (
          <EmptyState>
            <EmptyStateIcon>💬</EmptyStateIcon>
            <h2>Nenhuma conversa ainda</h2>
            <p>Inicie uma nova conversa para começar a bater papo.</p>
          </EmptyState>
        ) : (
          <ConversationList>
            {conversations.map(conversation => (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
                onClick={() => navigate(`/chat/${conversation.id}`)}
              />
            ))}
          </ConversationList>
        )}
      </Content>
      
      <NewConversationContainer>
        <Button 
          onClick={handleNewConversation}
          loading={creating}
          disabled={creating}
        >
          Nova Conversa
        </Button>
      </NewConversationContainer>
    </Container>
  );
};

export default Home;