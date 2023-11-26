import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Input = styled.input`
    font-size: 18px;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin: 10px;
    border-radius: 5px;
    border: 1px solid green;
    font-family: 'Jua', sans-serif;
`;

const LoginButton = styled.button`
    color: white;
    background-color: #548D54;
    border: none;
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
    background-color: #F4FFFF;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    width: 30%;
    margin-top: 100px;
    margin-bottom: 100px;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 30px;
    padding-bottom: 30px;
`;

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
            <Image src='/images/login2.png'/>
            <Input type='text' value={userName} ref={userNameRef} name='username' placeholder='Username' onChange={(e) => { setuserName(e.target.value) }} />
            <Input type='password' value={password} ref={passwordRef} name='password' placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} />
            <LoginButton onClick={handleSubmit}>로그인</LoginButton>
        </StyledLoginForm>
    );
};

export default LoginForm;