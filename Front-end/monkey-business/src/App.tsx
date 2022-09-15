import React, { useState } from 'react';
import './App.css';
import Login from './components/Login/Login';
import Menu from './components/Menu'
import Blackjack from './components/Games/Blackjack'
import Dice from './components/Games/Dice'
import { isConstructorDeclaration } from 'typescript';
import { IUser } from './models/User';

function App() {

    const[isUserLoggedIn, setLog] = useState<boolean>(false);
    const[userName, setUser] = useState<string>("");
    const[bananas, setBananas] = useState<number>(1);
    const[game, setGame] = useState<string>("");
    const[view, setView] = useState<any>();
    const[user, setIUser] = useState<IUser>();


    //connect to rest
    //set data to game menu
    function verify(userName:string, password:string){
      //if data good, update,
      //if data bad, print message somehow
      console.log("verify called");
      setUser("blearned");
      setLog(true);
    }

    if (isUserLoggedIn && game === "Blackjack"){
      return <Blackjack userName={userName}/>
    } else if (isUserLoggedIn && game === "Dice"){
      return <Dice userName={userName}/>
    }else if (!isUserLoggedIn) {
      return <Login 
        verify={verify} />
    } else {
      return <Menu 
        isUserLoggedIn={isUserLoggedIn} 
        setLog={setLog}
        game={game}
        setGame={setGame}
        />;
    }

    if (isUserLoggedIn && game === "Blackjack"){
      <Blackjack/>
    }
    return (
      <div className="App">
       {view}
      </div>
    );
}

export default App;
export function logIn(){}