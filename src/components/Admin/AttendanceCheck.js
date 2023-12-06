import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useCookies } from "react-cookie";

const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Option = styled.option`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
`;

const ModalFooter = styled.div`
  display: flex;
  align-items: end;
  justify-content: center;
  height: ${(props) => (props.showUserList ? "20%" : "100%")};
  margin-bottom: 10px;
`;
const Button = styled.button`
  cursor: pointer;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 25px;
  width: 20%;
  height: 100%;
  border: none;
  border-radius: 14px;
  color: rgba(84, 141, 84, 0.5);
  transition: all 1s ease;
  background-color: white;
`;
const CloseButton = styled.button`
  cursor: pointer;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 25px;
  width: 20%;
  height: ${(props) => (props.showUserList ? "60%" : "11.5%")};
  border: none;
  border-radius: 14px;
  color: rgba(84, 141, 84, 0.5);
`;

const InquiryButton = styled.button`
  cursor: pointer;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 25px;
  width: 20%;
  height: 100%;
  border: 1.5px solid #ececec;
  border-radius: 14px;
  color: white;
  transition: all 1s ease;
  background-color: rgba(84, 141, 84, 0.5);
`;
const CompletedButton = styled.button`
  cursor: pointer;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 25px;
  width: 20%;
  height: 100%;
  border: none;
  border-radius: 14px;
  background-color: rgba(84, 141, 84, 0.5);
  color: white;
  transition: all 1s ease;
`;

const AttendanceHeader = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-right: 20px;
  column-gap: 20px;
`;

const Select = styled.select`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 25px;
  color: #555555;
  text-align: center;
  width: 300px;
  height: 100%;
  border: none;
  border-radius: 15px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;

const AttendanceBody = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 20px;
  height: 80%;
  overflow-y: scroll;
  margin-bottom: 20px;
`;

const AttendanceCol = styled.div`
  display: flex;
  padding-left: 30px;
  padding-right: 30px;
  justify-content: space-around;
  align-items: center;
  border: none;
  background-color: #ececec;
  border-radius: 30px;
  padding-left: 100px;
  padding-top: 20px;
  padding-bottom: 20px;
  margin: 10px;
`;

const UserAttendance = styled.div`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

const AttendanceCheck = ({ closeModal }) => {
  const [cookies] = useCookies();
  const [studyOption, setStudyOption] = useState([]);
  const [userList, setUserList] = useState([]);
  const [selectedStudy, setSelectedStudy] = useState();
  const [showUserList, setShowUserList] = useState(false);
  const [allData, setAllData] = useState([]);
  const token = cookies.token;

  const selectStudy = (event) => {
    setSelectedStudy(parseInt(event.target.value));
  };

  const inquiryStudy = () => {
    const filterData = allData.filter(
      (data) => parseInt(selectedStudy) === data.meetingResponse.id
    );
    setUserList(filterData[0].userAttendanceResponses);
    setShowUserList(true);
  };
  const refreshData = async () => {
    const res = await axios.get("http://3.39.24.69:8080/meeting-weekly");
    setAllData(res.data);
  };
  useEffect(() => {
    if (allData.length > 0) {
      const filterData = allData.filter(
        (data) => parseInt(selectedStudy) === data.meetingResponse.id
      );
      setUserList(filterData[0].userAttendanceResponses);
    }
  }, [allData]);

  const attendanceProcess = async (id) => {
    if (window.confirm("출석체크 하시겠습니까?")) {
      const res = await axios.patch(
        `http://3.39.24.69:8080/attendance/${id}`,
        { newAttendanceType: "ATTENDANCE" },
        {
          validateState: false,
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      if (res.status === 200) {
        refreshData();
      }
    }
  };
  const absenceProcess = async (id) => {
    if (window.confirm("결석처리 하시겠습니까?")) {
      const res = await axios.patch(
        `http://3.39.24.69:8080/attendance/${id}`,
        { newAttendanceType: "ABSENCE" },
        { ValidityState: false },
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      if (res.status === 200) {
        refreshData();
      }
    }
  };

  useEffect(() => {
    const getStudyOption = async () => {
      const nameList = [];
      const res = await axios.get("http://3.39.24.69:8080/meeting-weekly");
      setAllData(res.data);
      res.data.forEach((element) => {
        const push = {
          name: element.meetingResponse.meetingName,
          id: element.meetingResponse.id,
        };
        nameList.push(push);
      });
      console.log(nameList);
      setStudyOption(nameList);
      setSelectedStudy(nameList[0].id);
    };
    getStudyOption();
  }, [showUserList, token]);

  return (
    <FormBox>
      <AttendanceHeader>
        <Select value={selectedStudy} onChange={selectStudy}>
          {studyOption.map((study) => (
            <Option key={study.id} value={study.id}>
              {study.name}
            </Option>
          ))}
        </Select>
        <InquiryButton onClick={inquiryStudy}>조회</InquiryButton>
      </AttendanceHeader>
      {showUserList && (
        <AttendanceBody>
          {userList.map((user) => (
            <AttendanceCol key={user.attendanceId}>
              <div>
                <UserAttendance>{user.username}</UserAttendance>
                <UserAttendance>{user.name}</UserAttendance>
              </div>
              <UserAttendance>{user.fieldType}</UserAttendance>
              {user.attendanceType === "ABSENCE" ? (
                <Button onClick={() => attendanceProcess(user.attendanceId)}>
                  출석처리
                </Button>
              ) : (
                <CompletedButton
                  onClick={() => absenceProcess(user.attendanceId)}
                >
                  출석완료
                </CompletedButton>
              )}
            </AttendanceCol>
          ))}
        </AttendanceBody>
      )}
      <ModalFooter showUserList={showUserList}>
        <CloseButton showUserList={showUserList} onClick={closeModal}>
          닫기
        </CloseButton>
      </ModalFooter>
    </FormBox>
  );
};

export default AttendanceCheck;
