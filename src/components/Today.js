import React from "react";
import styled from "styled-components";

const Title = styled.div`
  font-size: 28px;
  color: #8c8c8c;
`;
const Box = styled.div`
  border-radius: 10px;
  width: 90%;
  height: 35%;
  background-color: #eeeeee;
  display: flex;
  padding-left : 20px;
  padding-right : 20px;
  align-items: center;
`;

const TodayBox = styled.div`
  border-radius: 10px;
  width: 100%;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Content = styled.div`
  font-size: 20px;
  display: flex;
  column-gap: 10px;
  color: #8c8c8c;
  align-items: center;
`;

const Img = styled.img`
width: 50px;
height: 50px;
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
