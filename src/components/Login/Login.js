import React, { useContext } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import useFirebase from '../../hooks/useFirebase';
import './Login.css'


const Login = () => {

    const location = useLocation();
    const history = useHistory();
    const redirectUrl = location.state?.from;


    const { setUser, signInUsingGoogle } = useFirebase();


    const handleGoogleSignIn = () => {
        signInUsingGoogle()
            .then(result => {
                history.push(redirectUrl)
                // setUser(result.user);
            })
    }


    return (
        <div className='login'>
            <div>
                <h3>Login Here</h3>
                <form>
                    <p>Email <br /><input type="email" name="" id="" placeholder='your email' /></p>
                    <p>Password <br /> <input type="password" name="" id="" placeholder='your password' /></p>
                    <button
                        type="submit">Login
                    </button>
                </form>
                <div className='register'>
                    <h5>
                        New User ?
                        <small>
                            <Link to='/register'>Create Account</Link></small>
                        <br />
                        <button onClick={handleGoogleSignIn}>
                            <i class="fab fa-google-plus-g">
                            </i>Google Sign In
                        </button>
                    </h5>
                </div>
            </div>

        </div>
    );
};

export default Login;