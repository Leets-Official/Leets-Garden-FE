import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import styled from "styled-components";

const Title = styled.div`
  font-family: "Jua", sans-serif;
  margin-left: 30px;
  font-size: 35px;
  color: #8c8c8c;
`;

const Box = styled.div`
  font-family: "Jua", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: beige;
  width: 200px;
  height: 150px;
  font-size: 30px;
  border-radius: 14px;
`;
const TodayBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 700px;
  height: 360px;
  border-radius: 10px;
  column-gap: 20px;
  padding: 10px;
  margin: 20px;
  overflow-y: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const AdminNavBox = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Title>스터디 관리</Title>
      <TodayBox>
        <Box>회원추가</Box>
        <Box>회원조회</Box>
        <Box>출석체크</Box>
        <Box>모임생성</Box>
        <Box>모임수정</Box>
        <Box>모임승인</Box>
      </TodayBox>
    </div>
  );
};
export default AdminNavBox;
