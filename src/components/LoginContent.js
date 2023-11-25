import React from 'react';
import styled from 'styled-components';

const StyledLoginContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 25%;
    margin-top: 200px;
    margin-bottom: 200px;
    white-space: nowrap;
`;

const SubContent = styled.div`
    font-size: 50px;
    font-family: 'Jua', sans-serif;
`;

const MainContent = styled.div`
    font-size: 60px;
    font-weight: bold;
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