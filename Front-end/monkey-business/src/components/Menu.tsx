import { UserLog } from "../models/UserLog";
import Blackjack from "./Games/Blackjack";

interface Props {
    game:string;
    setGame:React.Dispatch<React.SetStateAction<string>>;
}

interface ICombined extends Props, UserLog{
}

function Menu({isUserLoggedIn, setLog, game, setGame}:ICombined){
    return <div className="center">
            <div className='controls'>
        <div className='userMenu'>
            <img src="https://pluspng.com/img-png/user-png-icon-big-image-png-2240.png" alt="user Icon"/>
            <p>Username</p>
            <p>Bananas Left: XXX</p>
            <button onClick={(e)=>setLog(false)}>Log Out</button>
        </div>
    </div>
        <div className="menu">
            <button className="menuBtn" onClick={(e)=>setGame("Blackjack")}>Blackjack</button>
            <button className="menuBtn">Coming Soon</button>
            <button className="menuBtn" onClick={(e)=>setGame("Dice")}>Dice</button>
            <button className="menuBtn">Coming Soon</button>
        </div>
    </div>
}
export default Menu;