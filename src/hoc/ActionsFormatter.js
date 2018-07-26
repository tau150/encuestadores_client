import React from "react";
import styled from "styled-components";

const ContainerIcons = styled.div`
  cursor: pointer;
`;

const ActionsFormatter = resource => WrappedComponent => {
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

  return HOC;
};

export default ActionsFormatter;

/* Method that checks whether a props is empty
prop can be an object, string or an array */

// const isEmpty = (prop) => (
//     prop === null ||
//     prop === undefined ||
//     (prop.hasOwnProperty('length') && prop.length === 0) ||
//     (prop.constructor === Object && Object.keys(prop).length === 0)
//   );

//   const withLoader = (loadingProp) => (WrappedComponent) => {
//     return class LoadIndicator extends Component {

//       render() {

//         return isEmpty(this.props[loadingProp]) ? <div className="loader" /> : <WrappedComponent {...this.props} />;
//       }
//     }
//   }
