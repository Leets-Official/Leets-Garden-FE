import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Study from "./Study";

const StyledH2 = styled.h2`
  font-family: "Jua", sans-serif;
  font-size: 50px;
`;
const StyledSlider = styled(Slider)`
  .slick-next:before, .slick-prev:before {
    color: #548d54;
    font-size: 30px;
  }
  .slick-dots li button:before
    {
        font-size: 20px;
        line-height: 20px;
        color: #548d54;
    }
  width: 1700px;
`;

const StudyListBox = styled.div`
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StudyList = () => {
  const studyCnt = 10;
  const settings = {
    arrows: true,
    dots: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "60px",
  };

  const ShowStudies = () => {
    const studies = [];
    let i = 0;
    while (i < studyCnt) {
      studies.push(<Study content={`${i}번째 study`} />);
      i++;
    }
    return studies;
  };
  return (
    <StudyListBox>
      <StyledH2>예정된 스터디 : {studyCnt}개</StyledH2>
      <StyledSlider {...settings} >{ShowStudies()}</StyledSlider>
    </StudyListBox>
  );
};
export default StudyList;
