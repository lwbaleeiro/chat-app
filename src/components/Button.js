import React from 'react';
import styled from 'styled-components';

// Estilização do botão com variações de tipo (primário, secundário, etc.)
const StyledButton = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* Variação por tipo */
  background-color: ${props => {
    switch (props.variant) {
      case 'primary':
        return '#3498db';
      case 'success':
        return '#2ecc71';
      case 'danger':
        return '#e74c3c';
      case 'secondary':
      default:
        return '#95a5a6';
    }
  }};
  
  color: white;
  
  /* Estilo quando desabilitado */
  opacity: ${props => props.disabled ? 0.6 : 1};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  
  /* Efeito de hover */
  &:hover:not(:disabled) {
    filter: brightness(1.1);
  }
  
  /* Efeito quando pressionado */
  &:active:not(:disabled) {
    filter: brightness(0.9);
  }
  
  /* Espaçamento para ícones */
  svg {
    margin-right: ${props => props.children ? '8px' : '0'};
  }
  
  /* Estilo quando está carregando */
  ${props => props.loading && `
    position: relative;
    color: transparent;
    
    &:after {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `}
`;

// Componente de botão reutilizável
const Button = ({ 
  children, 
  variant = 'primary', 
  loading = false, 
  ...rest 
}) => {
  return (
    <StyledButton
      variant={variant}
      loading={loading}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

export default Button;