import React, { useState } from "react";

import styled from "styled-components";
import AddStudy from "./Admin/AddStudy";
import AddUser from "./Admin/AddUser";
import AdminButton from "./AdminButton";
import ApproveStudy from "./Admin/ApproveStudy";
import EditStudy from "./Admin/EditStudy";
import InquiryUser from "./Admin/InquiryUser";
import AttendanceCheck from "./Admin/AttendanceCheck";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 100%;
`;

const Title = styled.div`
  display: flex;
  height: 15%;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 2.5em;
  margin-left: 0.5em;
  margin-top: 1.5em;
  color: #8c8c8c;
`;

const TodayBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70%;
  border-radius: 10px;
  column-gap: 1em;
  margin: 10px;
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
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
`;

const ModalTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3em;
  height: 20%;
  width: 100%;
  background-color: rgba(84, 141, 84, 0.5);
  border-radius: 15px;
`;

const ModalBody = styled.div`
  display: flex;
  width: 100%;
  height: 80%;
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
        return <AddStudy closeModal={closeModal} />;
      case "모임수정":
        return <EditStudy closeModal={closeModal} />;
      case "모임승인":
        return <ApproveStudy closeModal={closeModal} />;
      default:
        return null;
    }
  };

  return (
    <Box>
      <Title>모임 관리</Title>
      <TodayBox>
        <AdminButton
          text={"회원추가"}
          onClick={() => switchModal("회원추가")}
        />
        <AdminButton
          text={"회원조회"}
          onClick={() => switchModal("회원조회")}
        />
        <AdminButton
          text={"출석체크"}
          onClick={() => switchModal("출석체크")}
        />
        <AdminButton
          text={"모임생성"}
          onClick={() => switchModal("모임생성")}
        />
        <AdminButton
          text={"모임수정"}
          onClick={() => switchModal("모임수정")}
        />
        <AdminButton
          text={"모임승인"}
          onClick={() => switchModal("모임승인")}
        />
      </TodayBox>
      {isModalOpen && (
        <ModalBackground onClick={closeModal}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <ModalTitle>{selectedButton}</ModalTitle>
            <ModalBody>{getModalInfo()}</ModalBody>
          </ModalBox>
        </ModalBackground>
      )}
    </Box>
  );
};
export default AdminNavBox;
