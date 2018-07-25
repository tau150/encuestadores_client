import React from "react";
import styled from "styled-components";

const ContainerIcons = styled.div`
  cursor: pointer;
`;

const ContainerProfileImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledUl = styled.ul`
  li {
    font-size: 0.9rem;
    margin-top: 10px;
  }
`;

export const actionsFormatter = (cell, row, rowIndex) => {
  return (
    <ContainerIcons className="d-flex justify-content-around align-items-center">
      <i
        data-id={row.id}
        className="material-icons text-info rounded-icon"
        onClick={this.handleEdit}
      >
        edit
      </i>

      <i
        data-id={row.id}
        onClick={this.handleDeleteConfirm}
        className="material-icons text-danger"
      >
        delete
      </i>
    </ContainerIcons>
  );
};

export const imageFormatter = (cell, row, rowIndex) => {
  return (
    <ContainerProfileImg>
      <img src={cell} className="img-fluid img-perfil-grid" alt="" />
    </ContainerProfileImg>
  );
};

export const citiesFormatter = (cell, row, rowIndex) => {
  const cities = cell.map(city => {
    return city.city;
  });

  return (
    <StyledUl>{cities.map(city => <li key={city}> {city} </li>)}</StyledUl>
  );
};

export const activeFormatter = (cell, row, rowIndex) => {
  const icon =
    cell === true ? (
      <i className="material-icons text-center text-success">
        check_circle_outline
      </i>
    ) : (
      <i className="material-icons text-warning">highlight_off</i>
    );

  return <div className="text-center">{icon}</div>;
};
