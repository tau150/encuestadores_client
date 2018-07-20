import React, { Component } from "react";
import { connect } from "react-redux";
import GridCard from "../components/GridCard";
import PollsterForm from "../components/PollsterForm";
import { savePollster } from "../store/actions/pollstersActions";
import { getCities } from "../store/actions/citiesActions";
import { getPolls } from "../store/actions/pollsActions";

class NewPollster extends Component {
  handleSave = pollster => {
    let formData = new FormData();
    formData.append("avatar", pollster.img);
    formData.append("name", pollster.name);
    formData.append("surname", pollster.surname);
    formData.append("dni", pollster.dni);
    formData.append("city", pollster.city);
    formData.append("active", pollster.active);
    formData.append("poll", pollster.poll);

    this.props.savePollster(formData);
  };

  componentDidMount() {
    this.props.getCities();
    this.props.getPolls();
  }

  render() {
    if (!this.props.allCities || !this.props.allPolls) return null;

    return (
      <GridCard title={"Encuestador"} subTitle={"Creación de Encuestador"}>
        <PollsterForm
          userId={null}
          cities={this.props.allCities}
          polls={this.props.allPolls}
          handleAction={this.handleSave}
          allowNew={false}
        />
      </GridCard>
    );
  }
}

const mapStateToProps = state => {
  return {
    allCities: state.cities.cities,
    allPolls: state.polls.polls
  };
};

export default connect(
  mapStateToProps,
  { savePollster, getCities, getPolls }
)(NewPollster);
