import React from "react";
import styled from "styled-components";
import DayStudy from "./DayStudy";
const DaysBox = styled.div`
  display: flex;
  justify-content: space-around;
`;
const mockStudy={
    isattended:true,
    place:"ai공학관 508호",
    day:"목요일 17시 30분",
}
const mockStudy2={
    isattended:false,
    place:"전자정보도서관 그룹스터디룸C",
    day:"월요일 17시 30분",
}

const DayStudyList = () => {
  return (
    <DaysBox>
      <DayStudy title={"어제 스터디"} content={mockStudy}/>
      <DayStudy title={"오늘 스터디"} content={mockStudy2}/>
    </DaysBox>
  );
};
export default DayStudyList;
