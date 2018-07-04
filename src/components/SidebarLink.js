import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledDiv = styled.div`
  width: 70%;
  margin: 20px auto;
  display: flex;
  padding: 15px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  color: #3c4858;
  &:hover {
    background: #e7e9ea;
    transition: all 0.3s linear;
  }

  a {
    text-decoration: none;
    color: #3c4858;
    margin-left: 15px;
  }
`;

const SidebarLink = props => {
  return (
    <StyledDiv>
      <i className="material-icons">{props.icon}</i>
      <Link to={props.path}>{props.pathName}</Link>
    </StyledDiv>
  );
};

export default SidebarLink;
