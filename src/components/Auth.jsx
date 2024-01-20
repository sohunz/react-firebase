// Auth.js

import React, { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import "./Auth.css";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.log(err);
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.log(err);
        }
    };

    const logOut = async () => {
        try {
            await signOut(auth);
            console.log("Logged Out");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-input-row">
                <input
                    className="auth-input"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="auth-input"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="auth-buttons-container">
                <button className="auth-button" onClick={signIn}>
                    Sign In
                </button>
                <button className="auth-button" onClick={signInWithGoogle}>
                    Sign In With Google
                </button>
                <button className="auth-button" onClick={logOut}>
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default Auth;
