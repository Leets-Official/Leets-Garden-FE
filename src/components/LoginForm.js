import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";
import { useCookies } from "react-cookie";

const Input = styled.input`
  background: transparent;
  font-size: 18px;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin: 10px;
  outline: none;
  border-radius: 15px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  color: black;
  &::placeholder {
    color: rgba(0, 0, 0, 0.7);
  }
`;

const LoginButton = styled.button`
  color: black;
  background-color: rgba(0, 0, 0, 0.4);
  border: none;
  border-radius: 15px;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin: 10px;
  margin-top: 20px;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 500;
  font-size: 20px;
  cursor: pointer;
`;

const StyledLoginForm = styled.div`
  background: transparent;
  backdrop-filter: blur(10px);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  font-family: "Noto Sans KR", sans-serif;
  
  width: 22%;
  margin-top: 100px;
  margin-bottom: 100px;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 30px;
  padding-bottom: 30px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
  border: 3px solid rgba(255, 255, 255, 0.2);
  @media screen and (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    width: 40%;
    margin-top: 30px;
  }
`;

const Text = styled.p`
  font-size: 50px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.7);
  text-align: center;
  margin: 0;
  margin-bottom: 20px;
`;

const LoginForm = () => {
  const navigate = useNavigate();

  const usernameRef = useRef();
  const passwordRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.length < 1) {
      window.alert("학번을 입력해주세요.");
      usernameRef.current.focus();
      return;
    }
    if (password.length < 1) {
      window.alert("패스워드를 입력해주세요.");
      passwordRef.current.focus();
      return;
    }

    const loginToken = await axios.post(
      "http://3.39.24.69:8080/login",
      { username, password },
      { validateStatus: false }
    );
    if (loginToken.status === 200) {
      const expires = moment().add(1, "hours").toDate();
      setCookie("token", loginToken.data.token, {
        path: "/",
        expires: expires,
      });
      setCookie("name", loginToken.data.name, {
        path: "/",
        expires: expires,
      });
      setCookie("username", loginToken.data.username, {
        path: "/",
        expires: expires,
      });
      setCookie("fieldType", loginToken.data.fieldType, {
        path: "/",
        expires: expires,
      });
      setCookie("roles", loginToken.data.roles, {
        path: "/",
        expires: expires,
      });
      setCookie("message", loginToken.data.message, {
        path: "/",
        expires: expires,
      });
    if(loginToken.data.roles==='ADMIN'){
        navigate('/admin')
    }else{
        navigate("/main");

    } 
    } else if (loginToken.status == 404) {
      window.alert("사용자에서 해당하는 username 이 존재하지 않습니다.");
      return;
    } else if (loginToken.status == 401) {
      window.alert("비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <StyledLoginForm>
      <Text>Login</Text>
      <Input
        type="text"
        ref={usernameRef}
        name="username"
        placeholder="username"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <Input
        type="password"
        ref={passwordRef}
        name="password"
        placeholder="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <LoginButton onClick={handleSubmit}>Login</LoginButton>
    </StyledLoginForm>
  );
};

export default LoginForm;
