import React, { Component } from 'react';
import { connect } from 'react-redux';
import SimpleReactValidator from 'simple-react-validator';
import { changePassword } from '../store/actions/authActions';
import GridCard from '../components/GridCard';
// Reactstrap
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      newPassword: '',
      repeatedPassword: '',
    };
    this.validator = new SimpleReactValidator({
      equal: {
        message: 'Las constraseñas no coinciden',
        rule: function(val, option) {
          return val === option[0];
        },
      },
    });
  }

  setStateFromInput = event => {
    var obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  };

  handleSubmit = e => {
    if (this.validator.allValid()) {
      this.props.changePassword({
        email: localStorage.getItem('userEmail'),
        password: this.state.password,
        newPassword: this.state.newPassword,
      });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  render() {
    return (
      <GridCard
        title={'Cambio de Contraseña'}
        className="d-flex justify-content-center"
      >
        <div className="col-md-7 mx-auto">
          <Form className="form">
            <FormGroup>
              <Label for="exampleEmail">Contraseña actual</Label>
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
                  required: 'La contraseña es obligatorio',
                }
              )}
            </FormGroup>

            <FormGroup>
              <Label for="examplePassword">Nueva Contraseña</Label>
              <Input
                type="password"
                name="newPassword"
                value={this.state.newPassword}
                onChange={this.setStateFromInput}
              />

              {this.validator.message(
                'password',
                this.state.newPassword,
                'required',
                'text-danger',
                {
                  required: 'Ingrese su nueva contraseña',
                }
              )}
            </FormGroup>

            <FormGroup>
              <Label for="examplePassword">Repetir Contraseña</Label>
              <Input
                type="password"
                name="repeatedPassword"
                value={this.state.repeatedPassword}
                onChange={this.setStateFromInput}
              />

              {this.validator.message(
                'repeatedPassword',
                this.state.repeatedPassword,
                `equal:${this.state.newPassword}`,
                'text-danger',
                {
                  required: 'Repita su nueva contraseña',
                }
              )}
            </FormGroup>

            <div className="text-center">
              <Button
                className="btn btn-outline-success mt-5"
                onClick={this.handleSubmit}
              >
                Cambiar Contraseña
              </Button>
            </div>
          </Form>
        </div>
      </GridCard>
    );
  }
}

export default connect(
  null,
  { changePassword }
)(ChangePassword);
