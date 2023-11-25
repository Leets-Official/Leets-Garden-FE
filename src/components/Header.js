import React from 'react';
import styled from 'styled-components'


const Header = ({ leftText, middleText, nickName }) => {
    const Header= styled.div`
        display: flex;
        background-color: #548D54;
        color: black;
        justify-content: space-between;
        padding-left: 300px;
        padding-right: 300px;
        padding-top: 30px;
        padding-bottom: 15px;
        align-items: flex-end;
        font-weight: 500;
        font-family: 'Jua', sans-serif;
    `;

    const LeftText = styled.div`
        font-size: 60px;
        width: 450px;
    `;

    const MiddleText = styled.div`
        font-size: 60px;
        width: 450px;
    `;

    const NickName = styled.div`
        font-size: 30px;
        width: 450px;
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