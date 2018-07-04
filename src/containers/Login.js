import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { login } from "../store/actions/authActions";
import styled from "styled-components";
import Loading from "../components/Loading";
import SimpleReactValidator from "simple-react-validator";
import Notifications, { notify } from "react-notify-toast";

// Reactstrap
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  FormFeedback
} from "reactstrap";

const StyledDiv = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-button {
    margin-top: 5%;
  }

  .card {
    width: 100%;
  }

  .cardBody {
    padding: 0;
  }
  .cardTitle {
    padding: 15%;
    background: linear-gradient(
      to right,
      rgba(196, 230, 95, 1) 0%,
      rgba(86, 168, 9, 1) 100%
    );
    color: #fff;
  }

  .form {
    padding: 5%;
  }

  @media (min-width: 768px) {
    .card {
      width: 35%;
    }
  }
`;

class Login extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
  }

  state = { email: "", password: "", withError: false };

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      notify.show(nextProps.error, "error", 2000);
    }
    if (nextProps.token) {
      this.props.history.push("/");
    }
  }

  setStateFromInput = event => {
    var obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  };

  handleSubmit = e => {
    console.log("aca");
    if (this.validator.allValid()) {
      this.props.login(this.state.email, this.state.password);
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  render() {
    return (
      <StyledDiv>
        <Card className="card">
          <CardBody className="cardBody">
            <CardTitle className="cardTitle text-bold">
              Iniciar Sesión
            </CardTitle>

            <Form className="form">
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.setStateFromInput}
                />

                {this.validator.message(
                  "email",
                  this.state.email,
                  "required|email",
                  "text-danger",
                  {
                    required: "El email es obligatorio",
                    email: "Ingrese un email válido"
                  }
                )}
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Contraseña</Label>
                <Input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.setStateFromInput}
                />

                {this.validator.message(
                  "password",
                  this.state.password,
                  "required",
                  "text-danger",
                  {
                    required: "Ingrese su password"
                  }
                )}
              </FormGroup>
              <div className="text-center">
                <Button
                  className="btn btn-outline-success mt-5"
                  onClick={this.handleSubmit}
                >
                  Login
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </StyledDiv>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { login }
  )(Login)
);

// return (
//   <StyledDiv>
//     <Loading open={this.props.loading} />
//     <GridItem xs={12} sm={12} md={4}>
//       <Card profile>
//         <CardAvatar profile>
//           <img src="img/favicon.jpg" alt="..." />
//         </CardAvatar>
//         <CardBody profile>
//           <GridItem xs={12} sm={12} md={12}>
//             <CustomInput
//               labelText="Email"
//               formControlProps={{
//                 fullWidth: true
//               }}
//               inputProps={{
//                 type: "email",
//                 name: "email",
//                 value: this.state.email,
//                 onChange: this.setStateFromInput
//               }}
//             />
//           </GridItem>
//           <Danger>
//             {this.validator.message(
//               "email",
//               this.state.email,
//               "required|email",
//               "text-danger",
//               {
//                 required: "El email es obligatorio",
//                 email: "Ingrese un email válido"
//               }
//             )}
//           </Danger>
//           <GridItem xs={12} sm={12} md={12}>
//             <CustomInput
//               labelText="Password"
//               formControlProps={{
//                 fullWidth: true
//               }}
//               inputProps={{
//                 type: "password",
//                 name: "password",
//                 value: this.state.password,
//                 onChange: this.setStateFromInput
//               }}
//             />
//           </GridItem>
//           <Danger>
//             {this.validator.message(
//               "password",
//               this.state.password,
//               "required",
//               "text-danger",
//               {
//                 required: "Ingrese su password"
//               }
//             )}
//           </Danger>
//           <Button
//             className="login-button"
//             onClick={this.handleSubmit}
//             color="success"
//             type="submit"
//             round
//           >
//             Ingresar
//           </Button>
//         </CardBody>
//       </Card>
//     </GridItem>
//   </StyledDiv>
// );
