import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
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

const StudyListBox = styled.div`
  margin: 20px;
  padding-top: 20px;
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
`;

const mockStudy = {
  meetingName: "ZeroBack FE 스터디",
  meetingPlace: "ai공학관 508호",
  meetingDay: "목요일 17시 30분",
  isattended: true,
};

const StudyList = () => {
  const studyCnt = 10;
  const settings = {
    arrows: true,
    dots: true,
    speed: 600,
    centerMode: true,
    slidesToShow: 3 ,
    slidesToScroll: 1,
  };

  const ShowStudies = () => {
    const studies = [];
    let i = 0;
    while (i < studyCnt) {
      studies.push(<Study content={mockStudy} />);
      i++;
    }
    return studies;
  };
  
  return (
    <StudyListBox>
      <div>
      <StyledSlider {...settings}>{ShowStudies()}</StyledSlider>
      </div>
    </StudyListBox>
  );
};
export default StudyList;
