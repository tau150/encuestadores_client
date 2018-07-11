import React, { Component } from "react";
import { connect } from "react-redux";
import GridCard from "../components/GridCard";
import PollForm from "../components/PollForm";
import { savePoll } from "../store/actions/pollsActions";

class NewPoll extends Component {
  handleSave = poll => {
    this.props.savePoll(poll);
  };

  render() {
    return (
      <GridCard title={"Usuario"} subTitle={"Creación de Usuario"}>
        <PollForm handleAction={this.handleSave} allowNew={false} poll={null} />
      </GridCard>
    );
  }
}

export default connect(
  null,
  { savePoll }
)(NewPoll);
