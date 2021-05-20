import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const url:string = "/msg.json";
ReactDOM.render(
  <React.StrictMode>
      <App url={url}/>
  </React.StrictMode>,
  document.getElementById('root')
);