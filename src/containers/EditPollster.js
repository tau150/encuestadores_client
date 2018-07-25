import React, { Component } from "react";
import { connect } from "react-redux";
import GridCard from "../components/GridCard";
import PollsterForm from "../components/PollsterForm";
import { updatePollster } from "../store/actions/pollstersActions";
import { getCities } from "../store/actions/citiesActions";
import { getPolls } from "../store/actions/pollsActions";

class EditPollster extends Component {
  state = {
    pollsterId: this.props.match.params.id,
    pollster: null
  };

  componentDidMount() {
    this.props.getCities();
    this.props.getPolls();

    const pollster = this.props.allPollsters.find(pollster => {
      return String(pollster.id) === String(this.props.match.params.id);
    });

    this.setState({ pollster });
  }

  handleEdit = pollster => {
    let formData = new FormData();
    console.log(pollster);
    formData.append("name", pollster.name);
    formData.append("surname", pollster.surname);
    formData.append("dni", pollster.dni);
    formData.append("cities", JSON.stringify(pollster.cities));
    formData.append("jobPosition", pollster.jobPosition);
    formData.append("active", pollster.active);
    formData.append("poll", pollster.poll);
    formData.append("avatar", pollster.img);

    this.props.updatePollster(formData, pollster.pollsterId);
  };

  render() {
    if (!this.state.pollster || !this.props.allCities || !this.props.allPolls)
      return null;

    return (
      <GridCard title={"Encuestador"} subTitle={"Edición de Encuestador"}>
        <PollsterForm
          pollster={this.state.pollster}
          pollsterId={this.state.pollsterId}
          cities={this.props.allCities}
          polls={this.props.allPolls}
          handleAction={this.handleEdit}
        />
      </GridCard>
    );
  }
}

const mapStateToProps = state => {
  return {
    allPollsters: state.pollsters.pollsters,
    allCities: state.cities.cities,
    allPolls: state.polls.polls
  };
};
export default connect(
  mapStateToProps,
  { updatePollster, getCities, getPolls }
)(EditPollster);
