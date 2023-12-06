import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Calendar from "react-calendar";
import "../../Calendar.css";
import { useCookies } from "react-cookie";
import styled from "styled-components";

const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-bottom: 40px;
`;

const Input = styled.input`
  font-family: "Jua", sans-serif;
  font-size: 32px;
  text-align: center;
  width: 360px;
  height: 60px;
  margin-top: 20px;
  border: none;
  border-radius: 15px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;

const Select = styled.select`
  font-family: "Jua", sans-serif;
  font-size: 30px;
  color: #555555;
  text-align: center;
  width: 360px;
  height: 40px;
  border: none;
  border-radius: 15px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  margin-top: 10px;
`;

const SelectBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EditBox = styled.div`
  display: flex;
  column-gap: 40px;
  margin-bottom: 20px;
`;

const ColBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
  font-size: 40px;
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

const CalendarBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
  row-gap: 10px;
`;

const ApproveStudy = ({ closeModal }) => {
  const today = new Date();
  const [cookies] = useCookies();
  const token = cookies.token;
  const [formData, setFormData] = useState({
    meetingId: "",
    content: "",
    meetingDate: "",
  });
  const [studyOptions, setStudyOptions] = useState([]);
  const [selectedStudyId, setSelectedStudyId] = useState("");

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

  const selectDate = (value) => {
    setFormData({
      ...formData,
      meetingDate: moment(value).format("YYYY-MM-DD"),
    });
  };

  const selectStudy = (event) => {
    setSelectedStudyId(event.target.value);
    setFormData({
      ...formData,
      meetingId: event.target.value,
    });
  };

  const handleContent = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const ApproveNewStudy = async (e) => {
    e.preventDefault();
    if (!formData.content || !formData.meetingId || !formData.meetingDate) {
      alert("필수 항목을 모두 작성해주세요.");
      return;
    }
    try {
      const res = await axios.post(
        `http://3.39.24.69:8080/meeting-weekly`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log("모임 승인 성공");
      closeModal();
      return res;
    } catch (error) {
      console.error("스터디 수정오류", error);
    }
  };

  console.log(formData);
  return (
    <FormBox>
      <EditBox>
        <ColBox>
          <SelectBox>
            승인할 주간모임 선택
            <Select value={selectedStudyId} onChange={selectStudy}>
              <option value="" disabled>
                조회 할 모임 선택
              </option>
              {studyOptions.map((study) => (
                <option key={study.id} value={study.id}>
                  {study.name}
                </option>
              ))}
            </Select>
          </SelectBox>
          <Input
            type="text"
            name="content"
            placeholder="모임 내용을 적어주세요"
            value={formData.content}
            onChange={handleContent}
          />
        </ColBox>
        <ColBox>
          날짜 선택
          <CalendarBox>
            <Calendar
              name="meetingDate"
              onChange={selectDate}
              value={formData.meetingDate}
              minDate={today}
            />
          </CalendarBox>
        </ColBox>
      </EditBox>
      <ModalFooter>
        <Button onClick={ApproveNewStudy}>생성하기</Button>
        <Button onClick={closeModal}>닫기</Button>
      </ModalFooter>
    </FormBox>
  );
};

export default ApproveStudy;
