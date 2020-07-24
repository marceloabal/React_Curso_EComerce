import React, { Component } from 'react';
import './App.css';
import Router from './Router';
import GlobalState from './Context/GlobalState';

class App extends Component{
 // constructor(){
 //     super()
 // }
  render(){
      return (
          <div className="ECommerce">
                <GlobalState>
                    <Router />
                </GlobalState>      
          </div>
      );
  }
}

export default App;


