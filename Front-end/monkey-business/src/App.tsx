import React from 'react';
import './App.css';
import Login from './components/Login';
import Menu from './components/Menu'
import Blackjack from './components/Games/Blackjack'

function App() {

    const isUserLoggedIn = true;
    let game = Blackjack;
    let view;
    if (!isUserLoggedIn) {
      view = <Login/>;
    } else {
      view = <Menu/>;
    }
    if (isUserLoggedIn && game === Blackjack){
      view = <Blackjack/>
    }
    return (
      <div className="App">
       {view}
      </div>
    );
}

export default App;
