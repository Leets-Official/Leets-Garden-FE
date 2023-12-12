import React from 'react';
import styled from "styled-components";

const Button = styled.button`
  cursor: pointer;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  width: 28%;
  height: 42%;
  font-size: 1.8em;
  border-radius: 12px;
  color: rgba(84, 141, 84, .5);
  transition: all 1s ease;
  &:hover {
    background-color: rgba(84, 141, 84, .5);
    color: white;
  }
`;

const AdminButton = ({text, onClick}) => {
    return (
        <Button onClick={onClick}>{text}</Button>
    );
};

export default AdminButton;