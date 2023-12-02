import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useCookies } from "react-cookie";

const FormBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    row-gap: 20px;
`

const Input = styled.input`
    font-family: "Jua", sans-serif;
    font-size: 40px;
    width: 400px;
    height: 80px;
    border: none;
    border-radius: 15px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`

const AddStudy = () => {
    return (
        <FormBox>
            <Form>
                <Input placeholder="모임이름"/>
                <Input placeholder="모임장소"/>
                <Input placeholder="모임시간"/>
                <Input placeholder="참여자"/>
            </Form>
        </FormBox>
    );
};

export default AddStudy;