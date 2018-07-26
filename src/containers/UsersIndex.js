import React, { PureComponent } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import SweetAlert from "sweetalert2-react";
import GridCard from "../components/GridCard";
import { getUsers, deleteUser } from "../store/actions/usersActions";
import ActionsFormatter2 from "../hoc/ActionsFormatter2";

class UsersIndex extends PureComponent {
  state = {
    showSwal: false,
    idToDelete: null
  };
  componentDidMount() {
    if (this.props.allUsers === null) {
      this.props.getUsers();
    }
  }

  handleEdit = e => {
    const id = e.target.getAttribute("data-id");
    this.props.history.push("/usuarios/" + id);
  };

  handleDelete = () => {
    this.props.deleteUser(this.state.idToDelete);
    this.setState({
      showSwal: false,
      idToDelete: null
    });
  };

  handleDeleteConfirm = e => {
    const id = e.target.getAttribute("data-id");
    this.setState({ showSwal: true, idToDelete: id });
  };

  handleCancel = () => {
    this.setState({ showSwal: false, idToDelete: null });
  };

  render() {
    if (!this.props.allUsers) return null;

    // const headerSortingStyle = { color: "red" };

    const users = this.props.allUsers;
    const columns = [
      {
        dataField: "id",
        text: "ID",
        hidden: true
      },
      {
        dataField: "name",
        text: "Nombre",
        headerClasses: "datatable-sortable",
        sort: true
      },
      {
        dataField: "surname",
        text: "Apellido",
        headerClasses: "datatable-sortable",
        sort: true
      },
      {
        dataField: "email",
        text: "Email"
      },
      {
        dataField: "Role.name",
        text: "Rol"
      },
      {
        dataField: "id",
        text: "Acciones",
        headerClasses: "datatable-actions",
        formatter: this.props.actionsFormatter
      }
    ];

    return (
      <div>
        <GridCard
          title={"Usuarios"}
          subTitle={"Listado de Usuarios"}
          resource={"usuarios"}
          allowNew={true}
        >
          <SweetAlert
            show={this.props.showSwal}
            title="Eliminará el registro"
            text="¿Está seguro de eliminar?"
            type="warning"
            showCancelButton
            confirmButtonText="Sí, eliminar!"
            cancelButtonText="Cancelar"
            onConfirm={this.handleDelete}
            onCancel={this.handleCancel}
          />
          <BootstrapTable
            keyField={"id"}
            data={users}
            columns={columns}
            pagination={paginationFactory()}
          />
        </GridCard>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allUsers: state.users.users,
    loading: state.notifications.loading
  };
};

export default ActionsFormatter2(
  connect(
    mapStateToProps,
    { getUsers, deleteUser }
  )(UsersIndex)
);
