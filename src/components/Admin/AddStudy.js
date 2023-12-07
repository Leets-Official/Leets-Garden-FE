import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useCookies } from "react-cookie";

const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-bottom: 40px;
`;

const Form = styled.form`
  display: flex;
  row-gap: 20px;
  column-gap: 40px;
  margin-bottom: 60px;
`;

const Input = styled.input`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 2em;
  width: 400px;
  height: 80px;
  border: none;
  border-radius: 15px;
  padding-left: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

const Select = styled.select`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 30px;
  color: #555555;
  width: 400px;
  height: 220px;
  border: none;
  border-radius: 15px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  margin-top: 10px;
`;

const SelectBox = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 32px;
  row-gap: 10px;
`;

const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 120px;
  width: 80%;
  height: 15%;
`;

const Button = styled.button`
  cursor: pointer;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 2em;
  width: 30%;
  height: 70%;
  border: none;
  border-radius: 14px;
  color: rgba(84, 141, 84, 0.5);
  transition: all 1s ease;
  &:hover {
    background-color: rgba(84, 141, 84, 0.5);
    color: white;
  }
`;
const Allselect = styled.button`
  cursor: pointer;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  margin-left: 20px;
  font-size: 20px;
  width: 100px;
  height: 30px;
  border: none;
  border-radius: 14px;
  color: black;
  transition: all 1s ease;
  &:hover {
    background-color: rgba(84, 141, 84, 0.5);
    color: black;
  }
`;
const Option = styled.option`
font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  text-align: center;
  border-bottom: 0.3px solid rgba(84, 141, 84, 0.5);
`;

const AddStudy = ({ closeModal }) => {
  const [cookies] = useCookies();
  const token = cookies.token;
  const [userList, setUserList] = useState([]);
  const [formData, setFormData] = useState({
    meetingName: "",
    meetingPlace: "",
    meetingDay: "",
    userList: [],
  });
  console.log(formData);
  useEffect(() => {
    const getUserList = async () => {
      try {
        const res = await axios.get(
          "http://3.39.24.69:8080/meeting/all-users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserList(res.data);
      } catch (error) {
        console.error("유저 리스트 가져오기 오류", error);
      }
    };
    getUserList();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "userList") {
      const selectedOptions = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      setFormData({
        ...formData,
        [name]: selectedOptions,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const selectAll = (e) => {
    e.preventDefault();
    const allNames = userList.map((user) => {
      return user.name;
    });
    console.log("allNames는", allNames);
    setFormData({
      ...formData,
      userList: allNames,
    });
  };

  const addNewStudy = async (e) => {
    e.preventDefault();
    if (
      !formData.meetingName ||
      !formData.meetingPlace ||
      !formData.meetingDay ||
      formData.userList.length === 0
    ) {
      alert("필수 항목을 모두 작성해주세요.");
      return;
    }
    try {
      const res = await axios.post("http://3.39.24.69:8080/meeting", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      closeModal();
      return res;
    } catch (error) {
      console.error("스터디 생성오류", error);
    }
  };

  console.log(userList);
  return (
    <FormBox>
      <Form>
        <InputBox>
          <Input
            type="text"
            name="meetingName"
            placeholder="모임이름"
            value={formData.meetingName}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="meetingPlace"
            placeholder="모임장소"
            value={formData.meetingPlace}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="meetingDay"
            placeholder="모임시간"
            value={formData.meetingDay}
            onChange={handleChange}
          />
        </InputBox>
        <SelectBox>
          <div>
            {" "}
            ctrl누르고 여러 명 선택
            <Allselect onClick={selectAll}>모두 선택</Allselect>
          </div>
          <Select
            name="userList"
            value={formData.userList}
            onChange={handleChange}
            size={5}
            multiple
          >
            {userList.map((user) => (
              <Option key={user.id} value={user.name}>
                {user.name}
              </Option>
            ))}
          </Select>
        </SelectBox>
      </Form>
      <ModalFooter>
        <Button onClick={addNewStudy}>생성하기</Button>
        <Button onClick={closeModal}>닫기</Button>
      </ModalFooter>
    </FormBox>
  );
};

export default AddStudy;
