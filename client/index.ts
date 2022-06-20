/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { StrictMode } from 'react';
import { render } from 'react-dom';
import App from './App.jsx';
import './stylesheets/styles.scss'

//our entry point  which allows us to include all the react components
//building block for the bundle
//contains all react components
render(
  <App />,
  document.getElementById('root')
);
