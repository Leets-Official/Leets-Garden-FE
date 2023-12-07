import React from "react";
import styled from "styled-components";

const StudyBox = styled.div`
    font-family: "Noto Sans KR", sans-serif;
font-weight: 700;
  border-radius: 10px;
  width: 100%;
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
  color: #548d54;
`;

const Content = styled.div`
  padding-top: 32px;
  margin-left: 10px;
  font-size: 24px;

`;


const Study = ({ content }) => {
  return (
    <StudyBox>
      <Title>{content.meetingName}</Title>
      <Content>
        <div>{content.meetingDay}</div>
        <div>{content.meetingPlace}</div>
      </Content>
    </StudyBox>
  );
};
export default Study;