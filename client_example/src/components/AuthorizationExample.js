import { useEffect, useState } from 'react';
import {TokenContext} from './Contexts';
import Login from './Login';
import PersonalData from './PersonalData';
import axios from 'axios';

export default function AuthorizationExample() {

  //Login is controlled by using token that is saved to session storage.
  const [token, setToken] = useState(()=>{
    const t = sessionStorage.getItem('token');
    return t===null || t==='null' ? '' : t;
  });

  //Setting token for axios headers as default
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

  //Saving token to sessionstorage if it changes
  useEffect(()=>{
    sessionStorage.setItem('token', token);
  },[token]);

  return (
    <TokenContext.Provider value={{token,setToken}}>
        <Login/>
        <PersonalData/>       
    </TokenContext.Provider>
  );
}
