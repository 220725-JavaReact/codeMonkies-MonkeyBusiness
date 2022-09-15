import { useState } from 'react';
import './Blackjack.css'


function Dice({userName}:any){

    const[activeBet, setActiveBet] = useState<boolean>(false);
    const[currentBet, setBet] = useState<number>(0);
    const[choice, setChoice] = useState<number>(0);
    const[betting, setBetting] = useState<boolean>(false);
    const[dice1, setDice1] = useState<number>(0);
    const[dice2, setDice2] = useState<number>(0);

    function betAmount(e:any){
        setBet(e.target.value);

    }
    function bet(e:any){
        e.preventDefault();
        setBetting(false);


    }
    function roll(e:any){
        // e.preventDefault();
        console.log("bet : " + currentBet);
        console.log("choice: "+ choice);
        setDice1(Math.ceil(Math.random() * 6));
        setDice2(Math.ceil(Math.random() * 6));
        test();
    }
    function test(){
        console.log(dice1);
        console.log(dice2);
    }

    return <div className='blackjack'>

    <div className='controls'>
        <div className='userMenu'>
            <img src="https://pluspng.com/img-png/user-png-icon-big-image-png-2240.png" alt="user Icon"/>
            <p>{userName}</p>
            <p>Bananas Left: XXX</p>
        </div>
        <div className='gameControls'>
            

            {!activeBet
                && <div className='dialog'>
                <button id='btn1' onClick={() => {setActiveBet(true); setBetting(true)}}>BET</button>
                <button onClick={() => setActiveBet(false)}>QUIT</button>
                </div>
               }
            {betting
                && <div className='dialog'>
                <form onSubmit={(e) =>bet(e)}>
                <input className="bet" type="number" onChange={betAmount} placeholder="BET AMOUNT"></input>
                </form>
                <button onClick={() => setActiveBet(false)}>QUIT</button>
                </div>
               }
            {(!betting && currentBet >0) &&
            <div className='dialog'>
                <input className="bet" type="number" onChange={(e) => setChoice(parseInt(e.target.value))} placeholder="GUESS 2-12"></input>
                <button onClick={roll}>ROLL</button>
                </div>
            }
            {
                
            }
            
            {/* </div> */}
    </div>
    </div>
    <div className="table">
        <div></div>
        <div className='dice'>
            <div>
                {dice1 >= 1
                && <div className='dot'>
                </div>
                }
                {dice1 >= 2 &&
                <div className='dot'>
                </div>
                }
                {dice1 >= 2 &&
                <div className='dot'>
                </div>
                }
            <div className='dot'>
            </div>
            </div>
        </div>
        <div className='dice'>
            <div className=''>
            <div className='dot'>
            </div>
            {/* <div className='dot'>
            </div>
            <div className='dot'>
            </div>
            <div className='dot'>
            </div>
            <div className='dot'>
            </div>
            <div className='dot'>
            </div> */}
            </div>
        </div>
        <div></div>
    </div>


        </div>
}
export default Dice;