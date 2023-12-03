import React, { useEffect, useState } from "react";

import styled from "styled-components";
import AddStudy from "./Admin/AddStudy";
import AddUser from "./Admin/AddUser"
import AdminButton from "./AdminButton";
import ApproveStudy from "./Admin/ApproveStudy";
import EditStudy from "./Admin/EditStudy";
import InquiryUser from "./Admin/InquiryUser";
import AttendanceCheck from "./Admin/AttendanceCheck";

const Title = styled.div`
  font-family: "Jua", sans-serif;
  margin-left: 30px;
  font-size: 35px;
  color: #8c8c8c;
`;

const TodayBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 700px;
  height: 360px;
  border-radius: 10px;
  column-gap: 20px;
  padding: 10px;
  margin: 20px;
  overflow-y: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80%;
  width: 60%;
  background: white;
  font-family: "Jua", sans-serif;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
`;

const ModalTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  height: 15%;
  width: 100%;
  padding-top: 10px;
  background-color: rgba(84, 141, 84, .5);
  border-radius: 15px;
`;

const ModalBody = styled.div`
  display: flex;
  width: 100%;
  height: 75%;
`;

const ModalFooter = styled.div`
  display: flex;
  align-items:center;
  justify-content: center;
  column-gap: 120px;
  width: 100%;
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
  color: rgba(84, 141, 84, .5);
  transition: all 1s ease;
  &:hover {
    background-color: rgba(84, 141, 84, .5);
    color: white;
  }
`;

const AdminNavBox = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);

  const switchModal = (buttonName) => {
    setSelectedButton(buttonName);
    setIsModalOpen(!isModalOpen);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getModalInfo = () => {
    switch (selectedButton) {
      case "회원추가":
        return <AddUser closeModal={closeModal} />;
      case "회원조회":
        return <InquiryUser closeModal={closeModal} />;
      case "출석체크":
        return <AttendanceCheck closeModal={closeModal} />;
      case "모임생성":
        return <AddStudy />;
      case "모임수정":
        return <EditStudy />;
      case "모임승인":
        return <ApproveStudy />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Title>스터디 관리</Title>
      <TodayBox>
        <AdminButton text={"회원추가"} onClick={() => switchModal("회원추가")}/>
        <AdminButton text={"회원조회"} onClick={() => switchModal("회원조회")}/>
        <AdminButton text={"출석체크"} onClick={() => switchModal("출석체크")}/>
        <AdminButton text={"모임생성"} onClick={() => switchModal("모임생성")}/>
        <AdminButton text={"모임수정"} onClick={() => switchModal("모임수정")}/>
        <AdminButton text={"모임승인"} onClick={() => switchModal("모임승인")}/>
      </TodayBox>
      {isModalOpen && (
        <ModalBackground onClick={closeModal}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <ModalTitle>{selectedButton}</ModalTitle>
            <ModalBody>{getModalInfo()}</ModalBody>
          </ModalBox>
        </ModalBackground>
      )}
    </div>
  );
};
export default AdminNavBox;
