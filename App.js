import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import MainRouter from './src/routes';


const App = createAppContainer(MainRouter);

export default App;
