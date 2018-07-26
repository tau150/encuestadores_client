import React from "react";
import styled from "styled-components";

const ContainerIcons = styled.div`
  cursor: pointer;
`;

const ActionsFormatter2 = WrappedComponent => {
  class HOC extends React.Component {
    render() {
      const actionsFormatter = (cell, row, rowIndex) => {
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
      return (
        <WrappedComponent
          actionsFormatter={actionsFormatter}
          {...this.props}
          {...this.state}
        />
      );
    }
  }

  return HOC;
};

export default ActionsFormatter2;
