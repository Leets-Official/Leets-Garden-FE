import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Study from "./Study";

const ListBox = styled.div`
  width: 98%;
  height: 35%;
`;

const StyledSlider = styled(Slider)`
  display: flex;
  width: 94%;
  height: 100%;
  .slick-next:before,
  .slick-prev:before {
    display: flex;
    justify-content: center;
    color: #548d54;
    font-size: 30px;
  }
  .slick-dots li button:before {
    font-size: 20px;
    line-height: 20px;
    color: #548d54;
  }
  margin-top: 1em;
`;

const Title = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 2.5em;
  height: 20%;
  margin-left: 0.5em;
  color: #8c8c8c;
`;

const StudyListBox = styled.div`
  margin:1em;
  display: flex;
  width: 100%;
  height: 80%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  text-align: center;
`;

const StudyListBox2 = styled.div`
  display: flex;
  width: 90%;
  height: 90%;
  column-gap: 30px;
  justify-content: space-around;
`;

const NullBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 90%;
  color: #8c8c8c;
  font-size: 60px;
  margin-top: 30px;
  margin-bottom: 30px;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
`;

const StudyList = () => {
  const [studyData, setStudyData] = useState([]);
  const [studies, setStudies] = useState([]);
  const settings = {
    arrows: true,
    dots: true,
    speed: 600,
    centerMode: true,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  useEffect(() => {
    const getStudies = async () => {
      try {
        const res = await axios.get("http://3.39.24.69:8080/meeting-weekly");
        setStudyData(res.data);
      } catch (error) {
        console.error("스터디 전체 조회 오류 발생:", error);
      }
    };
    getStudies();
  }, []);
  console.log(studyData);

  useEffect(() => {
    let i = 0;
    const updatedStudies = [];
    while (i < studyData.length) {
      updatedStudies.push(
        <Study
          content={studyData[i].meetingResponse}
          date={studyData[i].meetingDate}
        />
      );
      i++;
    }
    setStudies(updatedStudies);
  }, [studyData]);

  return (
    <ListBox>
      <Title>전체 모임 목록</Title>
      <StudyListBox>
        {studies.length > 0 ? (
          studies.length <= 3 ? (
            <StudyListBox2>{studies}</StudyListBox2>
          ) : (
            <StyledSlider {...settings}>{studies}</StyledSlider>
          )
        ) : (
          <NullBox>이런! 예정된 스터디가 없습니다.</NullBox>
        )}
      </StudyListBox>
    </ListBox>
  );
};
export default StudyList;
