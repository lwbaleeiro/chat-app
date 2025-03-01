import React, { forwardRef } from 'react';
import styled from 'styled-components';

// Estilização do componente usando styled-components
const InputContainer = styled.div`
  margin-bottom: 16px;
  width: 100%;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${props => props.error ? '#e74c3c' : '#ddd'};
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s;
  
  &:focus {
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

const ErrorMessage = styled.span`
  display: block;
  color: #e74c3c;
  font-size: 12px;
  margin-top: 4px;
`;

// Componente de input reutilizável
const Input = forwardRef(({ 
  label, 
  name, 
  error, 
  ...rest 
}, ref) => {
  return (
    <InputContainer>
      {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
      
      <StyledInput
        id={name}
        name={name}
        ref={ref}
        error={!!error}
        {...rest}
      />
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
});

export default Input;