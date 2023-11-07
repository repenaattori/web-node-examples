import { jwtToken, userInfo } from "./Signals";


/**
 * This example components retrieves the user data from the server if the user is logged in
 * Bearer token is set in axios defaults in AuthorizationExample.js
 */
export default function PersonalData(){
    return (
        <div>
            {userInfo.value === null ? <h2>No authorized personal data</h2>:
                <div>
                    <h2>{userInfo.value.personalData}</h2>
                    <button onClick={()=> jwtToken.value = ''}>Logout</button>
                </div> 
            }
        </div>
    )
}