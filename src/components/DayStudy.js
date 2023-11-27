import React from "react";
import styled from "styled-components";
const Title = styled.div`
  font-size: 50px;
`;

const StudyBox = styled.div`
  border-radius: 10px;
  width: 480px;
  height: 300px;
  background-color: #548d54;
  font-family: "Jua", sans-serif;
  font-size: 35px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 10px;
  background-color: ${(props) => (props.isattended ? "#4CAF50" : "#aaaaaa")};
  transition: all 0.5s ease;
  &:hover {
    transform: scale(1.05); 
    background-color: ${(props) => (props.isattended ? "#4fa04f" : "#aaaaaa")};
    cursor: pointer;
  }
`;
const Content = styled.div`
  font-size: 35px;
  display: flex;
  flex-direction: column;
  padding-top: 50px;
`;

const DayStudy = ({title,content}) => {
  return (
      <StudyBox isattended={content.isattended}>
        <Title>{title}</Title>
        <Content>
          <div>{content.place}</div>
          <div>{content.day}</div>
          <div>{content.isattended}</div>
        </Content>
      </StudyBox>
  );
};
export default DayStudy;
