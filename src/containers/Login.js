import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  login,
  recoverPassword,
  authCheckState,
} from '../store/actions/authActions';
import { loading } from '../store/actions/notificationsActions';
import styled from 'styled-components';

import SimpleReactValidator from 'simple-react-validator';
import { notify } from 'react-notify-toast';

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
} from 'reactstrap';

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

  .olvido {
    cursor: pointer;
    margin-top: 30px;
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

  state = { email: '', password: '', withError: false, wantToRevocer: false };

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      notify.show(nextProps.message, 'error', 2000);
    }
    if (nextProps.token) {
      this.props.history.push('/');
    }
  }

  setStateFromInput = event => {
    var obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  };

  handleClickRecover = () => {
    this.setState(prevState => ({ wantToRevocer: !prevState.wantToRevocer }));
  };

  handleSubmit = e => {
    if (!this.state.wantToRevocer) {
      if (this.validator.allValid()) {
        this.props.loading();
        this.props.login(this.state.email, this.state.password);
      } else {
        this.validator.showMessages();
        this.forceUpdate();
      }
    } else {
      console.log('login por recuperar');
      this.props.recoverPassword(this.state.email);
    }
  };

  render() {
    return (
      <StyledDiv>
        <Card className="card">
          <CardBody className="cardBody">
            <CardTitle className="cardTitle text-bold">
              {this.state.wantToRevocer
                ? 'Recuperar Password'
                : 'Iniciar Sesión'}
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
                  'email',
                  this.state.email,
                  'required|email',
                  'text-danger',
                  {
                    required: 'El email es obligatorio',
                    email: 'Ingrese un email válido',
                  }
                )}
              </FormGroup>

              {!this.state.wantToRevocer ? (
                <FormGroup>
                  <Label for="examplePassword">Contraseña</Label>
                  <Input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.setStateFromInput}
                  />

                  {this.validator.message(
                    'password',
                    this.state.password,
                    'required',
                    'text-danger',
                    {
                      required: 'Ingrese su password',
                    }
                  )}
                </FormGroup>
              ) : null}

              <div className="text-center">
                <p className="olvido" onClick={this.handleClickRecover}>
                  {this.state.wantToRevocer
                    ? 'Iniciar Sesión'
                    : 'Olvidó su contraseña ?'}
                </p>
                <Button
                  className="btn btn-outline-success mt-5"
                  onClick={this.handleSubmit}
                >
                  {this.state.wantToRevocer
                    ? 'Recuperar Password'
                    : 'Iniciar Sesión'}
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
    error: state.notifications.error,
    message: state.notifications.message,
    token: state.auth.token,
    loading: state.notifications.loading,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { login, recoverPassword, loading, authCheckState }
  )(Login)
);
