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

const SignUpButton = styled.button`
    background-color: #F4FFFF;
    border: none;
    padding-left: 30px;
    padding-right: 15px;
    padding-top: 10px;
    margin-left: 300px;
    font-family: 'Jua', sans-serif;
    font-size: 20px;
    text-align: end;
    cursor: pointer;
`;

const StyledSignUp = styled.div`
    background-color: #F4FFFF;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    width: 30%;
    margin-top: 100px;
    margin-bottom: 200px;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 30px;
    padding-bottom: 100px;
`;

const Image = styled.img`
    width: 70px;
`;

const SignUpForm = () => {

    const navigate = useNavigate();
    
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordCheckRef = useRef();
    const userNameRef = useRef();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [userName, setUserName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email.length < 1) {
            window.alert('이메일을 입력해주세요.')
            emailRef.current.focus();
            return ;
        }
        if (password.length < 1) {
            window.alert('패스워드를 입력해주세요.')
            passwordRef.current.focus();
            return ;
        }
    }


    return (
        <StyledSignUp>
            <Image src='/images/login2.png'/>
            <SignUpButton onClick={() => navigate('/login')}>로그인</SignUpButton>
            <Input type='text' value={email} ref={emailRef} name='email' placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} />
            <Input type='password' value={password} ref={passwordRef} name='password' placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} />
            <Input type='password' value={passwordCheck} ref={passwordCheckRef} name='passwordCheck' placeholder='Password Check' onChange={(e) => { setPasswordCheck(e.target.value) }} />
            <Input type='text' value={userName} ref={userNameRef} name='username' placeholder='UserName' onChange={(e) => { setUserName(e.target.value) }} />
            <LoginButton onClick={handleSubmit}>회원가입</LoginButton>
        </StyledSignUp>
    );
};

export default SignUpForm;