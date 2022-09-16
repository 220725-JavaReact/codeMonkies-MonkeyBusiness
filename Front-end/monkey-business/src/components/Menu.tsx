import axios from "axios";
import { IUser } from "../models/User";
import { UserLog } from "../models/UserLog";
import Blackjack from "./Games/Blackjack";

type MenuProps = {
    game:string;
    setGame:React.Dispatch<React.SetStateAction<string>>;
    loginStatus:boolean;
    setLog:React.Dispatch<React.SetStateAction<boolean>>;
    user:IUser;
    setUSer:React.Dispatch<React.SetStateAction<IUser>>
}


function Menu(Props:MenuProps){

    function saveUserStatus(){
        axios.post<IUser>("http://monkeybusiness2-env.eba-6xppmvak.us-east-1.elasticbeanstalk.com/user/new",Props.user)
            .then(response => {
                console.log(response);
            });
    }

    return <div className="center">
            <div className='controls'>
        <div className='userMenu'>
            <img src="https://pluspng.com/img-png/user-png-icon-big-image-png-2240.png" alt="user Icon"/>
            <p>{Props.user.userName}</p>
            <p>Bananas Left: {Props.user.bananas}</p>
            <button onClick={()=>{
                Props.setLog(false); {saveUserStatus()}
            }}>Log Out</button>
        </div>
    </div>
        <div className="menu">
            <button className="menuBtn" onClick={(e)=>Props.setGame("Blackjack")}>Blackjack</button>
            <button className="menuBtn">Coming Soon</button>
            <button className="menuBtn" onClick={(e)=>Props.setGame("Dice")}>Dice</button>
            <button className="menuBtn">Coming Soon</button>
        </div>
    </div>
}
export default Menu;