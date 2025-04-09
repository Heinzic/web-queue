import React from 'react';
import './App.css';
import styled from '@emotion/styled';
import Button from './ui/Button';

// Styled component with props
const Container = styled.div<{ isActive?: boolean }>`
  padding: 20px;
  background-color: ${props => props.isActive ? '#f0f0f0' : 'white'};
  border: 1px solid #ddd;
  border-radius: 8px;
`;

// Nested styled components
const Card = styled.div`
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  
  h3 {
    color: #333;
    margin-bottom: 10px;
  }
  
  p {
    color: #666;
    line-height: 1.5;
  }
`;

const App: React.FC = () => {
  return (
    <Container isActive={true}>
      <h2>Queue Widget</h2>
      <Card>
        <h3>Welcome to Queue Widget</h3>
        <p>This is a queue widget content with styled components</p>
        <a href="https://google.com">Google</a>
        <Button variant="primary">Primary Button</Button>
      </Card>
    </Container>
  );
};

export default App;