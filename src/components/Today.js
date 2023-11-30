import React from "react";
import styled from "styled-components";

const Title = styled.div`
  font-size: 30px;
  color: #8c8c8c;
`;

const TodayBox = styled.div`
  border-radius: 10px;
  width: 650px;
  height: 100px;
  background-color: #dcdcdc;
  font-family: "Jua", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Box = styled.div`
  border-radius: 10px;
  width: 600px;
  height: 100px;
  background-color: #dcdcdc;
  font-family: "Jua", sans-serif;
  display: flex;
  padding-left : 20px;
  padding-right : 20px;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  font-size: 20px;
  display: flex;
  color: #8c8c8c;
`;

const Img = styled.img`
width: 50px;
height: 50px;
filter: opacity(0.1) drop-shadow(0 0 0 #000000);
`

const Today = ({content}) => {
  return (
      <Box>
        <TodayBox>
        <Title>{content.meetingName}</Title>
        <Content>
          <div>{content.meetingPlace}</div>
          <div>{content.meetingDay}</div>
        </Content>
        </TodayBox>
        <Img alt="체크표시" src="images/check.png"/>
      </Box>
  );
};
export default Today;
