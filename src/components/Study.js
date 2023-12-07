import React from "react";
import styled from "styled-components";

const StudyBox = styled.div`
    font-family: "Noto Sans KR", sans-serif;
font-weight: 700;
  border-radius: 10px;
  width: 70%;
  height: 180px;
  border: 2px solid #dcdcdc;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  margin-bottom: 30px;
  transition: all 0.5s ease;
  align-items: flex-start;
  text-align: center;
  &:hover {
    transform: scale(1.05);
    background-color: white;
    cursor: pointer;
  }
`;

const Title = styled.div`
  font-size: 35px;
  margin-left: 10px;
  margin-top: 10px;
  color: #548d54;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 32px;
  align-items: flex-start;
  margin-left: 10px;
  font-size: 24px;

`;


const Study = ({ content, date }) => {
  return (
    <StudyBox>
      <Title>{content.meetingName}</Title>
      <Content>
        <div>{`${date[1]}월 ${date[2]}일`}</div>
        <div>{content.meetingPlace}</div>
      </Content>
    </StudyBox>
  );
};
export default Study;