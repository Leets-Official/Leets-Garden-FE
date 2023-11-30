import React from "react";
import styled from "styled-components";
import Today from "./Today";

const TodayBox = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  justify-content: flex-start;
  align-items: center;
  width: 700px;
  height: 360px;
  margin: 20px;
  padding: 10px;
  row-gap: 25px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.div`
  margin-left: 30px;
  font-size: 35px;
  font-family: "Jua", sans-serif;
  color: #8c8c8c;
`;

const mockStudy = {
  meetingName: "zeroBack FE 스터디",
  meetingPlace: "ai공학관 508호",
  meetingDay: "목요일 17시 30분",
};
const mockStudy2 = {
  meetingName: "Leets 정기 모임",
  meetingPlace: "전자정보도서관 그룹스터디룸C",
  meetingDay: "월요일 17시 30분",
};

const TodayList = () => {
  return (
    <div>
      <Title>
        TODAY
      </Title>
      <TodayBox>
        <Today content={mockStudy} />
        <Today content={mockStudy2} />
      </TodayBox>
    </div>
  );
};
export default TodayList;
