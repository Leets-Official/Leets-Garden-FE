import React from 'react';
import styled from 'styled-components'
import Header from '../components/Header';
import LoginContent from '../components/LoginContent';
import LoginForm from '../components/LoginForm';
const StyledLogin = styled.div`
    position: relative;
    padding-left: 300px;
    padding-right: 300px;
    display: flex;
    justify-content: space-evenly;
`;

const BackGround = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background: url('/images/sproutBack.png');
    background-size: cover;
    opacity: 0.5;
`;

const Login = () => {
    return (
        <div>
            <Header leftText={'Leets Garden'}
                middleText={'새싹 키우기'}
            />
            <StyledLogin>
            <BackGround />
                <LoginContent />
                <LoginForm />
            </StyledLogin>
        </div>
    );
};

export default Login;
