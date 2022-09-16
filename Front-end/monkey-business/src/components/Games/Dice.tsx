import { useState } from 'react';
import { IUser } from '../../models/User';
import './Blackjack.css'

type DiceProps = {
    user:IUser,
    setIUser:React.Dispatch<React.SetStateAction<IUser>>,
    game:string,
    setGame:React.Dispatch<React.SetStateAction<string>>
}


function Dice(Props:DiceProps){

    const[activeBet, setActiveBet] = useState<boolean>(false);
    const[currentBet, setBet] = useState<number>(0);
    const[choice, setChoice] = useState<number>(0);
    const[betting, setBetting] = useState<boolean>(false);
    const[dice1, setDice1] = useState<number>(0);
    const[dice2, setDice2] = useState<number>(0);
    const[d1Class, set1Class]= useState<string>('one');
    const[d2Class, set2Class] = useState<string>('one');
    const[bananas, setBananas] = useState<number>(Props.user.bananas);
    const[background, setBackground] = useState<string>('blackjack');

    function betAmount(e:any){
        setBet(e.target.value);
    }
    function bet(e:any){
        e.preventDefault();
        
        setBetting(false);
    }
    function roll(e:any){
        e.preventDefault();
        let d1 = Math.ceil(Math.random() * 6);
        let d2 = Math.ceil(Math.random() * 6);
        setBananas(bananas - currentBet);
        setDice1(d1);
        setDice2(d2);
        setClass(d1, set1Class);
        setClass(d2, set2Class);
        if(choice === d1 + d2){
            let newbananas = ((currentBet *2) + bananas);
            setBananas(newbananas);
            console.log(newbananas);
            setBackground('blackjackW');
            setTimeout(win, 2000);
        }
    }
    function setClass(num:number,func:Function){
        switch(num){
            case 1:
                func('one');
            break;
            case 2:
                func('two');
            break;
            case 3:
                func('three');
            break;
            case 4:
                func('four');
            break;
            case 5:
                func('five');
            break;
            case 6:
                func('six');
            break;
        }
    }
    function win(){
        setBackground('blackjack');
    }

    return <div className={background}>

    <div className='controls'>
        <div className='userMenu'>
            <img src="https://pluspng.com/img-png/user-png-icon-big-image-png-2240.png" alt="user Icon"/>
            <p>{Props.user.userName}</p>
            <p>Bananas Left: {bananas}</p>
            <input type="button" value="Return to Game Selection" onClick={()=> {
                Props.setIUser({id:Props.user.id,userName:Props.user.userName,password:Props.user.password,bananas:bananas});
                Props.setGame("")
                }}></input>
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
                <form onSubmit={roll}>
                <input className="bet" type="number" onChange={(e) => setChoice(parseInt(e.target.value))}min="2" max="12" placeholder="GUESS 2-12"></input>
                </form>
                <button onClick={() => {setActiveBet(false); setBet(0)}}>QUIT</button>
                </div>
            }
    </div>
    </div>
    <div className="table">
        <div></div>
        <div className='dice'>
            <div className={d1Class}>
                {dice1 >= 1
                && <div className='dot'>
                </div>
                }
                {dice1 >= 2 &&
                <div className='dot'>
                </div>
                }
                {dice1 >= 3 &&
                <div className='dot'>
                </div>
                }
                {dice1 >= 4 &&
                <div className='dot'>
                </div>
                }

                {dice1 >= 5 &&
                <div className='dot'>
                </div>
                }
                {dice1 >= 6 &&
                <div className='dot'>
                </div>
                }
            </div>
        </div>
        <div className='dice'>
            <div className={d2Class}>
            {dice2 >= 1
                && <div className='dot'>
                </div>
                }
                {dice2 >= 2 &&
                <div className='dot'>
                </div>
                }
                {dice2 >= 3 &&
                <div className='dot'>
                </div>
                }
                {dice2 >= 4 &&
                <div className='dot'>
                </div>
                }

                {dice2 >= 5 &&
                <div className='dot'>
                </div>
                }
                {dice2 >= 6 &&
                <div className='dot'>
                </div>
                }
            </div>
        </div>
        <div></div>
    </div>


        </div>
}
export default Dice;