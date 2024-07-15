const Login = ()=>{
    return <form>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username"></input>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password"></input>
        <button>Submit</button>
    </form>
}

export default Login