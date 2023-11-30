import React from "react";
import styled from "styled-components";

const DashBoardBox = styled.div`
  display: flex;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  width: 1100px;
  height: 360px;
  margin: 20px;
  padding: 10px;
  column-gap: 80px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: "Jua", sans-serif;
`;

const Title = styled.div`
  margin-left: 30px;
  font-size: 35px;
  color: #8c8c8c;
  font-family: "Jua", sans-serif;
`;

const AttendBox = styled.div`
  text-align: center;
  font-size: 50px;
  color: #e2e2e2;
`;

const Percentage = styled.div`
  display: flex;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 250px;
  background-color: #e2e2e2;
  font-size: 80px;
`;

const DashBoard = () => {
  return (
    <div>
      <Title>DASHBOARD</Title>
      <DashBoardBox>
        <AttendBox>
          출석
          <Percentage style={{ color: "#548D54" }}>85%</Percentage>
        </AttendBox>
        <AttendBox>
          지각
          <Percentage style={{ color: "#FFD232" }}>10%</Percentage>
        </AttendBox>
        <AttendBox>
          결석
          <Percentage style={{ color: "#FF4646" }}>2%</Percentage>
        </AttendBox>
      </DashBoardBox>
    </div>
  );
};
export default DashBoard;
