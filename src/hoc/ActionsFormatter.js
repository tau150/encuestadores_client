import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { deleteUser } from "../store/actions/usersActions";
import { deletePollster } from "../store/actions/pollstersActions";
import { deletePoll } from "../store/actions/pollsActions";

const ContainerIcons = styled.div`
  cursor: pointer;
`;

const ActionsFormatter = resource => WrappedComponent => {
  return connect(
    null,
    { deletePollster, deletePoll, deleteUser }
  )(
    class HOC extends React.Component {
      state = {
        showSwal: false,
        idToDelete: null
      };

      handleEdit = (resource, e) => {
        const id = e.target.getAttribute("data-id");

        this.props.history.push(`/${resource}/${id}`);
      };

      handleCancel = () => {
        this.setState({ showSwal: false, idToDelete: null });
      };

      handleDeleteConfirm = e => {
        const id = e.target.getAttribute("data-id");
        this.setState({ showSwal: true, idToDelete: id });
      };

      handleDelete = () => {
        if (resource === "encuestadores") {
          this.props.deletePollster(this.state.idToDelete);
        }
        if (resource === "usuarios") {
          console.log("aca");
          this.props.deleteUser(this.state.idToDelete);
        }
        if (resource === "encuestas") {
          this.props.deletePoll(this.state.idToDelete);
        }
        //   this.WrappedComponent.deleteUser(this.state.idToDelete);
        //   this.deleteUser(this.state.idToDelete);
        //   this.props.deleteUser(this.state.idToDelete);

        this.setState({
          showSwal: false,
          idToDelete: null
        });
      };

      render() {
        const actionsFormatter = (cell, row, rowIndex) => {
          return (
            <ContainerIcons className="d-flex justify-content-around align-items-center">
              <i
                data-id={row.id}
                className="material-icons text-info rounded-icon"
                onClick={e => this.handleEdit(resource, e)}
              >
                edit
              </i>

              <i
                data-id={row.id}
                onClick={this.handleDeleteConfirm}
                className="material-icons text-danger"
              >
                delete
              </i>
            </ContainerIcons>
          );
        };
        return (
          <WrappedComponent
            actionsFormatter={actionsFormatter}
            idToDelete={this.state.idToDelete}
            handleCancel={this.handleCancel}
            handleDelete={this.handleDelete}
            {...this.props}
            {...this.state}
          />
        );
      }
    }
  );
};

export default ActionsFormatter;
