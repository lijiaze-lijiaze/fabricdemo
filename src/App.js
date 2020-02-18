import React from 'react';
import logo from './logo.svg';
import './App.css';
import Trafficlightflashfather from './trafficlightflashfather'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Trafficlightflashfather ></Trafficlightflashfather>
      </header>
    </div>
  );
}

export default App;
