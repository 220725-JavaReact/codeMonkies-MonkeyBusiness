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
        <div className="menu">
            <button className="menuBtn" onClick={(e)=>setGame("Blackjack")}>Blackjack</button>
            <button className="menuBtn">Coming Soon</button>
            <button className="menuBtn" onClick={(e)=>setGame("Dice")}>Dice</button>
            <button className="menuBtn">Coming Soon</button>
        </div>
        <button onClick={(e)=>setLog(false)}>Log Out</button>
    </div>
}
export default Menu;