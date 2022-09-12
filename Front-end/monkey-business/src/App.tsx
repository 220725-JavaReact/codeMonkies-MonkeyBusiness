import React from 'react';
import './App.css';
import Login from './components/Login';
import Menu from './components/Menu'

function App() {

  // constructor() {
  // }
  // logIn(){
    
  // }
    const isUserLoggedIn = false;
    let view;
    if (!isUserLoggedIn) {
      view = <Login/>;
    } else {
      view = <Menu/>;
    }
    return (
      <div className="App">
       {view}
      </div>
    );
}

export default App;
