import React, { useState } from 'react';
import './_authencation.scss';
import SignupTab from './SignUp';
import SignInTab from './SignIn';

export enum EnumAuTab {
    SIGNIN = "signin",
    SIGNUP = "signup"
}

export default function Authentication() {
    const [currentTab, setCurrentTab] = useState(EnumAuTab.SIGNIN);

    function onChangeTab(newTab: EnumAuTab) {
        setCurrentTab(newTab);
    }

    const isSignin = currentTab === EnumAuTab.SIGNIN;

    return (
        <div className="auth-form" >
            <div className="auth-form-control">
                <div className="auth-form-button">
                    <button 
                        className={`button ${isSignin ? "active" : ''}`}
                        onClick={() => onChangeTab(EnumAuTab.SIGNIN)}>Sign In
                    </button>
                </div>
                <div className="auth-form-button">
                    <button 
                        className={`button ${!isSignin ? "active" : ''}`}
                        onClick={() => onChangeTab(EnumAuTab.SIGNUP)}>Sign Up
                    </button>
                </div>
            </div>
            <div className="auth-form-content">
                {isSignin ? <SignInTab/> : <SignupTab />}
            </div>
        </div>
    )
}
