import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Attendance from "../components/Attendance";
import Header from "../components/Header";
import StudyList from "../components/StudyList";
import AdminNavBox from "../components/AdminNavBox"

const AdminBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const TDBox = styled.div`
  display: flex;
  width: 100%;
  height: 60%;
  column-gap: 1em;
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
    <AdminBox>
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
          <AdminNavBox />
          <Attendance />
        </TDBox>
      )}
    </AdminBox>
  );
};

export default Admin;
