import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import SimpleReactValidator from "simple-react-validator";
import styled from "styled-components";
import Select from "react-select";
import ImageUploader from "react-images-upload";

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10%;
`;

class PollsterForm extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
  }

  state = this.props.pollster
    ? {
        pollsterId: this.props.pollsterId,
        name: this.props.pollster.name,
        surname: this.props.pollster.surname,
        dni: this.props.pollster.dni,
        jobPosition: this.props.pollster.jobPosition,
        cities: this.props.pollster.cities.map(city => {
          return {
            value: city.id,
            label: city.city
          };
        }),
        active: this.props.pollster.active,
        profileImg: this.props.pollster.img,
        poll: this.props.pollster.Poll.id
      }
    : {
        name: "",
        surname: "",
        dni: "",
        jobPosition: "",
        cities: null,
        selectedOption: null,
        active: true,
        img: "",
        poll: ""
      };

  setStateFromInput = event => {
    var obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  };

  setStateFromInputArray = event => {
    const newState = this.state.cities.concat([event.target.value]);
    this.setState({
      cities: newState
    });
  };

  handleActive = () => {
    this.setState(prevState => ({
      active: !prevState.active
    }));
  };

  handleSubmit = e => {
    if (this.validator.allValid()) {
      this.props.handleAction(this.state);
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  handleChangeMulti = cities => {
    this.setState({ cities });
  };

  onDrop = picture => {
    this.setState({
      img: picture[0]
    });
  };

  handleChangePicture = () => {
    this.setState({ profileImg: null });
  };

  render() {
    const cities = this.props.cities.map(city => {
      return {
        value: city.id,
        label: city.city
      };
    });

    const imageHandler = this.state.profileImg ? (
      <div className="d-flex flex-column text-center align-items-center">
        <img
          src={this.state.profileImg}
          className="img-fluid img-perfil-profile"
        />
        <button
          onClick={this.handleChangePicture}
          type="button"
          className="btn btn-outline-info mt-5"
        >
          Cambiar foto
        </button>
      </div>
    ) : (
      <ImageUploader
        withIcon={true}
        buttonText="Seleccione una imagen de Perfil"
        onChange={this.onDrop}
        withPreview={true}
        imgExtension={[".jpg", ".gif", ".png"]}
        maxFileSize={5242880}
      />
    );

    return (
      <Form>
        <StyledDiv>
          <div className="col-4 text-center">{imageHandler}</div>

          <FormGroup className="mt-5" tag="fieldset">
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="radio1"
                  onChange={this.handleActive}
                  checked={this.state.active ? "checked" : ""}
                />Activo
              </Label>
            </FormGroup>
          </FormGroup>
        </StyledDiv>

        <div className="row">
          <FormGroup className="col-md-4">
            <Label for="exampleEmail">Nombre</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Ingrese Nombre"
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

          <FormGroup className="col-md-4">
            <Label for="description">Apellido</Label>
            <Input
              type="text"
              name="surname"
              id="surname"
              placeholder="Ingrese Apellido"
              onChange={this.setStateFromInput}
              value={this.state.surname}
            />

            {this.validator.message(
              "surname",
              this.state.surname,
              "required",
              "text-danger",
              {
                required: "El apellido es obligatoria"
              }
            )}
          </FormGroup>

          <FormGroup className="col-md-4">
            <Label for="description">DNI</Label>
            <Input
              type="text"
              name="dni"
              id="dni"
              placeholder="Ingrese DNI"
              onChange={this.setStateFromInput}
              value={this.state.dni}
            />

            {this.validator.message(
              "dni",
              this.state.dni,
              "required",
              "text-danger",
              {
                required: "El DNI es obligatorio"
              }
            )}
          </FormGroup>

          <FormGroup className="col-md-4">
            <Label for="description">Cargo</Label>
            <Input
              type="select"
              name="jobPosition"
              id="jobPosition"
              onChange={this.setStateFromInput}
              value={this.state.jobPosition}
            >
              <option value="">Seleccione una opción</option>
              <option value="Encuestador">Encuestador</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Jefe de Equipo">Jefe de Equipo</option>
              <option value="Jefe de Equipo Volante">
                Jefe de Equipo Volante
              </option>
              <option value="Encuestador Aux.">Encuestador Aux.</option>
            </Input>

            {this.validator.message(
              "jobPosition",
              this.state.jobPosition,
              "required",
              "text-danger",
              {
                required: "Debe seleccionar una opción"
              }
            )}
          </FormGroup>

          <FormGroup className="col-md-4">
            <Label for="description">Ciudad / es</Label>
            {/* <Input
              type="select"
              name="cities"
              id="cities"
              onChange={this.setStateFromInputArray}
              value={this.state.city}
            >
              <option selected>Seleccione una opción</option>
              {this.props.cities.map(city => (
                <option key={city.id} value={city.id}>
                  {city.city}
                </option>
              ))}
            </Input> */}

            <Select
              value={this.state.cities}
              onChange={this.handleChangeMulti}
              options={cities}
              name="cities"
              isMulti
              className="multiselect"
              isSearchable
              placeholder="Seleccione alguna opción"
            />

            {this.validator.message(
              "cities",
              this.state.cities,
              "required",
              "text-danger",
              {
                required: "Debe seleccionar una opción"
              }
            )}
          </FormGroup>

          <FormGroup className="col-md-4">
            <Label for="description">Encuesta</Label>
            <Input
              type="select"
              name="poll"
              id="poll"
              onChange={this.setStateFromInput}
              value={this.state.poll}
            >
              <option>Seleccione una opción</option>
              {this.props.polls.map(poll => (
                <option key={poll.id} value={poll.id}>
                  {poll.name}
                </option>
              ))}
            </Input>

            {this.validator.message(
              "poll",
              this.state.poll,
              "required",
              "text-danger",
              {
                required: "Debe seleccionar una opción"
              }
            )}
          </FormGroup>
        </div>
        <div className="row d-flex justify-content-center mt-3">
          <Button
            className="btn btn-outline btn-success"
            s
            onClick={this.handleSubmit}
          >
            {this.state.pollsterId !== "" ? "Guardar" : "Crear"}
          </Button>
        </div>
      </Form>
    );
  }
}

export default PollsterForm;
