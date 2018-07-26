import React from "react";
import styled from "styled-components";

const StyledUl = styled.ul`
  li {
    font-size: 0.9rem;
    margin-top: 10px;
  }
`;

const ListFormatter = WrappedComponent => {
  class HOC extends React.Component {
    render() {
      const listFormatter = (cell, row, rowIndex) => {
        const elements = cell.map(element => {
          return element.city;
        });

        return (
          <StyledUl>
            {elements.map(element => <li key={element}> {element} </li>)}
          </StyledUl>
        );
      };

      return <WrappedComponent listFormatter={listFormatter} {...this.props} />;
    }
  }

  return HOC;
};

export default ListFormatter;
