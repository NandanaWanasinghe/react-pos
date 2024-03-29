import React, {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const Login:React.FC = ()=>{

    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');


    const login=async ()=>{
        try{
            const response = await axios.post('http://localhost:3000/api/v1/users/login',{
                email,password
            });

            //==============
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate()+2);

            const cookieValue=encodeURIComponent('token')+'='
                +encodeURIComponent(response.data)+'; expires='+expirationDate.toUTCString()+'; path=/';

            document.cookie=cookieValue;
            console.log(response.data);

            setEmail('');
            setPassword('');

        }catch (e){
            console.log(e)
        }
    }


    return(
        <>
            <br/>
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email"
                                   onChange={(e)=>{setEmail(e.target.value)}}
                                   className='form-control' placeholder='Email here'/>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password"
                                   onChange={(e)=>{setPassword(e.target.value)}}
                                   className='form-control' placeholder='Password here'/>
                        </div>
                    </div>
                    <div className="col-12">
                        <br/>
                        <button className='btn btn-primary col-12' onClick={login}>Login</button>
                        <br/>
                        <br/>
                        <Link to='/signUp' className='btn btn-outline-dark col-12'>Sing Up</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login;