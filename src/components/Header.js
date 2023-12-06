import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeaderBox = styled.div`
  display: flex;
  background-color: rgba(84, 141, 84, 0.5);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  color: rgba(0, 0, 0, 0.7);
  justify-content: space-evenly;
  white-space: nowrap;
  padding-top: 30px;
  padding-bottom: 15px;
  margin-bottom: 15px;
  align-items: flex-end;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  text-align: center;
`;

const LeftText = styled.div`
  font-size: 35px;
  width: 40%;
  margin-left: 5%;

  @media screen and (max-width: 1200px) {
    width: 100%;
    margin-left: 0%;
  }
`;

const MiddleText = styled.div`
  font-size: 30px;
  width: 30%;

  @media screen and (max-width: 1200px) {
    width: 0%;
    font-size: 0px;
  }
`;

const NickName = styled.div`
  font-size: 30px;
  width: 20%;
  margin-right: 5%;
  @media screen and (max-width: 1200px) {
    width: 0%;
    font-size: 0px;
    margin-right: 0%;
  }
`;
const LogoutButton = styled.button`
  cursor: pointer;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 30px;
  width: 10%;
  border: none;
  border-radius: 14px;
  transition: all 1s ease;
  &:hover {
    background-color: rgba(84, 141, 84, 0.5);
    color: black;
  }
  margin-right: 30px;

  @media screen and (max-width: 1200px) {
    width: 0%;
    font-size: 0px;
    margin-right: 0%;
  }
`;

const Sprout = styled.img`
  margin-left: 15px;
  width: 40px;
`;
const Header = ({ leftText }) => {
  const [cookies, removeCookie] = useCookies();
  const name = cookies.name;
  const navigate = useNavigate();
  console.log(cookies);
  const Logout = () => {
    removeCookie("token");
    removeCookie("name");
    removeCookie("username");
    removeCookie("fieldType");
    removeCookie("roles");
    removeCookie("message");
    navigate("/");
  };
  console.log(name);
  return (
    <HeaderBox>
      <LeftText>
        {leftText}
        <Sprout src="images/sprout.png" />
      </LeftText>
      <MiddleText></MiddleText>
      <NickName>{name == "undefined" ? null : `${name}님의 Garden`}</NickName>
      {name=='undefined' ? null : <LogoutButton onClick={Logout}>로그아웃</LogoutButton>}
    </HeaderBox>
  );
};

export default Header;
