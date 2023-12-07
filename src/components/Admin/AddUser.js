import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 20px;
  height: 80%;
`;

const Input = styled.input`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 20px;
  width: 400px;
  height: 50px;
  padding-left: 20px;
  padding-right: 20px;
  border: none;
  border-radius: 15px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;

const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10%;
  width: 100%;
  margin-bottom: 10px;
  column-gap: 30px;
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
  height: 80%;
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

const AddUser = ({ closeModal }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [fieldType, setFieldType] = useState();
  const [cookies] = useCookies();
  const navigate = useNavigate();

  const handleAddUser = async () => {
    const res = await axios.post(
      "http://3.39.24.69:8080/signup",
      { username, password, name, fieldType },
      { validateStatus: false },
      {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      }
    );
    if (res.status === 200) {
      window.alert(res.data.message);
      navigate("/admin");
    } else if (res.status == 409) {
      window.alert(res.data.message);
      return;
    }
  };

  return (
    <FormBox>
      <Form>
        <Input
          placeholder="학번"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          placeholder="생년월일"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input placeholder="이름" onChange={(e) => setName(e.target.value)} />
        <Input
          placeholder="분야"
          onChange={(e) => setFieldType(e.target.value)}
        />
      </Form>
      <ModalFooter>
        <Button onClick={handleAddUser}>추가</Button>
        <Button onClick={closeModal}>닫기</Button>
      </ModalFooter>
    </FormBox>
  );
};

export default AddUser;
