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
        color: black;
        background-color: white;
        border: 1px solid black;
        border-bottom: none;
        font-size: 20px;
        padding: 10px;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
    }

    #active {
        background-color: #407BA7;
        border: 1px solid black;
        border-bottom: none;
        color: white;
        cursor: default;
    }

    #form-container {
        padding: 50px;
        border: 1px solid black;
        background-color: white;
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
