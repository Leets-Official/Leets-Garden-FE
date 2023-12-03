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
  &:hover {
    background-color: rgba(84, 141, 84, .5);
    color: white;
  }
`;

const AttendanceHeader = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-right: 20px;
`;

const Select = styled.select`
  font-size: 20px;
  height: 25px;
  font-family: "Jua", sans-serif;
  margin-right: 20px;
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
    width: 33%;
`;

const AttendanceCheck = ({ closeModal }) => {
    const [username, setUsername] = useState();
    const [cookies] = useCookies();
    const [studyOption, setStudyOption] = useState([]);
    const [userList, setUserList] = useState([]);
    const [selectedStudy, setSelectedStudy] = useState("");
    const [showUserList, setShowUserList] = useState(false);
    const token = cookies.token;
    const navigate = useNavigate();

    const handleAttendanceCheck = async (e) => {
        e.preventDefault();
        const params = { username: username };
        const res = await axios.get('http://3.39.24.69:8080/meeting/all-users', { withCredentials: true }, {
            headers: {
                Authorization: `Bearer ${cookies.token}`,
            },
        });
        if (res.status === 200) {
            window.alert(res.data.message);
            console.log(res);
            navigate('/admin');
        } else if (res.status == 404) {
            window.alert(res.data.message);
            return;
        }
    }

    const selectStudy = (event) => {
        setSelectedStudy(event.target.value);
    };

    const inquiryStudy = async (e) => {
        const res = await axios.get(`http://3.39.24.69:8080/meeting/${selectedStudy}`);
        setUserList(res.data.userList);
        setShowUserList(true);
    };

    useEffect(() => {
        const getStudyOption = async () => {
            const res = await axios.get('http://3.39.24.69:8080/meeting/all');
            setStudyOption(res.data);
            setSelectedStudy(res.data[0].id);
        }
        getStudyOption();
    }, [token])

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
                            <UserAttendance key={user.id}>{user.username}</UserAttendance>
                            <UserAttendance key={user.id}>{user.roles}</UserAttendance>
                            <Button>출석처리</Button>
                        </AttendanceCol>
                    ))}
                </AttendanceBody>}
        </FormBox>
    );
};

export default AttendanceCheck;