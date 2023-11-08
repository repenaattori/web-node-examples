import axios from "axios";
import { useEffect, useState } from "react";

export default function Students(){

    const [students, setStudents] = useState([]);


     //Retrieving data when mounting this component
     useEffect(()=>{
        axios.get('/student')
            .then(resp =>{setStudents(resp.data)})
            .catch(error => console.log(error.message));
    },[]);

    return(
        <ul>
            {
                students.map( student => <li key={student.username}>{student.fname} {student.lname}</li>)
            }
        </ul>
    );
}