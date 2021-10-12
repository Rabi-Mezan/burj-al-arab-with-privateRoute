import userEvent from '@testing-library/user-event';
import React, { useContext, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useFirebase from '../../hooks/useFirebase';
import './Login.css'


const Login = () => {
    const location = useLocation();
    const history = useHistory();
    const redirectUrl = location.state?.from;


    const { user, setName, email, password, setEmail, SetPassword, isLogin, setIslogin, createUser, userLogin, signInUsingGoogle } = useAuth();


    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        SetPassword(e.target.value);
    }

    const toggleCheckBox = (e) => {
        setIslogin(e.target.checked);
    }


    const handleRegister = (e) => {
        e.preventDefault();
        isLogin ? userLogin(email, password) : createUser(email, password);
    }





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
                <h3>Please {isLogin ? "Login" : "Register"} Here</h3>
                <form onSubmit={handleRegister}>
                    {!isLogin && <p>Name <br /><input onBlur={handleName} type="text" name="" placeholder='your name' required /></p>}
                    <p>Email <br /><input onBlur={handleEmail} type="email" name="" placeholder='your email' required /></p>
                    <p>Password <br /> <input onBlur={handlePassword} type="password" name="" placeholder='your password' required /></p>
                    <span>Existing User ?  <input onChange={toggleCheckBox} type="checkbox" name="Existing User" id="" /></span>
                    <button
                        type="submit">{isLogin ? 'Login' : 'Register'}
                    </button>
                </form>
                {
                    !user.email &&
                    <div className='register'>
                        <h5>
                            New User ?
                            <small>
                                <Link to='/register'>Create Account</Link></small>
                            <br />
                            <button onClick={handleGoogleSignIn}>
                                <i className="fab fa-google-plus-g">
                                </i>Google Sign In
                            </button>
                        </h5>
                    </div>
                }
            </div>

        </div>
    );
};

export default Login;