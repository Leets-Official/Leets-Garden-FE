import React from "react";
import styled from "styled-components";

const StudyBox = styled.div`
  border-radius: 10px;
  width: 320px;
  height: 200px;
  background-color: #548d54;
  font-family: "Jua", sans-serif;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  margin-bottom: 15px;
  margin-top: 20px;
  transition: all 0.5s ease;
  &:hover {
    transform: scale(1.05); 
    background-color: #4fa04f;
    cursor: pointer;
  }
`;

const Title = styled.div`
  font-size: 34px;
`;

const Content = styled.div`
  padding-top: 50px;
  font-size: 24px;
`;

const Study = ({ content }) => {
  return (
    <StudyBox>
      <Title>{content}</Title>
      <Content>
        <div >전정도 그룹스터디룸C</div>
        <div>목요일 14:30</div>
      </Content>
    </StudyBox>
  );
};
export default Study;
