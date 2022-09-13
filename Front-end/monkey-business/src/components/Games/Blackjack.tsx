import './Blackjack.css'
import back from '../../images/BananaBack.png';

function Blackjack(){

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
            <button>BET</button>
            <button>QUIT</button>
             {/* <button>DOUBLE DOWN</button>
            <button>SPLIT</button> */}
            </div>
    </div>
    </div>
    <div className="table">
        <div className="cards">
            <div className ="dealer-hand" id="dealer-cards">
            <img src='https://deckofcardsapi.com/static/img/4H.png' alt="dealer card back"  className="card"/>
            <img src={back} alt="dealer card back"  className="card dealer-card"/>
            </div>
            <div className ="hand" id="cards">
                <img src='https://deckofcardsapi.com/static/img/6D.png' alt="dealer card back"  className="card"/>
                <img src='https://deckofcardsapi.com/static/img/7H.png' alt="dealer card back" className="card"/>
                <img src='https://deckofcardsapi.com/static/img/7H.png' alt="dealer card back" className="card"/>
                <img src='https://deckofcardsapi.com/static/img/7H.png' alt="dealer card back" className="card"/>
            </div>
        </div>
    </div>


        </div>
}
export default Blackjack;