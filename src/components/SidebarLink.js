import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledDiv = styled.div`
  width: 80%;
  margin: 20px auto;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  &:hover {
    background: #e7e9ea;
    transition: all 0.3s linear;
  }
  a {
    text-decoration: none;
    color: #3c4858;

    i {
      margin-right: 15px;
    }
  }

  .link {
    display: flex;
    padding: 15px;
    cursor: pointer;
    margin-left: 0;
    color: #3c4858;
    border-radius: 5px;
  }
`;

const SidebarLink = props => {
  return (
    <StyledDiv>
      <NavLink to={props.path} className="link" activeClassName="active-link">
        <i className="material-icons">{props.icon}</i>
        {props.pathName}
      </NavLink>
    </StyledDiv>
  );
};

export default SidebarLink;
