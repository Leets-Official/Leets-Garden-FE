import React from 'react';
import styled from 'styled-components';

const StyledLoginContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 400px;
    margin-top: 200px;
    margin-bottom: 200px;
    white-space: nowrap;
    text-align: center;
    background: transparent;
    backdrop-filter: blur(10px);
    border-radius: 100px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
    border: 3px solid rgba(255, 255, 255, .2);
    color: rgba(0, 0, 0, 0.7);
    padding: 20px;
    @media screen and (max-width: 1200px) {
        align-items: center;
        width: 400px;
        margin-top: 40px;
        margin-bottom: 30px;
    }
`;

const SubContent = styled.div`
    font-size: 50px;
    font-family: 'Jua', sans-serif;
`;

const MainContent = styled.div`
    font-size: 60px;
    font-family: 'Jua', sans-serif;
`;

const LoginContent = () => {


    return (
        <StyledLoginContent>
            <SubContent>Leets Garden's</SubContent>
            <MainContent>스터디 출석체크</MainContent>
        </StyledLoginContent>
    );
};

export default LoginContent;