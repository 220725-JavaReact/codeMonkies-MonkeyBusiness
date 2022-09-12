

function Login(){

    return <div className="center">
        <h1>Monkey</h1>
        <form className="login loginCard">
        <label htmlFor="email">Email</label>
        <input type="email" name="email"></input>
        <label htmlFor="password">Password</label>
        <input name="password" type="password"></input>
        <br/>
        <input type="submit" ></input>
    </form>

    </div>
}
export default Login;