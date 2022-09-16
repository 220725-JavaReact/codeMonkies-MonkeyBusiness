import axios from "axios";
import { useState } from "react";
import { IUser } from "../../models/User";


type signupProp = {
    signup:boolean,
    toggleSignup():void,
    message:string,
    setMessage: React.Dispatch<React.SetStateAction<string>>
}

export const Signup = (Props:signupProp) => {

    const[user, setUser] = useState<IUser>({
        userName: "",
        password: "",
        bananas: 10000
    });

    function updateUserName(event: any) {
        user.userName = event.target.value;
        setUser(user);
        console.log(user)
    }

    function updatePassword(event: any) {
        user.password = event.target.value;
        setUser(user);
        console.log(user);
    }

    function back(){
        Props.setMessage("");
        Props.toggleSignup();
    }

    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        //If you don't put this line, it won't work
        event.preventDefault();

        axios.get<IUser>(`http://monkeybusiness2-env.eba-6xppmvak.us-east-1.elasticbeanstalk.com/user/username?username=${user.userName}`)
            .then( response => {
              if(response.data){
                Props.setMessage("User already exists")
              } else {
                axios.post<IUser>("http://monkeybusiness2-env.eba-6xppmvak.us-east-1.elasticbeanstalk.com/user/new",user)
                    .then(response => {
                        console.log(response);
                    });
                Props.setMessage(`User ${user.userName} Successfully Created`)
                Props.toggleSignup();  
              }
            }) 


        //Logic to do a post request and add the pokemon object
        
    }

    return <div className="center">
        <h1>Monkey Signup</h1>
        <form className="login loginCard" onSubmit={(e) => onSubmit(e)}>
            <label>Email</label>
            <input required type="email" onChange={updateUserName}></input>
            <label>Password</label>
            <input required type="input" onChange={updatePassword}></input><br/>
            <input type="submit" value="Finalize Account"></input><br/>
            <input type="button" value="Back" onClick={back}></input>
        </form>
        <p>{Props.message}</p>
    </div>
}