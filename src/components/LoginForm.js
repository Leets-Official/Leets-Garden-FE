import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Input = styled.input`
    background: transparent;
    font-size: 18px;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin: 10px;
    outline: none;
    border-radius: 15px;
    border: 2px solid rgba(0, 0, 0, .2);
    font-family: 'Jua', sans-serif;
    color: black;
    &::placeholder{
        color: rgba(0, 0, 0, 0.7);
    }
`;

const LoginButton = styled.button`
    color: black;
    background-color: rgba(0, 0, 0, .4);
    border: none;
    border-radius: 15px;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin: 10px;
    font-family: 'Jua', sans-serif;
    font-size: 20px;
    cursor: pointer;
`;

const StyledLoginForm = styled.div`
    background: transparent;
    backdrop-filter: blur(10px);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    width: 22%;
    margin-top: 100px;
    margin-bottom: 100px;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 30px;
    padding-bottom: 30px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
    border: 3px solid rgba(255, 255, 255, .2);
    @media screen and (max-width: 1200px) {
        display: flex;
        flex-direction: column;
        width: 40%;
        margin-top: 30px;
    }
`;

const Text = styled.p`
    font-size: 50px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.7);
    text-align: center;
    margin: 0;
    margin-bottom: 20px;
`

const Image = styled.img`
    width: 70px;
    margin-bottom: 20px;
`;

const LoginForm = () => {

    const navigate = useNavigate();
    
    const userNameRef = useRef();
    const passwordRef = useRef();

    const [userName, setuserName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (userName.length < 1) {
            window.alert('학번을 입력해주세요.')
            userNameRef.current.focus();
            return ;
        }
        if (password.length < 1) {
            window.alert('패스워드를 입력해주세요.')
            passwordRef.current.focus();
            return ;
        }
    }


    return (
        <StyledLoginForm>
            <Text>Login</Text>
            <Input type='text' value={userName} ref={userNameRef} name='username' placeholder='username' onChange={(e) => { setuserName(e.target.value) }} />
            <Input type='password' value={password} ref={passwordRef} name='password' placeholder='password' onChange={(e) => { setPassword(e.target.value) }} />
            <LoginButton onClick={handleSubmit}>Login</LoginButton>
        </StyledLoginForm>
    );
};

export default LoginForm;