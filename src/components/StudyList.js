import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Study from "./Study";

const StyledSlider = styled(Slider)`
  .slick-next:before,
  .slick-prev:before {
    color: #548d54;
    font-size: 35px;
  }
  .slick-dots li button:before {
    font-size: 20px;
    line-height: 20px;
    color: #548d54;
  }
  width: 1700px;
`;

const Title = styled.div`
  margin-left: 30px;
  font-size: 35px;
  color: #8c8c8c;
  font-family: "Jua", sans-serif;
`;

const StudyListBox = styled.div`
  margin: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
`;

const StudyListBox2 = styled.div`
  display: flex;
  column-gap: 30px;
  justify-content: space-around;
`;
const StudyList = () => {
  const [studyData, setStudyData] = useState([]);
  const [studies, setStudies] = useState([]);
  const settings = {
    arrows: true,
    dots: true,
    speed: 600,
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

  useEffect(() => {
    let i = 0;
    const updatedStudies = [];
    while (i < studyData.length) {
      updatedStudies.push(<Study content={studyData[i].meetingResponse} />);
      i++;
    }
    setStudies(updatedStudies);
  }, [studyData]);

  return (
    <div>
      <Title>스터디 목록</Title>
      <StudyListBox>
        <div>
        {studies.length <= 3 ? (
            <StudyListBox2>{studies}</StudyListBox2>
          ) : (
            <StyledSlider {...settings}>{studies}</StyledSlider>
          )}
        </div>
      </StudyListBox>
    </div>
  );
};
export default StudyList;
