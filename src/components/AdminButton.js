import React from 'react';
import styled from "styled-components";

const Button = styled.button`
  cursor: pointer;
  font-family: "Jua", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  width: 200px;
  height: 150px;
  font-size: 30px;
  border-radius: 14px;
  color: rgba(84, 141, 84, .5);
  transition: all 1s ease;
  transform: scale(1);
  &:hover {
    transform: scale(1.05);
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