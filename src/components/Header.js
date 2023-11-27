import React from 'react';
import styled from 'styled-components'


const Header = ({ leftText, middleText, nickName }) => {
    const Header = styled.div`
        display: flex;
        background-color: #548D54;
        color: black;
        justify-content: space-evenly;
        white-space: nowrap;
        padding-top: 30px;
        padding-bottom: 15px;
        align-items: flex-end;
        font-weight: 500;
        font-family: 'Jua', sans-serif;
        text-align: center;
    `;

    const LeftText = styled.div`
        font-size: 60px;
        width: 34%;
        margin-left: 5%;

        @media screen and (max-width: 1200px) {
            width: 100%;
            margin-left: 0%;
        }
    `;

    const MiddleText = styled.div`
        font-size: 60px;
        width: 33%;

        @media screen and (max-width: 1200px) {
            width: 0%;
            font-size: 0px;
        }
    `;

    const NickName = styled.div`
        font-size: 30px;
        width: 33%;
        margin-right: 5%;

        @media screen and (max-width: 1200px) {
            width: 0%;
            font-size: 0px;
            margin-right: 0%;
        }
    `;

    const Sprout = styled.img`
        margin-left: 15px;
        width: 40px;
    `;
    return (
        <Header>
            <LeftText>
                {leftText}
                <Sprout src="images/sprout.png" />
            </LeftText>
            <MiddleText>
                {middleText}
            </MiddleText>
            <NickName>
                {nickName}
            </NickName>
        </Header>
    );
};

export default Header;