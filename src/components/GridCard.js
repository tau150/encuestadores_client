import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";

const StyledDiv = styled.div`
  width: 85%;
  margin: 0 auto;
`;

const CardHeader = styled.div`
  background: linear-gradient(60deg, #66bb6a, #43a047);
  color: #fff;
  border-radius: 3px;
  margin-top: -50px;
  padding: 20px;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.14),
    0 7px 10px -5px rgba(76, 175, 80, 0.4);
`;

const GridCard = ({ subTitle, title, children, resource, allowNew }) => {
  return (
    <StyledDiv>
      <Card>
        <CardBody>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardSubtitle>{subTitle}</CardSubtitle>
          </CardHeader>

          <div className="row mt-5">
            <div className="col d-flex justify-content-center">
              {allowNew ? (
                <Link
                  to={resource + "/nuevo"}
                  className="btn btn-outline btn-success"
                >
                  Nuevo
                </Link>
              ) : null}
            </div>
          </div>
          <div className="mt-10 p-5">{children}</div>
        </CardBody>
      </Card>
    </StyledDiv>
  );
};

export default GridCard;
