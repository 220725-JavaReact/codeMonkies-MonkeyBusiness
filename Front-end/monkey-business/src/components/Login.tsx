

function Login(){

    return <div className="center">
        The Login Screen
        <form>
        <label htmlFor="email">Email</label>
        <input type="email" name="email"></input>
        <label htmlFor="password">Password</label>
        <input name="password" type="password"></input>
        <input type="submit" ></input>
    </form>

    </div>
}
export default Login;