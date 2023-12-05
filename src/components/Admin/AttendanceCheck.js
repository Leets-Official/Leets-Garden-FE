import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';

const FormBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    row-gap: 20px;
`

const Input = styled.input`
    font-family: "Jua", sans-serif;
    font-size: 40px;
    width: 400px;
    height: 80px;
    padding-left: 20px;
    padding-right: 20px;
    border: none;
    border-radius: 15px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`

const ModalFooter = styled.div`
  display: flex;
  align-items:center;
  justify-content: center;
  column-gap: 120px;
  width: 80%;
  height: 15%;
`;
const Button = styled.button`
  cursor: pointer;
  font-family: "Jua", sans-serif;
  font-size: 25px;
  width: 20%;
  height: 100%;
  border: none;
  border-radius: 14px;
  color: rgba(84, 141, 84, .5);
  transition: all 1s ease;
`;
const CompletedButton = styled.button`
  cursor: pointer;
  font-family: "Jua", sans-serif;
  font-size: 25px;
  width: 20%;
  height: 100%;
  border: none;
  border-radius: 14px;
  background-color: rgba(84, 141, 84, .5);
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
  font-family: "Jua", sans-serif;
  font-size: 25px;
  color: #555555;
  text-align: center;
  width: 300px;
  height:100%;
  border: none;
  border-radius: 15px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;

const AttendanceBody = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 20px;
    border-top: 2px solid rgba(84, 141, 84, .5);
    overflow-y: auto;
`;

const AttendanceCol = styled.div`
    display: flex;
    padding-left: 30px;
    padding-right: 30px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid rgba(84, 141, 84, .5);
    padding-left: 100px;
    padding-top: 20px;
    padding-bottom: 20px;
`;

const UserAttendance = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
`;

const AttendanceCheck = ({ closeModal }) => {
    const [cookies] = useCookies();
    const [studyOption, setStudyOption] = useState([]);
    const [userList, setUserList] = useState([]);
    const [selectedStudy, setSelectedStudy] = useState();
    const [showUserList, setShowUserList] = useState(false);
    const [allData, setAllData] = useState([]);
    const token = cookies.token;
    const navigate = useNavigate();

    const selectStudy = (event) => {
        setSelectedStudy(parseInt(event.target.value));
    };

    const inquiryStudy = () => {
        const filterData = allData.filter((data) => parseInt(selectedStudy) === data.meetingResponse.id);
        setUserList(filterData[0].userAttendanceResponses);
        setShowUserList(true);
    };
    const refreshData = async () => {
        const res = await axios.get('http://3.39.24.69:8080/meeting-weekly');
        setAllData(res.data);
    };
    useEffect(() => {
        if (allData.length > 0) {
            const filterData = allData.filter((data) => parseInt(selectedStudy) === data.meetingResponse.id);
            console.log(filterData[0]?.userAttendanceResponses);
            setUserList(filterData[0]?.userAttendanceResponses);
            setShowUserList(true);
        }
    }, [allData]);

    const attendanceProcess = async (id) => {
        if (window.confirm('출석체크 하시겠습니까?')) {
            const res = await axios.patch(`http://3.39.24.69:8080/attendance/${id}`, { newAttendanceType: "ATTENDANCE" }, {
                validateState: false,
                headers: {
                    Authorization: `Bearer ${cookies.token}`,
                },
            });
            if (res.status === 200) {
                refreshData();
            }
        }
    }
    const absenceProcess = async (id) => {
        if (window.confirm('결석처리 하시겠습니까?')) {
            const res = await axios.patch(`http://3.39.24.69:8080/attendance/${id}`, { newAttendanceType: "ABSENCE" }, { ValidityState: false }, {
                headers: {
                    Authorization: `Bearer ${cookies.token}`,
                },
            });
            if (res.status === 200) {
                refreshData();
            }
        }
    }

    useEffect(() => {
        const getStudyOption = async () => {
            const nameList = [];
            const res = await axios.get('http://3.39.24.69:8080/meeting-weekly');
            setAllData(res.data);
            res.data.forEach(element => {
                const push = {
                    name: element.meetingResponse.meetingName,
                    id: element.meetingResponse.id,
                }
                nameList.push(push);
            });
            setStudyOption(nameList);
            setSelectedStudy(nameList[0].id);
        }
        getStudyOption();
    }, [showUserList, token])

    return (
        <FormBox>
            <AttendanceHeader>
                <Select value={selectedStudy} onChange={selectStudy}>
                    {studyOption.map((study) => (
                        <option key={study.id} value={study.id}>
                            {study.name}
                        </option>
                    ))}
                </Select>
                <Button onClick={inquiryStudy}>조회</Button>
            </AttendanceHeader>
            {showUserList &&
                <AttendanceBody>
                    {userList.map((user) => (
                        <AttendanceCol>
                            <UserAttendance key={user.attendanceId}>{user.name}</UserAttendance>
                            {user.attendanceType === "ABSENCE" ?
                                <Button onClick={() => attendanceProcess(user.attendanceId)}>출석처리</Button> :
                                <CompletedButton onClick={() => absenceProcess(user.attendanceId)}>출석완료</CompletedButton>
                            }
                        </AttendanceCol>
                    ))}
                </AttendanceBody>}
        </FormBox>
    );
};

export default AttendanceCheck;