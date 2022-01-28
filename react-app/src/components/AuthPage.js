import SignUpForm from "./auth/SignUpForm"
import LoginForm from "./auth/LoginForm"
import styled from "styled-components";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const Content = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
        width: 200px;
        position: fixed;
        top: 80px;
    }
`

const FormBox = styled.div`
    filter: drop-shadow(2px 4px 4px rgba(0, 0, 0, 0.5));

    #tab-holder {
        display: flex;
    }

    .tab {
        color: white;
        background-color: #333;
        border: 1px solid black;
        border-bottom: 0px solid white;
        margin-bottom: -1px;
        font-size: 20px;
        padding-left: 10px;
        padding-right: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        height: 45px;
        z-index: 1;
    }

    #active {
        background-color: white;
        color: black;
        z-index: 3;
        cursor: default;
    }

    #form-container {
        padding: 50px;
        border: 1px solid black;
        background-color: white;
        z-index: 2;
    }
`

function AuthPage() {
    const user = useSelector(state => state.session.user);
    const [isSignUp, setIsSignUp] = useState(false);

    return (
        <>
            {user ?
                <Redirect to="/"/> :
                <Content>
                    <FormBox>
                        <div id="tab-holder">
                            <div className="tab" id={isSignUp ? "active" : ""} onClick={() => setIsSignUp(true)}><div>Register</div></div>
                            <div className="tab" id={isSignUp ? "" : "active"} onClick={() => setIsSignUp(false)}><div>Login</div></div>
                        </div>
                        <div id="form-container">
                            {isSignUp ? <SignUpForm /> : <LoginForm />}
                        </div>
                    </FormBox>
                </Content>
            }
        </>
    )
}

export default AuthPage;
