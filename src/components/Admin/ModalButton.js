import React from 'react';
import styled from "styled-components";

const StyledButton = styled.button`
  cursor: pointer;
  font-family: "Jua", sans-serif;
  font-size: 45px;
  width: 30%;
  height: 100px;
  border: none;
  padding: 10px;
  border-radius: 14px;
  color: rgba(84, 141, 84, .5);
  transition: all 1s ease;
  &:hover {
    background-color: rgba(84, 141, 84, .5);
    color: white;
  }
`;

const ModalButton = ({text, onClick}) => {
    return (
        <StyledButton onClick={onClick}>{text}</StyledButton>
    );
};

export default ModalButton;