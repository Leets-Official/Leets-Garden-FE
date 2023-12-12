import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Today from "./Today";
import { useCookies } from "react-cookie";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
`;

const Title = styled.div`
  display: flex;
  height: 15%;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 2.5em;
  margin-left: 0.5em;
  margin-top: 1.5em;
  color: #8c8c8c;
`;

const TodayBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  row-gap: 20px;
  width: 100%;
  height: 70%;
  border-radius: 10px;
  margin: 1em;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
`;

const NullBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 2.3em;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  color: #8c8c8c;
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
        console.log("오늘거 가져오기", res.data);
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
    <Box>
      <Title>오늘 모임 목록</Title>
      <TodayBox>
        {studies.length > 0 ? (
          studies
        ) : (
          <NullBox>오늘은 스터디 없는 날</NullBox>
        )}
      </TodayBox>
    </Box>
  );
};
export default TodayList;
