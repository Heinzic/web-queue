import React from 'react';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="widget-container">
      <h2>Queue Widget</h2>
      <div className="queue-content">
        <p>This is a queue widget content</p>
        <a href="https://google.com">Google</a>
      </div>
    </div>
  );
};

export default App;
