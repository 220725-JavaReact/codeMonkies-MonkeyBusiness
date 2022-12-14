import './Blackjack.css'
import back from '../../images/BananaBack.png';
import SetBet from '../Games/SetBet/SetBet';
import { useEffect, useState } from "react";
import axios from 'axios';
import { ICards } from '../../models/Cards';
import { IUser } from '../../models/User';

//let userName:string;

type BlackJackProps = {
    user:IUser,
    setIUser:React.Dispatch<React.SetStateAction<IUser>>,
    game:string,
    setGame:React.Dispatch<React.SetStateAction<string>>
}

function Blackjack(Props:BlackJackProps){

    // User Fields
    const[bananas, setBananas] = useState<number>(Props.user.bananas);
    const[playerBet, setPlayerBet] = useState<number>(5);
    // Player Fields
    const[playerArrHandValues, setplayerArrHandValues] = useState<number[]>([]);
    const[playerArrCardCodes, setplayerArrCardCodes] = useState<string[]>([]);
    const[playerHandSum, setPlayerHandSum] = useState<number>(0);
    // Dealer Fields
    const[dealerArrHandValues, setDealerArrHandValues] = useState<number[]>([]);
    const[dealerHandSum, setDealerHandSum] = useState<number>(0);
    const[dealerArrCardCodes, setDealerArrCardCodes] = useState<string[]>([]);
    // Game Buttons display condition based on game state
    const [gameStart, setGameStart] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    // Dealers Turn
    const [dealerTurn, setDealerTurn] = useState(false);
    // Player Turn 1
    const [turn1, setTurn1] = useState(false);
    // Dealer must stand on #
    const [dealerStand, setDealerStand] = useState(17);
    // Winners
    const [playerWon, setPlayerWon] = useState(false);
    const [dealerWon, setDealerWon] = useState(false);
    //chat Dialog
    const[chat, addChat] = useState<Array<String>>([]);

    /**
     * Hit onClick function, draws 1 card, checks player's hand if over 21, or at 21
     */
     async function getCard(){

        axios.get<ICards>('https://www.deckofcardsapi.com/api/deck/bx1eu5s07ggj/draw/?count=1')
            .then(response => {
                const currentCards = response.data.cards;
                const cardValue = getCardValue(String(currentCards[0].value));

                setplayerArrHandValues(old => [...old, cardValue]);
                setPlayerHandSum(oldSum => oldSum + cardValue);
                setplayerArrCardCodes(old => [...old, currentCards[0].code]);

                // Check if player's hand is over BlackJack, adjust if it is
                if(playerHandSum > 21){
                    console.log("In Hit -> PLayer Hand is over 21!!!");
                    if(checkAceInHand(playerArrHandValues)){
                        console.log("BUT PLAYER HAND HAS AN ACE!!!   LUCKYYYY!!!!");
                        setPlayerHandSum(oldSum => oldSum - 10);
                        const newPlayerCards = adjustIfAceInHand(playerArrHandValues);
                        setplayerArrHandValues(newPlayerCards);

                    } else{
                        // Game Over
                        console.log("GAME OVER!!! PLAYER LOST!!!!");
                        setGameOver(true);
                    }
                }

                // Toggle player's turn 1 off
                if(turn1){
                    setTurn1(false);
                }                

                console.log("End of Turn: playerHandSum = " + playerHandSum + "; playerArrHandValues = ");
                //playerArrHandValues.map(cardData => (console.log(cardData)));
                console.log(playerArrHandValues);
            })
    }

    async function dealerGetCard(){
        if(dealerHandSum < 17){
            axios.get<ICards>('https://www.deckofcardsapi.com/api/deck/bx1eu5s07ggj/draw/?count=1')
            .then(response => {
                const currentCards = response.data.cards;
                const cardValue = getCardValue(String(currentCards[0].value));

                //setplayerArrHandValues(old => [...old, cardValue]);
                setDealerArrHandValues(old => [...old, cardValue]);
                //setPlayerHandSum(oldSum => oldSum + cardValue);
                setDealerHandSum(oldSum => oldSum + cardValue);
                //setplayerArrCardCodes(old => [...old, currentCards[0].code]);
                setDealerArrCardCodes(old => [...old, currentCards[0].code]);

                // Check if Dealer's hand is over BlackJack, adjust if it is
                if(checkHandSumOver21(dealerHandSum)){
                    console.log("In Hit -> Dealer Hand is over 21!!!");
                    if(checkAceInHand(dealerArrHandValues)){
                        console.log("BUT DEALER HAND HAS AN ACE!!!   UNLUCKYYYY!!!!");
                        setDealerHandSum(oldSum => oldSum - 10);
                        const newDealerCards = adjustIfAceInHand(playerArrHandValues);
                        setDealerArrHandValues(newDealerCards);

                    } else{
                        // Game Over
                        console.log("GAME OVER!!! DEALER LOST!!!!");
                        setGameOver(true);
                    }
                }
            })
        } else {
            compareHands();
        }

        
    }

    /**
     * On Change of [playerHandSum, playerArrHandValues], check if player lost, adjust if Ace is in the hand
     */
    useEffect(() => {
        if(playerHandSum != 0){
            console.log('useEffect ran. playerHandSum is: ', playerHandSum);
            console.log('useEffect ran. playerArrHandValues is: ', playerArrHandValues);

            if(playerHandSum > 21){// && checkAceInHand(playerArrHandValues)

                if(checkAceInHandPlayer()){
                    adjustIfAceInHandPlayer();
                } else{
                    // Game Over
                    console.log("GAME OVER!!! Player LOST!!!!");
                    setGameOver(true);
                    setDealerWon(true);
                }
                
                
            }
        }
      }, [playerHandSum, playerArrHandValues]);

    function handleDoubleDown(){
        getCard();
        handleDealerTurn();
    }

    function handleDealerTurn(){
        setDealerTurn(true);

        dealerGetCard()

        //compareHands();

    }

    useEffect(() => {

        if(dealerHandSum != 0 && dealerTurn){

            console.log('useEffect ran. dealerHandSum is: ', dealerHandSum);
            console.log('useEffect ran. dealerArrHandValues is: ', dealerArrHandValues);

            if(dealerHandSum > dealerStand){

                if(dealerHandSum > 21){
                    if(checkAceInHandDealer()){
                        // setDealerHandSum(oldSum => oldSum - 10);
                        adjustIfAceInHandPlayer();
                    } else{
                        // Game Over
                        // console.log("GAME OVER!!! Dealer LOST!!!!");
                        // addChat(["Dealer Lost and Player Won",...chat])
                        // setGameOver(true);
                        // setDealerWon(true);
                        compareHands();
                    }
                }
                else{
                    compareHands();
                }
            }
            else{
                dealerGetCard();
            }
        }
    }, [dealerHandSum, dealerArrHandValues]);

    function compareHands(){
        
        if(playerHandSum > dealerHandSum || dealerHandSum > 21){
            addChat(["Dealer Lost and Player Won",...chat])
            setGameOver(true);
            setPlayerWon(true);
            setBananas(bananas => bananas + (playerBet*2))
        }else{
            
            addChat(["Player Lost and Dealer Won",...chat])
            setGameOver(true);
            setDealerWon(true);
        }
    }

    async function get2CardsToPlayerAndDealer(){
        // Draw 2 Cards, assign to Player
        axios.get<ICards>('https://www.deckofcardsapi.com/api/deck/bx1eu5s07ggj/draw/?count=2')
            .then(response => {
                console.log("Player response.data: ");
                console.log(response.data);
                const currentCards = response.data.cards;
                const cardValue1 = getCardValue(String(currentCards[0].value));
                const cardValue2 = getCardValue(String(currentCards[1].value));

                // add card values to player array
                setplayerArrHandValues(old => [...old, cardValue1]);
                setplayerArrHandValues(old => [...old, cardValue2]);
                setplayerArrCardCodes(old => [...old, currentCards[0].code]);
                setplayerArrCardCodes(old => [...old, currentCards[1].code]);


                // evaluate player's hand sum value
                setPlayerHandSum(oldSum => oldSum + cardValue1);
                setPlayerHandSum(oldSum => oldSum + cardValue2);

                // toggle player's 1st turn state
                setTurn1(true);

                console.log("Completed Player 2 Cards at Start");
                console.log("playerHandSum = " + playerHandSum + "; playerArrHandValues = ");
                console.log(playerArrHandValues);
            })

        // Draw 2 Cards, assign to Dealer
        axios.get<ICards>('https://www.deckofcardsapi.com/api/deck/bx1eu5s07ggj/draw/?count=2')
            .then(response => {
                console.log("Dealer response.data: ");
                console.log(response.data);
                const currentCards = response.data.cards;
                const cardValue1 = getCardValue(String(currentCards[0].value));
                const cardValue2 = getCardValue(String(currentCards[1].value));

                // add card values to dealer array
                setDealerArrHandValues(old => [...old, cardValue1]);
                setDealerArrHandValues(old => [...old, cardValue2]);
                setDealerArrCardCodes(old => [...old, currentCards[0].code]);
                setDealerArrCardCodes(old => [...old, currentCards[1].code]);


                // evaluate and add to dealer's hand sum value
                setDealerHandSum(oldSum => oldSum + cardValue1);
                setDealerHandSum(oldSum => oldSum + cardValue2);

                console.log("Completed Player 2 Cards at Start");
                console.log("dealerHandSum = " + dealerHandSum + "; dealerArrHandValues = ");
                console.log(dealerArrHandValues);
            })
    }

    /**
     * Return number card value from string
     * @param cardValue 
     * @returns 
     */
    function getCardValue(cardValue:string){
        if(cardValue === "ACE"){
            return 11;
        } else if(cardValue === "JACK"){
            return 10;
        } else if(cardValue === "QUEEN"){
            return 10;
        } else if(cardValue === "KING"){
            return 10;
        } else{
            return Number(cardValue);
        }
    }

    /**
     * Checks given hand sum if it's over BlackJack
     * @param handSum 
     * @returns 
     */
    function checkHandSumOver21(handSum:number){
        if(handSum > 21){
            return true;
        } else {
            return false;
        }
    }

    /**
     * Checks given hand if an Ace is present or not
     * @param handCardDeck 
     * @returns 
     */
    function checkAceInHand(handCardDeck:number[]){
        for(let cardValue of handCardDeck){
            if(cardValue === 11){
                return true;
            }
        }
        return false;
    }

    function checkAceInHandPlayer(){
        for(var i=0; i < playerArrHandValues.length; i++){
            if(playerArrHandValues[i] === 11){
                return true;
            }
        }
        return false;
    }

    function checkAceInHandDealer(){
        for(var i=0; i < dealerArrHandValues.length; i++){
            if(dealerArrHandValues[i] === 11){
                if(dealerHandSum > 21){
                    dealerArrHandValues[i] = 1;
                }
                
                return true;
            }
        }
        return false;
    }

    /**
     * Turns the Ace in hand from 11 to 1, and string ACE to ACE-10
     * @param handCardDeck 
     * @returns 
     */
    function adjustIfAceInHand(handCardDeck:number[]){
        let newHandCardDeck = [];
        
        for(let cardValue of handCardDeck){
            if(cardValue === 11){
                newHandCardDeck.push(1);
            } else{
                newHandCardDeck.push(cardValue);
            }
        }
        return newHandCardDeck;
    }

    function adjustIfAceInHandPlayer(){
        
        let newHandCardDeck = [];
        
        for(var i=0; i < playerArrHandValues.length; i++){
            if(playerArrHandValues[i] === 11){
                newHandCardDeck.push(1);
            } else{
                newHandCardDeck.push(playerArrHandValues[i]);
            }
        }

        setplayerArrHandValues(newHandCardDeck);
    }

    function adjustIfAceInHandDealer(){
        
        let newHandCardDeck = [];
        
        for(var i=0; i < dealerArrHandValues.length; i++){
            if(dealerArrHandValues[i] === 11){
                newHandCardDeck.push(1);
            } else{
                newHandCardDeck.push(dealerArrHandValues[i]);
            }
        }

        setDealerArrHandValues(newHandCardDeck);
    }

    /**
     * Reshuffle Deck id: bx1eu5s07ggj
     * 1) When Game starts
     * 2) beginning of every game
     */
    function reshuffleDeck(){
        axios.get('https://www.deckofcardsapi.com/api/deck/bx1eu5s07ggj/shuffle/')
            .then(response => {
                console.log(response.data);
        })
    }

    // Default Bet set to minimum bet 5 bannanas
    
    /**
     * Game Starting function:
     *      1) reshuffle Deck, were using deckID: bx1eu5s07ggj
     *      2) Give Player 2 cards
     *      3) Give Dealer 2 cards
     */
    function startGame(){
        
        console.log("=====   Game Has Started!   =====");
        addChat(["===ROUND START===",...chat]);

        setBananas(bananas => bananas - playerBet)

        setGameStart(true);
        reshuffleDeck();

        get2CardsToPlayerAndDealer();
    }

    function resetGame(){
        setplayerArrHandValues([]);
        setplayerArrCardCodes([]);
        setPlayerHandSum(0);
        setDealerArrHandValues([]);
        setDealerArrCardCodes([]);
        setDealerHandSum(0);
        setGameStart(false);
        setGameOver(false);
        setPlayerWon(false);
        setDealerWon(false);
        setDealerTurn(false);
        setTurn1(false);
    }

    /**
     * Logic to display buttons: 
     *      Bet +,-, and Start Game
     *      Hit, Stand
     */
    const displayButtons = (
        <div>
            {gameStart ? 
                    (<div className='dialog'><button onClick={getCard}>Hit</button><button onClick={handleDealerTurn}>Stand</button></div>) : 
                    (<div><SetBet setRealBet={setPlayerBet} /><button onClick={startGame}>Start Game</button></div>)
            }
        </div>
    );

    const displayFirstTurnButtons = (
        <div className="dialog">
                <button onClick={handleDoubleDown}>Double Down</button>
                <button onClick={getCard}>Hit</button>
                <button onClick={handleDealerTurn}>Stand</button>
        </div>
    );

    function realDisplayButtons(){
        if(gameOver){
            return (<div><button onClick={resetGame}>Reset Game</button></div>) 
        } else if(turn1){
            return displayFirstTurnButtons
        } else {
            return displayButtons
        }
    }

    function displayDealerCards(){
        if(gameStart){
            if(dealerTurn){
                return (dealerHandSum > 0 &&
                    dealerArrCardCodes.map(cardCode => (
                        <img src={'https://deckofcardsapi.com/static/img/' + cardCode + '.png'} alt="dealer card back"  className="card" key={cardCode} />)
                    )
                ) 
            } else{
                return (
                    <div className ="dealer-hand">
                        <img src={'https://deckofcardsapi.com/static/img/' + dealerArrCardCodes[0] + '.png'} alt="dealer card back"  className="card" />
                        <img src={back} alt="dealer card back"  className="card" />
                    </div>
                )
                    
            }
        }
    }

    function onCheckConsole(e:any){
        e.preventDefault();

        console.log("playerArrHandValues: " + playerArrHandValues);
        console.log("playerHandSum: " + playerHandSum);
        console.log("dealerArrHandValues: " + dealerArrHandValues);
        console.log("dealerHandSum: " + dealerHandSum);
        
    }
    
    /**
     * Return func, Display end result
     */
    return <div className='blackjack'>

    <div className='controls'>
        <div className='userMenu'>
            <img src="https://pluspng.com/img-png/user-png-icon-big-image-png-2240.png" alt="user Icon"/>
            <p>{Props.user.userName}</p>
            <p>Bananas Left: {bananas}</p>
            <input className="userMenuBtn" type="button" value="Return to Game Selection" onClick={()=> {
                Props.setIUser({id:Props.user.id,userName:Props.user.userName,password:Props.user.password,bananas:bananas});
                Props.setGame("")
                }}></input>
        </div>
        <div className='chat'>
            {
            chat?.map((element) => {
                return <p>{element}</p>
            })
            }
        </div>
        <div className='gameControls'>
            <div className='dialog'>
                <p>Dealer:</p>
                {dealerTurn ? <p>{dealerHandSum}</p> : <p>?</p>

                }
                
                <p>Player:</p>
                <p>{playerHandSum}</p>
            </div>
            <div className='dialog'>

                {realDisplayButtons()}

            </div>
    </div>
    </div>
    {/* {
        gameOver &&
        <div className='gameOver'>
            <p>
                GAME OVER!!
            </p>
        </div>
    }
    {
        playerWon &&
        <div className='playerWon'>
            <p>
                {Props.user.userName} WON!!
            </p>
        </div>
    }
    {
        dealerWon &&
        <div className='dealerWon'>
            <p>
            {Props.user.userName} LOST!!
            </p>
        </div>
    } */}
    <div className="table">
        <div className="cards">
            <div className ="dealer-hand" id="dealer-cards">
                {/* Enter Dealer's cards here */}
                {displayDealerCards()}
            </div>
            <div className ="hand" id="cards">
                {/* Enter Player's cards here */}
                {
                    playerHandSum > 0 &&
                    playerArrCardCodes.map(cardCode => (
                        <img src={'https://deckofcardsapi.com/static/img/' + cardCode + '.png'} alt="dealer card back"  className="card" key={cardCode} />)
                    )
                }
            </div>
        </div>
    </div>


        </div>
}

export default Blackjack;