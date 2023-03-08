import React from 'react';
import tree from './tree.svg';
import './App.css';
import { FaLeaf } from "react-icons/fa";
import Timer from './components/Timer/Timer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={tree} className="App-logo" alt="logo" style={{color:"blue"}}/>
        <p>
          Welcome to loFicus.
        </p>
        <Timer></Timer>
      </header>
    </div>
  );
}

export default App;
