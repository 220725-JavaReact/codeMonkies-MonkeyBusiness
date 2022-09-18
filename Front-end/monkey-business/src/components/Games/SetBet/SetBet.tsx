import { useState } from "react";

type BetProps = {
    setRealBet(num:number):void
}

function SetBet(props:BetProps) {
    //the paremeter in useState will determine the default value of this variable
    //bet variable is a state
    const minBet = 5;
    const [bet, setBet] = useState(minBet);
    const [show, setShow] = useState(true);


    function AddBet() {

        setBet(bet + 1);
        props.setRealBet(bet +1)
        console.log(bet);
    }

    function SubtractBet() {

        const newBet = bet-1;
        
        if(newBet >= minBet){
            setBet(newBet);
            props.setRealBet(newBet)
        }

        console.log(bet);
    }

    function showComponent() {
        setShow(!show);
    }

    return (
        <div>
            <p id='betDisplay'>Your Bet: {bet} bananas</p>
            <p id="betDisplay">Minimum Bet is 5 bananas</p>
            <button onClick={showComponent}>BET</button>
            {
                !show && <div>
                    <button onClick={AddBet}>+</button>
                    <button onClick={SubtractBet}>-</button>
                </div>
            }
        </div>
    );    
}

export default SetBet;