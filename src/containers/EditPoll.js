import React, { Component } from "react";
import { connect } from "react-redux";
import GridCard from "../components/GridCard";
import PollForm from "../components/PollForm";
import { updatePoll } from "../store/actions/pollsActions";

class EditPoll extends Component {
  state = {
    pollId: this.props.match.params.id,
    poll: null
  };

  componentDidMount() {
    const poll = this.props.allPolls.find(poll => {
      return String(poll.id) === String(this.props.match.params.id);
    });

    this.setState({ poll });
  }

  handleEdit = poll => {
    this.props.updatePoll(poll);
  };

  render() {
    if (!this.state.poll) return null;
    return (
      <GridCard title={"Encuesta"} subTitle={"Edición de Encuesta"}>
        <PollForm
          poll={this.state.poll}
          pollId={this.state.pollId}
          handleAction={this.handleEdit}
        />
      </GridCard>
    );
  }
}

const mapStateToProps = state => {
  return {
    allPolls: state.polls.polls
  };
};
export default connect(
  mapStateToProps,
  { updatePoll }
)(EditPoll);
