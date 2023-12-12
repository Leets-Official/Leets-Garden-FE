import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import LoginContent from "../components/LoginContent";
import LoginForm from "../components/LoginForm";

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const StyledLogin = styled.div`
  position: relative;
  display: flex;
  justify-content: space-evenly;

  @media screen and (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const BackGround = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background: url("/images/5423403.jpg") no-repeat;
  background-size: cover;
  background-position: center;
  opacity: 0.7;
`;

const Login = () => {
  return (
    <LoginBox>
      <Header leftText={"Leets Garden"} />
      <BackGround />
      <StyledLogin>
        <LoginContent />
        <LoginForm />
      </StyledLogin>
    </LoginBox>
  );
};

export default Login;
