import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";

const AttendanceBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  font-family: "Jua", sans-serif;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 1100px;
  height: 360px;
  border-radius: 10px;
  padding: 10px;
  margin: 20px;
  font-size: 30px;
`;

const Title = styled.div`
  margin-left: 30px;
  font-size: 35px;
  color: #8c8c8c;
  font-family: "Jua", sans-serif;
`;

const EachAttendance = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
  font-size: 22px;
  color: #8c8c8c;
`;

const DateBox = styled.div`
  display: flex;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 28px;
  color: ${(props) => (props.isAttended !=='ABSENCE' ? "white" : "black")};
  background-color: ${(props) => (props.isAttended !=='ABSENCE' ? "#548d54" : "#e2e2e2")};
  font-size: 14px;
  padding: 2px;
`;

const Dates = styled.div`
`

const Select = styled.select`
  font-size: 20px;
  font-family: "Jua", sans-serif;
`;
const AllAttendances = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 6px;
  margin: 10px;
`;
const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [studyOptions, setStudyOptions] = useState([]);
  const [selectedStudy, setSelectedStudy] = useState("");

  useEffect(() => {
    const getStudyOption = async () => {
      try {
        const res = await axios.get("http://3.39.24.69:8080/meeting-weekly");
        setStudyOptions(res.data);
      } catch (error) {
        console.log(error, "주간 스터디 가져오는데 error발생");
      }
    };
    getStudyOption();
  }, []);

  useEffect(() => {
    const getAttendance = async () => {
      try {
        const res = await axios.get(
          `http://3.39.24.69:8080/meeting-weekly/all/${selectedStudy}`
        );
        setAttendanceData(res.data);
      } catch (error) {
        console.log(error, "잔디밭 가져오는데 error발생");
      }
    };
    if (selectedStudy) {
      getAttendance();
    }
  }, [selectedStudy]);

  const selectStudy = (event) => {
    setSelectedStudy(event.target.value);
  };

  return (
    <div>
      <Title>출석현황</Title>
      <AttendanceBox>
        <Select value={selectedStudy} onChange={selectStudy}>
          <option value="" disabled>Select a study</option>
          {studyOptions.map((study) => (
            <option key={study.meetingResponse.id} value={study.meetingResponse.id}>
              {study.meetingResponse.meetingName}
            </option>
          ))}
        </Select>
        {selectedStudy && (
          <AllAttendances>
            {attendanceData.map((attendance) => (
              <EachAttendance key={attendance.userId}>
                {attendance.name}
                <Dates>
                  {attendance.attendanceDetailsList.map((details, index) => (
                    <DateBox key={index} isAttended={details.attendanceType}>{moment(details.meetingDate).format("MM.DD")}</DateBox>
                  ))}
                </Dates>
              </EachAttendance>
            ))}
          </AllAttendances>
        )}
      </AttendanceBox>
    </div>
  );
};
export default Attendance;
