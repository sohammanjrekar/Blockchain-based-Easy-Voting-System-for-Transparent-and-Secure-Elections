import React from "react";
import Contactus from "./Contactus";
import Feature from "./Feature";

const Login = (props) => {
    return (

<>








        <div className="login-container">
            <h1 className="welcome-message">Welcome to decentralized voting application</h1>
            <button className="login-button" onClick = {props.connectWallet}>Login Metamask</button>
        </div>
        <Contactus/>
        <Feature/>
        </>
    )
}

export default Login;