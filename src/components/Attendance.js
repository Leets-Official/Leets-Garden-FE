import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

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
  column-gap: 10px;
  font-size: 22px;
  color: #8c8c8c;
`;

const DateBox = styled.div`
  display: flex;
  border-radius: 13px;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  color: black;
  background-color: #e2e2e2;
  font-size: 10px;
`;

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
      }
    };
    getStudyOption();
  }, []); 

  useEffect(() => {
    let id = selectedStudy
    const getAttendance = async () => {
      try {
        const res = await axios.get(`http://3.39.24.69:8080/meeting-weekly/all/${id}`);
        setAttendanceData(res.data);
      } catch (error) {
      }
    };
    getAttendance();
  }, [selectedStudy]);

  const handleStudyChange = (event) => {
    setSelectedStudy(event.target.value);
  };
  console.log(selectedStudy);
  
  return (
    <div>
      <Title>출석현황</Title>
      <AttendanceBox>
        <Select value={selectedStudy} onChange={handleStudyChange}>
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
                <DateBox>{attendance.attendanceDetailsList[0].meetingDate}</DateBox>
                {}
              </EachAttendance>
            ))}
          </AllAttendances>
        )}
      </AttendanceBox>
    </div>
  );
};
export default Attendance;
