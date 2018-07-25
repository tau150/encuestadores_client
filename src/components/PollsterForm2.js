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

class PollsterForm2 extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();

    console.log(props);
  }

  state = this.props.pollster
    ? {
        name: this.props.pollster.name,
        surname: this.props.pollster.surname,
        dni: this.props.pollster.dni,
        jobPositon: this.props.pollster.jobPositon,
        cities: this.props.pollster.cities,
        active: this.props.pollster.active,
        img: this.props.pollster.img,
        poll: this.props.pollster.poll
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

  render() {
    // const cities = this.props.cities.map(city => {
    //   return {
    //     value: city.id,
    //     label: city.city
    //   };
    // });

    return <h1>{this.props.pollster.name}</h1>;
  }
}

export default PollsterForm2;
