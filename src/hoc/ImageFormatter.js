import React from "react";
import styled from "styled-components";

const ContainerProfileImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageFormatter = WrappedComponent => {
  class HOC extends React.Component {
    render() {
      const imgFormatter = (cell, row, rowIndex) => {
        return (
          <ContainerProfileImg>
            <img src={cell} className="img-fluid img-perfil-grid" alt="" />
          </ContainerProfileImg>
        );
      };

      return <WrappedComponent imgFormatter={imgFormatter} {...this.props} />;
    }
  }

  return HOC;
};

export default ImageFormatter;
