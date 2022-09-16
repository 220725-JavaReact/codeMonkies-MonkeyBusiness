import './Blackjack.css'
import back from '../../images/BananaBack.png';
import { IDeckOfCards } from '../../models/DeckOfCards';
import SetBet from '../Games/SetBet/SetBet';
import { useState } from "react";
import axios from 'axios';
import { ICards } from '../../models/Cards';
import { ICard } from '../../models/Card';

let userName:string;

function Blackjack({userName}:any){
    console.log(userName);

    // Hard Code deck of cards, need to replace with api call (api/deck/new/shuffle)
    const cardDeck1: IDeckOfCards = {
        success: true,
        deck_id: "bx1eu5s07ggj",
        remaining: 52,
        shuffled: true
    }

    const cardPick1: ICard = {
        code: "",
        image: "",
        value: 0,
        suit: ""
    }

    // Soft Code deck of Cards
    function getCard(){//e: React.FormEvent<HTMLFormElement
        //e.preventDefault();

        axios.get<ICards>('https://www.deckofcardsapi.com/api/deck/bx1eu5s07ggj/draw/?count=1')
            .then(response => {
                console.log(response.data.cards);
                //cardPick1.code = response.data.cards.code;
            })


    }

    // Default Bet set to minimum bet 5 bannanas
    const playerBet = 5;

    // Game Buttons display condition based on game state
    const [gameStart, setStart] = useState(false);
    function startGame(){
        setStart(!gameStart);
    }
    const displayButtons = (
        <div>
            { gameStart ? 
                (<div><button onClick={getCard}>Hit</button><button>Stand</button></div>) : 
                (<div><SetBet /><button onClick={startGame}>Start Game</button></div>)
            }
        </div>
    );

    return <div className='blackjack'>

    <div className='controls'>
        <div className='userMenu'>
            <img src="https://pluspng.com/img-png/user-png-icon-big-image-png-2240.png" alt="user Icon"/>
            <p>Username</p>
            <p>Bananas Left: XXX</p>
        </div>
        <div className='gameControls'>
            <div className='dialog'>
                <p>Dealer:</p>
                <p>DEALER HAND</p>
                <p>Player:</p>
                <p>PLAYER NUMBER</p>
            </div>
            <div className='dialog'>
                
                {displayButtons}

            {/*<button>BET</button>
            <button>Start Game</button>*/}
             {/* <button>DOUBLE DOWN</button>
            <button>SPLIT</button> */}
            </div>
    </div>
    </div>
    <div className="table">
        <div className="cards">
            <div className ="dealer-hand" id="dealer-cards">
                {/* Enter Dealer's cards here */}
            </div>
            <div className ="hand" id="cards">
                {/* Enter Player's cards here */}
            </div>
        </div>
    </div>


        </div>
}
/*
<img src='https://deckofcardsapi.com/static/img/4H.png' alt="dealer card back"  className="card"/>
<img src={back} alt="dealer card back"  className="card dealer-card"/>

<img src='https://deckofcardsapi.com/static/img/6D.png' alt="dealer card back"  className="card"/>
<img src='https://deckofcardsapi.com/static/img/7H.png' alt="dealer card back" className="card"/>
<img src='https://deckofcardsapi.com/static/img/7H.png' alt="dealer card back" className="card"/>
<img src='https://deckofcardsapi.com/static/img/7H.png' alt="dealer card back" className="card"/>
*/

export default Blackjack;