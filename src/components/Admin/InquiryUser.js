import React, { useRef, useState } from 'react';
import styled from "styled-components";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';

const FormBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`

const Form = styled.form`
  display: flex;
  justify-content: end;
  align-items:center;
  column-gap: 20px;
  height: 20%;
`

const Input = styled.input`
    font-family: "Jua", sans-serif;
    font-size: 30px;
    width: 400px;
    height: 80%;
    padding-left: 20px;
    padding-right: 20px;
    border: none;
    border-radius: 15px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`

const ModalFooter = styled.div`
  display: flex;
  align-items:end;
  justify-content: center;
  column-gap: 120px;
  width: 80%;
  height: 20%;
`;
const Button = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Jua", sans-serif;
  font-size: 25px;
  width: 50%;
  height: 70%;
  border: none;
  border-radius: 14px;
  color: rgba(84, 141, 84, .5);
  padding-left: 10px;
  padding-right: 10px;
  transition: all 1s ease;
  &:hover {
    background-color: rgba(84, 141, 84, .5);
    color: white;
  }
`;

const User = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    font-size: 30px;
    height: 15%;
`;

const UserInfo = styled.div`

`;

const InquiryUser = ({ closeModal }) => {
    const [username, setUsername] = useState();
    const [cookies] = useCookies();
    const [showInquiry, setShowInquiry] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const navigate = useNavigate();
    const usernameRef = useRef();
    const token = cookies.token;

    const handleInquiryUser = async (e) => {
        e.preventDefault();

        if (!username) {
            window.alert('username을 입력하세요.');
            usernameRef.current.focus();
            return;
        }

        const params = { username: username };
        const res = await axios.get('http://3.39.24.69:8080/users', {
            params,
            validateStatus: false,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(res);
        if (res.status === 200) {
            window.alert(res.data.message);
            setUserInfo(res.data);
            setShowInquiry(true);
        } else if (res.status === 404) {
            window.alert(res.data.message);
            usernameRef.current.focus();
            return;
        }
    }

    return (
        <FormBox>
            <Form>
                <Input ref={usernameRef} placeholder="학번" onChange={(e) => setUsername(e.target.value)} />
                <Button onClick={handleInquiryUser}>조회</Button>
            </Form>
            {showInquiry &&
                <User>
                    <UserInfo>{userInfo.username}</UserInfo>
                    <UserInfo>{userInfo.name}</UserInfo>
                    <UserInfo>{userInfo.fieldType}</UserInfo>
                    <UserInfo>{userInfo.roles}</UserInfo>
                </User>
            }
            <ModalFooter>
                <Button onClick={closeModal}>닫기</Button>
            </ModalFooter>
        </FormBox>
    );
};

export default InquiryUser;