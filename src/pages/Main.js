import { useEffect, useState } from "react";
import styled from "styled-components";
import Attendance from "../components/Attendance";
import Header from "../components/Header";
import StudyList from "../components/StudyList";
import TodayList from "../components/TodayList";

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const TDBox = styled.div`
  display: flex;
  width: 100%;
  height: 60%;
  column-gap: 40px;
`;
const Main = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <MainBox>
      <Header
        leftText={"Leets Garden"}
      />
      <StudyList />
      {windowWidth <= 1200 && (
        <TDBox>
          <Attendance />
        </TDBox>
      )}
      {windowWidth > 1200 && (
        <TDBox>
          <TodayList />
          <Attendance />
        </TDBox>
      )}
    </MainBox>
  );
};

export default Main;
