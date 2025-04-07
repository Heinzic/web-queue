import React from 'react';
import './App.css';
import styled from '@emotion/styled';

// Basic styled component
const Button = styled.button`
  padding: 32px;
  background-color: hotpink;
  font-size: 24px;
  border-radius: 4px;
  color: black;
  font-weight: bold;
  &:hover {
    color: white;
  }
`;

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

// Extending existing styled component
const PrimaryButton = styled(Button)`
  background-color: #007bff;
  color: white;
  &:hover {
    background-color: #0056b3;
  }
`;

const App: React.FC = () => {
  return (
    <Container isActive={true} className="widget-container">
      <h2>Queue Widget</h2>
      <Card className='queue-content'>
        <h3>Welcome to Queue Widget</h3>
        <p>This is a queue widget content with styled components</p>
        <a href="https://google.com">Google</a>
      </Card>
      <div style={{ marginTop: '20px' }}>
        <Button>Default Button</Button>
        <PrimaryButton>Primary Button</PrimaryButton>
      </div>
    </Container>
  );
};

export default App;