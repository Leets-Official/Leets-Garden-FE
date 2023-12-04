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
  font-family: "Jua", sans-serif;
  font-size: 36px;
  width: 400px;
  height: 80px;
  border: none;
  border-radius: 15px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

const Select = styled.select`
  font-family: "Jua", sans-serif;
  font-size: 30px;
  width: 400px;
  height:220px;
  border: none;
  border-radius: 15px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  margin-top: 10px;
`;

const Select2 = styled.select`
  font-family: "Jua", sans-serif;
  font-size: 25px;
  text-align: center;
  width: 300px;
  height:40px;
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
const EditBox=styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
  font-size: 30px;
  margin-bottom: 20px;
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
  font-family: "Jua", sans-serif;
  font-size: 45px;
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

const Option = styled.option`
text-align: center;
border-bottom: 0.3px solid rgba(84, 141, 84, 0.5);;
`

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
  const [studyOptions, setStudyOptions] = useState([]);
  const [selectedStudy, setSelectedStudy] = useState("");
  const [studyInfo, setStudyInfo] = useState([])

  useEffect(() => {
    const getStudyOption = async () => {
      try {
        const res = await axios.get('http://3.39.24.69:8080/meeting/all',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
        );
        setStudyOptions(res.data);
      } catch (error) {
        console.log(error, "주간 스터디 가져오는데 error발생");
      }
    };
    getStudyOption();
  }, [token]);
  console.log("선택한 스터디의 id",selectedStudy);

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
        const res = await axios.get(`http://3.39.24.69:8080/meeting/${selectedStudy}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        withCredentials: true,
        }
        );
        setStudyInfo(res.data);
      } catch (error) {
        console.log(error, "스터디 정보 가져오는데 error발생");
      }
    };
    getStudyInfo();
  }, [selectedStudy,token]);
  console.log("고른 스터디 정보 가져오기 완료",studyInfo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "userList") {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
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
  console.log("formData는", formData);
  const EditNewStudy = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(`http://3.39.24.69:8080/meeting/${selectedStudy}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      console.log("수정 성공");
      closeModal();
      return res;
    } catch (error) {
      console.error("스터디 수정오류", error);
    }
  };
  const selectStudy = (event) => {
    setSelectedStudy(event.target.value);
  };

  return (
    <FormBox>
      <EditBox>
        수정 할 모임을 선택
        <Select2 value={selectedStudy} onChange={selectStudy}>
          <option value="" disabled>조회 할 모임 선택</option>
          {studyOptions.map((study) => (
            <option key={study.id} value={study.id}>
              {study.name}
            </option>
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
            {" "}
            ctrl누르고 여러 명 선택
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
