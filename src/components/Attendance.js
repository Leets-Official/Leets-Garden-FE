import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useCookies } from "react-cookie";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
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

const AttendanceBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  width: 94%;
  height: 70%;
  border-radius: 10px;
  font-size: 2em;
  margin: 0.55em;
  padding: 0.4em;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  `;

  const AllAttendances = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    row-gap: 6px;
    margin: 10px;
  `;
  
  const Select = styled.select`
    font-family: "Noto Sans KR", sans-serif;
    font-weight: 700;
    text-align: center;
    font-size: 0.6em;
    height: 10%;
    border: none;
    border-radius: 15px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  `;
const EachAttendance = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.8em;
  font-size: 0.6em;
  color: #8c8c8c;
  `;

const PersonalBox = styled.div`
  display: flex;
  width: 4em;
`;

const Option = styled.option`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
`;

  const Dates = styled.div`
    display: flex;
    column-gap: 0.2em;
  `;

const DateBox = styled.div`
  display: flex;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  width: 2.5em;
  height: 2em;
  color: ${(props) => (props.isAttended !== "ABSENCE" ? "white" : "black")};
  background-color: ${(props) =>
    props.isAttended !== "ABSENCE" ? "#548d54" : "#e2e2e2"};
  font-size: 0.8em;
  padding: 0.2em;
`;

const DateBoxText = styled.span`
  width: 3em;
  padding: 0.6em;
  color: ${(props) => (props.isAttended !== "ABSENCE" ? "#548d54" : "#e2e2e2")};
  &:hover {
    color: ${(props) =>
      props.isAttended !== "ABSENCE" ? "#e2e2e2" : "#548d54"};
  }
`;



const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [studyOptions, setStudyOptions] = useState([]);
  const [selectedStudy, setSelectedStudy] = useState("");
  const [cookies] = useCookies();
  const token = cookies.token;

  useEffect(() => {
    const getStudyOption = async () => {
      try {
        const res = await axios.get("http://3.39.24.69:8080/meeting/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStudyOptions(res.data);
      } catch (error) {
        console.log(error, "주간 스터디 가져오는데 error발생");
      }
    };
    getStudyOption();
  }, [attendanceData, token]);

  useEffect(() => {
    const getAttendance = async () => {
      try {
        const res = await axios.get(
          `http://3.39.24.69:8080/meeting-weekly/all/${selectedStudy}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAttendanceData(res.data);
      } catch (error) {
        console.log(error, "잔디밭 가져오는데 error발생");
      }
    };
    if (selectedStudy) {
      getAttendance();
    }
  }, [selectedStudy, token]);

  console.log(attendanceData);

  const selectStudy = (event) => {
    setSelectedStudy(event.target.value);
  };

  return (
    <Box>
      <Title>출석 현황</Title>
      <AttendanceBox>
        <Select value={selectedStudy} onChange={selectStudy}>
          <Option value="" disabled>
            조회 할 모임 선택
          </Option>
          {studyOptions.map((study) => (
            <Option key={study.id} value={study.id}>
              {study.name}
            </Option>
          ))}
        </Select>
        {selectedStudy && (
          <AllAttendances>
            {attendanceData.map((attendance) => (
              <EachAttendance key={attendance.userId}>
                <PersonalBox>{attendance.name}</PersonalBox>
                <Dates>
                  {attendance.attendanceDetailsList.map((details, index) => {
                    console.log("details:", details);
                    return (
                      <DateBox key={index} isAttended={details.attendanceType}>
                        <DateBoxText isAttended={details.attendanceType}>
                          {`${details.meetingDate[1]}.${details.meetingDate[2]}`}
                        </DateBoxText>
                      </DateBox>
                    );
                  })}
                </Dates>
              </EachAttendance>
            ))}
          </AllAttendances>
        )}
      </AttendanceBox>
    </Box>
  );
};
export default Attendance;
