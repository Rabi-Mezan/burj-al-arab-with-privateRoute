import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import initAuth from "../Firebase/init";

initAuth();

const useFirebase = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, SetPassword] = useState('');
    const [isLogin, setIslogin] = useState(false);
    const [user, setUser] = useState({});
    const [error, setError] = useState('');

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    // create new user sign in using email password
    const createUser = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                setUser(result.user);
                console.log(result.user);
                setUsername();
            })
            .catch(error => {
                setError(error.message);
            })
    }



    const userLogin = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                setUser(result.user);
            })
            .catch(error => {
                setError(error.message);
            })
    }

    // update profile 
    const setUsername = () => {
        updateProfile(auth.currentUser, { displayName: name })
            .then(result => { })
    }

    // sign in with google
    const signInUsingGoogle = () => {
        return signInWithPopup(auth, googleProvider)
    }

    // observe user
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
        })
    }, [])

    // logout

    const logOut = () => {
        signOut(auth)
            .then(() => {
                setUser({})
            })
    }

    return {
        user,
        error,
        name,
        setName,
        email,
        setEmail,
        password,
        SetPassword,
        isLogin,
        setIslogin,
        createUser,
        userLogin,
        signInUsingGoogle,
        logOut
    }

}

export default useFirebase;