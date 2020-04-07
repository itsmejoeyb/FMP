import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRouter from './App';
import RootContext from './RootContext'

ReactDOM.render(
  <React.StrictMode>
    <RootContext>
      <AppRouter />
    </RootContext>
  </React.StrictMode>,
  document.getElementById('root')
);
