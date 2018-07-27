import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import SweetAlert from "sweetalert2-react";
import GridCard from "../components/GridCard";
import { getUsers } from "../store/actions/usersActions";
import ActionsFormatter from "../hoc/ActionsFormatter";
import ActiveFormatter from "../hoc/ActiveFormatter";
import ListFormatter from "../hoc/ListFormatter";

class UsersIndex extends PureComponent {
  componentDidMount() {
    if (this.props.allUsers === null) {
      this.props.getUsers();
    }
  }

  render() {
    if (!this.props.allUsers) return null;

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
            onConfirm={this.props.handleDelete}
            onCancel={this.props.handleCancel}
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

const enhance = compose(
  ListFormatter,
  ActiveFormatter,
  ActionsFormatter("usuarios"),
  connect(
    mapStateToProps,
    { getUsers }
  )
);
export default enhance(UsersIndex);
