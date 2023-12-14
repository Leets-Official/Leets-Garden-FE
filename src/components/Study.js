import React from "react";
import styled from "styled-components";

const StudyBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 60%;
  height: 100%;
  border-radius: 10px;
  border: 2px solid #dcdcdc;
  margin-top: 1em;
  margin-bottom: 1em;
  padding: 0.8em;
  font-weight: 700;
  font-family: "Noto Sans KR", sans-serif;
  &:hover {
    cursor: pointer;
  }
`;

const Title = styled.div`
  font-size : 2em;
  color: #548d54;
`;

const Content = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding-top: 1.6em;
  font-size: 1.4em;
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
