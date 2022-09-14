import { useState } from 'react';
import {logIn} from '../../App';
import { IUser } from '../../models/User';
import { UserLog } from '../../models/UserLog';


function Login({verify}:any){
    const[warning, setWarning] = useState<string>();

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

    return <div className="center">
        <h1>Monkey Login</h1>
        <form className="login loginCard" onSubmit={
            (e)=>verify(user.userName, user.password)
            
            }>
            <label>Email</label>
            <input onChange={updateUserName}type="email" name="email"></input>
            <label>Password</label>
            <input onChange={updatePassword}type="password" name="password"></input>
            <br/>
            <input type="submit"></input>
        </form>
    </div>
}
export default Login;