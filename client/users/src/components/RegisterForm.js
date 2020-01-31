import React, {useState} from "react"
import axios from 'axios'
import {useHistory} from 'react-router-dom'

export const RegisterForm = props => {
    let history = useHistory();
    const [userInfo, setUserInfo] = useState(
        {
            username: "",
            password: ""
        }
    )
    function handleChange(event) {
        setUserInfo({...userInfo, [event.target.name]: event.target.value})
    }
    function handleSignup(event) {
        event.preventDefault();
        axios.post("http://localhost:4000/api/register", userInfo).then(res => {
            sessionStorage.setItem("token", res.data.token)
            history.push("/users")
            console.log(res);
            
        })
        .catch(err => {
            console.log(err)
        })
    }
    return(
        <div>
            <form onSubmit={handleSignup}>
                <p>Username</p>
                <input name="username" type="text" value={userInfo.username} onChange={handleChange}/>
                <input name="password" type="password" value={userInfo.password} onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}