import React from "react";
import styled from "styled-components";

const StyledLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  content: "";
  box-sizing: border-box;
  left: 50%;
  width: 50px;
  height: 50px;
  margin: 0 auto;
  border-radius: 50%;
  border: 1px solid #ccc;
  border-top-color: #07d;
  animation: spinner 0.6s linear infinite;
`;

const StyledBackDrop = styled.div`
  background: rgba(0, 0, 0, 0.2);
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 4000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loading = ({ open }) => {
  const loading = open ? (
    <StyledBackDrop>
      <div>
        <StyledLoading />
        <h5>Cargando... </h5>
      </div>
    </StyledBackDrop>
  ) : null;

  return <div>{loading}</div>;
};

export default Loading;
