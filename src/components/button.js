import React from "react";
import styled from "styled-components";

const ButtonCustom = styled.button`
    border-radius: 50px;
    border: none;
    background-color: #ff6e6c;
    padding-block: 8px;
    padding-inline: 24px;
    height: 40px;
    &:after {
        content: "";
        line-height: 40px;
        vertical-align: middle;
        display: inline-block;
        height: 24px;
        width: 24px;
        background-image: url("${(props) => props.img ? props.img : ""}");
        background-repeat: no-repeat;
        background-position: center;
    }
`;

function ButtonPlus(props) {
    return (
        <ButtonCustom img={props.img} onClick={props.handleClick}>
            Add Note
        </ButtonCustom>
    );
}
export default ButtonPlus;
