import React from "react";
import styled from "styled-components";
import DashBoard from "../components/DashBoard";
import Header from "../components/Header";
import StudyList from "../components/StudyList";
import TodayList from "../components/TodayList";

const TDBox = styled.div`
    display: flex;
`
const Main = () => {
  return (
    <div>
      <Header
        leftText={"Leets Garden"}
        middleText={"새싹 키우기"}
        nickName={"front"}
      />
      <StudyList/>
      <TDBox>
        <TodayList/>
        <DashBoard/>
      </TDBox>
    </div>
  );
};

export default Main;
