import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Today from "./Today";
import { useCookies } from "react-cookie";

const TodayBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  row-gap: 25px;
  width: 700px;
  height: 360px;
  border-radius: 10px;
  margin: 20px;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
`;

const Title = styled.div`
  margin-left: 30px;
  font-size: 35px;
  font-family: "Jua", sans-serif;
  color: #8c8c8c;
`;

const NullBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #8c8c8c;
  font-size: 60px;
  font-family: "Jua", sans-serif;
  margin-top: 20px;
`;

const TodayList = () => {
  const [studyData, setStudyData] = useState([]);
  const [studies, setStudies] = useState([]);
  const [cookies] = useCookies();
  const token = cookies.token;
  useEffect(() => {
    const getStudies = async () => {
      try {
        const res = await axios.get(
          "http://3.39.24.69:8080/meeting-weekly/today",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStudyData(res.data);
        console.log("오늘해당되는거 가져오기 결과", res.data);
      } catch (error) {
        console.error("스터디 오늘자 오류 발생:", error);
      }
    };
    getStudies();
  }, []);

  useEffect(() => {
    const updatedStudies = studyData.map((study) => (
      <Today key={study.meetingResponse.id} content={study.meetingResponse} />
    ));
    setStudies(updatedStudies);
  }, [studyData]);
  return (
    <div>
      <Title>오늘 스터디 목록</Title>
      <TodayBox>{studies.length > 0 ? (
          studies
        ) : (
          <NullBox>오늘은 스터디 없는 날</NullBox>
        )}</TodayBox>
    </div>
  );
};
export default TodayList;
