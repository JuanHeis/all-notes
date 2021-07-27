import React from "react";
import styled from "styled-components";

const ButtonCustom = styled.button`
border-radius: 50px;
border: none;
background-color: #FF6E6C;
padding-block: 8px;
padding-inline: 24px;
height: 40px;
&:after {
    content: "";
    background-image: url(${props => props.img});
    height: 24px;
    width: 24px;
    background-position: center;

  }`;

function Button(props) {
    return (
        <ButtonCustom className="button" onClick={props.handleClick}>
            Add Note
        </ButtonCustom>
    );
}
export default Button