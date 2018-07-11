import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import SimpleReactValidator from "simple-react-validator";

class PollForm extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
  }

  state = this.props.poll
    ? {
        name: this.props.poll.name,
        description: this.props.poll.description,
        pollId: this.props.pollId
      }
    : {
        name: "",
        description: ""
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
            <Label for="description">Descripción</Label>
            <Input
              type="text"
              name="description"
              id="description"
              placeholder="Descripción"
              onChange={this.setStateFromInput}
              value={this.state.description}
            />

            {this.validator.message(
              "description",
              this.state.description,
              "required",
              "text-danger",
              {
                required: "La descripción es obligatoria"
              }
            )}
          </FormGroup>
        </div>
        <div className="row d-flex justify-content-center mt-3">
          <Button
            className="btn btn-outline btn-success"
            onClick={this.handleSubmit}
          >
            {this.state.pollId ? "Guardar" : "Crear"}
          </Button>
        </div>
      </Form>
    );
  }
}

export default PollForm;
