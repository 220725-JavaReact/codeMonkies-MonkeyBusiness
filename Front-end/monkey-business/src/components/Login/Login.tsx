import { useState } from 'react';
import {logIn} from '../../App';
import { IUser } from '../../models/User';
import { UserLog } from '../../models/UserLog';
import { Signup } from '../Signup/Signup';

type LoginProps = {
    verify(username:string, password:string, e:React.FormEvent<HTMLFormElement>):void,
    message:string,
    setMessage: React.Dispatch<React.SetStateAction<string>>
}

function Login(Props:LoginProps){
    const[warning, setWarning] = useState<string>();
    const[signup, setSignup] = useState<boolean>(false);
    const defMessage:string = "";
    const[user, setUser] = useState<IUser>({
        userName: "",
        password: "",
        bananas: 0
    });

    function updateUserName(event: any) {
        user.userName = event.target.value;
        setUser(user);
    }

    function updatePassword(event: any) {
        user.password = event.target.value;
        setUser(user);
        console.log(user.password);
    }

    function toggleSignup() : void{
        if(signup){
            setSignup(false);
        } else {
            Props.setMessage("")
            setSignup(true);
        }
        
    }

    if(!signup){
            return <div className="center">
            <h1>Monkey Login</h1>
            <form className="login loginCard" onSubmit={
                (event)=>Props.verify(user.userName, user.password, event)
                
                }>
                <label>Email</label>
                <input required onChange={updateUserName}type="email" name="email"></input>
                <label>Password</label>
                <input required onChange={updatePassword}type="password" name="password"></input><br/>
                <input type="submit" value="Log In"></input><br/>
                <input type="button" value="Need an account? Sign up now!" onClick={toggleSignup}></input>
            </form>
            <p>{Props.message}</p>
        </div>
    } else {
        return <Signup signup={signup} toggleSignup={toggleSignup} message={Props.message} setMessage={Props.setMessage}/>
    }

    
}
export default Login;