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

const Loading = ({ open }) => {
  return (
    <h1>LOADING</h1>
    // <div>
    //   <Dialog
    //     open={open}
    //     aria-labelledby="alert-dialog-title"
    //     aria-describedby="alert-dialog-description"
    //   >
    //     <DialogContent>
    //       <DialogContentText
    //         className="container-loading"
    //         id="alert-dialog-description"
    //       />
    //       <StyledLoading />
    //       <h5>Cargando... </h5>
    //     </DialogContent>
    //   </Dialog>
    // </div>
  );
};

export default Loading;
