import { useContext, useEffect, useState } from "react"
import { TokenContext } from "./Contexts"
import axios from "axios";


/**
 * This example components retrieves the user data from the server if the user is logged in
 * Bearer token is set in axios defaults in AuthorizationExample.js
 */
export default function PersonalData(){

    const {token, setToken} = useContext(TokenContext);
    const [data, setData] = useState(null);

    //Retrieving data when mounting or the token has changed to not empty value.
    useEffect(()=>{
        if(token.length !== 0){
            axios.get('/student/personal')
            .then(resp =>{setData(resp.data)})
            .catch(error => console.log(error.message))
        }
    }, [token])

    function logout(){
        setData(null);
        setToken('');
    }

    return (
        <div>
            {data === null ? <h2>No authorized personal data</h2>:
                <div>
                    <h2>{data}</h2>
                    <button onClick={logout}>Logout</button>
                </div> 
            }
        </div>
    )
}