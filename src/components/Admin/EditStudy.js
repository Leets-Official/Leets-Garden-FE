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
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60%;
  column-gap: 2em;
  margin-bottom: 2em;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  row-gap: 1.5em;
  width: 45%;
  height: 70%;
  margin-top: 1em;
`;

const Input = styled.input`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 2em;
  width: 80%;
  height: 30%;
  border: none;
  border-radius: 15px;
  padding-left: 0.5em;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;

const SelectBox = styled.div`
  display: flex;
  width: 45%;
  height: 70%;
  flex-direction: column;
  font-size: 1.5em;
`;

const Select = styled.select`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 1em;
  color: #555555;
  width: 90%;
  height: 90%;
  border: none;
  border-radius: 15px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  margin-top: 10px;
`;

const EditBox = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 15%;
  column-gap: 2em;
  font-size: 1.5em;
`;

const TextxBox = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 50%;
  font-size: 1em;
`;

const Select2 = styled.select`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 1em;
  color: #555555;
  text-align: center;
  width: 50%;
  border: none;
  border-radius: 15px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;

const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 2em;
  width: 100%;
  height: 15%;
`;

const Button = styled.button`
  cursor: pointer;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 2em;
  width: 25%;
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

const Option = styled.option`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  text-align: center;
  border-bottom: 0.3px solid rgba(84, 141, 84, 0.5);
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

const EditStudy = ({ closeModal }) => {
  const [cookies] = useCookies();
  const token = cookies.token;
  const [formData, setFormData] = useState({
    meetingName: "",
    meetingPlace: "",
    meetingDay: "",
    userList: [],
  });
  const [userList, setUserList] = useState([]);
  const [selectedStudy, setSelectedStudy] = useState("");
  const [studyOptions, setStudyOptions] = useState([]);
  const [studyInfo, setStudyInfo] = useState([]);

  useEffect(() => {
    const getStudyOption = async () => {
      try {
        const res = await axios.get("http://3.39.24.69:8080/meeting/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setStudyOptions(res.data);
      } catch (error) {
        console.log(error, "주간 스터디 가져오는데 error발생");
      }
    };
    getStudyOption();
  }, [token]);

  useEffect(() => {
    const getUserList = async () => {
      try {
        const res = await axios.get(
          "http://3.39.24.69:8080/meeting/all-users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setUserList(res.data);
      } catch (error) {
        console.error("유저 리스트 가져오기 오류", error);
      }
    };
    getUserList();
  }, [token]);

  useEffect(() => {
    const getStudyInfo = async () => {
      try {
        const res = await axios.get(
          `http://3.39.24.69:8080/meeting/${selectedStudy}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setStudyInfo(res.data);
        setFormData({
          meetingName: res.data.meetingResponse.meetingName,
          meetingPlace: res.data.meetingResponse.meetingPlace,
          meetingDay: res.data.meetingResponse.meetingDay,
          userList: res.data.meetingResponse.userList,
        });
        console.log(res.data, "이건 해당되는 스터디 정보");
      } catch (error) {
        console.log(error, "스터디 정보 가져오는데 error발생");
      }
    };
    if (selectedStudy) {
      getStudyInfo();
    }
  }, [selectedStudy, token]);
  console.log("formData는", formData);
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
  const EditNewStudy = async (e) => {
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
      const res = await axios.patch(
        `http://3.39.24.69:8080/meeting/${selectedStudy}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log("수정 성공");
      closeModal();
      window.location.reload();
      return res;
    } catch (error) {
      console.error("스터디 수정오류", error);
    }
  };

  const selectStudy = (event) => {
    setSelectedStudy(event.target.value);
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

  return (
    <FormBox>
      <EditBox>
        <TextxBox>수정 할 모임을 선택</TextxBox>
        <Select2 value={selectedStudy} onChange={selectStudy}>
          <Option value="" disabled>
            조회 할 모임 선택
          </Option>
          {studyOptions.map((study) => (
            <Option key={study.id} value={study.id}>
              {study.name}
            </Option>
          ))}
        </Select2>
      </EditBox>
      <Form>
        <InputBox>
          <Input
            type="text"
            name="meetingName"
            placeholder={studyInfo.meetingName}
            value={formData.meetingName}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="meetingPlace"
            placeholder={studyInfo.meetingPlace}
            value={formData.meetingPlace}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="meetingDay"
            placeholder={studyInfo.meetingDay}
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
        <Button onClick={EditNewStudy}>수정하기</Button>
        <Button onClick={closeModal}>닫기</Button>
      </ModalFooter>
    </FormBox>
  );
};

export default EditStudy;
