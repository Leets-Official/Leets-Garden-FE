import React, { useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useCookies } from "react-cookie";

const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Form = styled.form`
  display: flex;
  justify-content: end;
  align-items: center;
  column-gap: 20px;
  height: 20%;
  width: 100%;
  margin-right: 50px;
  margin-top: 10px;
`;

const Input = styled.input`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 20px;
  width: 200px;
  height: 50px;
  padding-left: 20px;
  padding-right: 20px;
  border: none;
  border-radius: 15px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;

const ModalFooter = styled.div`
  display: flex;
  align-items: end;
  justify-content: center;
  height: ${(props) => (props.showInquiry ? "20%" : "100%")};
  width: 100%;
  margin-bottom: 10px;
`;
const Button = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 20px;
  width: 10%;
  height: 70%;
  border: none;
  border-radius: 14px;
  color: rgba(84, 141, 84, 0.5);
  padding-left: 10px;
  padding-right: 10px;
  transition: all 1s ease;
  &:hover {
    background-color: rgba(84, 141, 84, 0.5);
    color: white;
  }
`;

const CloseButton = styled.button`
  cursor: pointer;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 25px;
  width: 20%;
  height: ${(props) => (props.showInquiry ? "60%" : "10%")};
  border: none;
  border-radius: 14px;
  color: rgba(84, 141, 84, 0.5);
`;

const User = styled.div`
  display: flex;
  justify-content: space-evenly;
  text-align: center;
  width: 100%;
  font-size: 30px;
  height: 30%;
`;

const UserInfo = styled.div`
  width: 25%;
`;

const UserForm = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  color: rgba(84, 141, 84, 0.5);
  width: 100%;
  height: 30%;
`;
const InquiryForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 30px;
  height: 100%;
`;

const InquiryUser = ({ closeModal }) => {
  const [username, setUsername] = useState();
  const [cookies] = useCookies();
  const [showInquiry, setShowInquiry] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const usernameRef = useRef();
  const token = cookies.token;

  const handleInquiryUser = async (e) => {
    e.preventDefault();

    if (!username) {
      window.alert("username을 입력하세요.");
      usernameRef.current.focus();
      return;
    }

    const params = { username: username };
    const res = await axios.get("http://3.39.24.69:8080/users", {
      params,
      validateStatus: false,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    if (res.status === 200) {
      setUserInfo(res.data);
      setShowInquiry(true);
    } else if (res.status === 404) {
      window.alert(res.data.message);
      usernameRef.current.focus();
      return;
    }
  };

  return (
    <FormBox>
      <Form>
        <Input
          ref={usernameRef}
          placeholder="학번"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button onClick={handleInquiryUser}>조회</Button>
      </Form>
      {showInquiry && (
        <InquiryForm>
          <UserForm>
            {" "}
            <UserInfo>학번</UserInfo>
            <UserInfo>이름</UserInfo>
            <UserInfo>분야</UserInfo>
            <UserInfo>권한</UserInfo>
          </UserForm>
          <User>
            <UserInfo>{userInfo.username}</UserInfo>
            <UserInfo>{userInfo.name}</UserInfo>
            <UserInfo>{userInfo.fieldType}</UserInfo>
            <UserInfo>{userInfo.roles}</UserInfo>
          </User>
        </InquiryForm>
      )}
      <ModalFooter showInquiry={showInquiry}>
        <CloseButton showInquiry={showInquiry} onClick={closeModal}>
          닫기
        </CloseButton>
      </ModalFooter>
    </FormBox>
  );
};

export default InquiryUser;
