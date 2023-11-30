import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Attendance from "../components/Attendance";
import Header from "../components/Header";
import StudyList from "../components/StudyList";
import AdminNavBox from "../components/AdminNavBox"

const TDBox = styled.div`
  display: flex;
`;
const Admin = () => {
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
    <div>
      <Header
        leftText={"Leets Garden"}
        middleText={"새싹 키우기"}
        nickName={"front"}
      />
      <StudyList />
      {windowWidth <= 1200 && (
        <TDBox>
          <Attendance />
        </TDBox>
      )}
      {windowWidth > 1200 && (
        <TDBox>
          <AdminNavBox />
          <Attendance />
        </TDBox>
      )}
    </div>
  );
};

export default Admin;
