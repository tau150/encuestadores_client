import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import SimpleReactValidator from "simple-react-validator";

class Userform extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
  }

  state = this.props.user
    ? {
        userId: this.props.userId,
        email: this.props.user.email,
        name: this.props.user.name,
        surname: this.props.user.surname,
        role_id: this.props.user.Role.id
      }
    : {
        email: "",
        name: "",
        surname: "",
        role_id: 3
      };

  setStateFromInput = event => {
    var obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  };

  handleSubmit = e => {
    if (this.validator.allValid()) {
      this.props.handleAction(this.state);
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  render() {
    return (
      <Form>
        <div className="row">
          <FormGroup className="col-md-6">
            <Label for="exampleEmail">Nombre</Label>
            <Input
              type="text"
              name="name"
              id="exampleEmail"
              placeholder="Nombre"
              onChange={this.setStateFromInput}
              value={this.state.name}
            />

            {this.validator.message(
              "name",
              this.state.name,
              "required",
              "text-danger",
              {
                required: "El Nombre es obligatorio"
              }
            )}
          </FormGroup>

          <FormGroup className="col-md-6">
            <Label for="exampleEmail">Apellido</Label>
            <Input
              type="text"
              name="surname"
              id="exampleEmail"
              placeholder="Apellido"
              onChange={this.setStateFromInput}
              value={this.state.surname}
            />

            {this.validator.message(
              "surname",
              this.state.surname,
              "required",
              "text-danger",
              {
                required: "El Apellido es obligatorio"
              }
            )}
          </FormGroup>
        </div>

        <div className="row mt-5">
          <FormGroup className="col-md-6">
            <Label for="exampleEmail">Email</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              value={this.state.email}
              onChange={this.setStateFromInput}
              placeholder="Email"
              disabled={true ? this.props.user : false}
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
          <FormGroup className="col-md-6">
            <Label for="exampleSelect">Rol</Label>
            <Input
              type="select"
              name="role_id"
              value={this.state.role_id}
              onChange={this.setStateFromInput}
            >
              <option value="1">Super Admin</option>
              <option value="2">Operador</option>
              <option value="3">Consulta</option>
            </Input>
          </FormGroup>
        </div>
        <div className="row d-flex justify-content-center mt-3">
          <Button
            className="btn btn-outline btn-success"
            onClick={this.handleSubmit}
          >
            {this.state.userId ? "Guardar" : "Crear"}
          </Button>
        </div>
      </Form>
    );
  }
}

export default Userform;
