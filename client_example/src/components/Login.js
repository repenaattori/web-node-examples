import { useContext, useState } from "react"
import { TokenContext } from "./Contexts";
import axios from "axios";


export default function Login(){

    const [uname, setUname] = useState('');
    const [pw, setPw] = useState('');

    //Get token from contex
    const {token, setToken} = useContext(TokenContext);

    function login(){
        //Send credentials as form data
        const formData = new FormData();
        formData.append('username', uname);
        formData.append('pw', pw);

        axios.post('/auth/login', formData)
            .then(resp => setToken(resp.data.jwtToken))
            .catch(error => console.log(error.message))

    }

    return(
        <div>
            {token.length !== 0 ? <h2>Logged in</h2> :
            <div>
                <h2>Login</h2>
                <input onChange={e => setUname(e.target.value)}/><br/>
                <input onChange={e => setPw(e.target.value)}/><br/>
                <button onClick={login}>Login</button>
            </div>
        }
        </div>
    )
}