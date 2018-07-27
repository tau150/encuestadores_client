import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import SweetAlert from "sweetalert2-react";
import GridCard from "../components/GridCard";
import { getPolls } from "../store/actions/pollsActions";
import ActionsFormatter from "../hoc/ActionsFormatter";
import ActiveFormatter from "../hoc/ActiveFormatter";
import ListFormatter from "../hoc/ListFormatter";

class PollsIndex extends PureComponent {
  componentDidMount() {
    if (this.props.allPolls === null) {
      this.props.getPolls();
    }
  }

  render() {
    if (!this.props.allPolls) return null;

    const polls = this.props.allPolls;
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
        dataField: "description",
        text: "Descripción"
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
          title={"Encuestas"}
          subTitle={"Listado de Encuestas"}
          resource={"encuestas"}
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
            data={polls}
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
    allPolls: state.polls.polls,
    loading: state.notifications.loading
  };
};

const enhance = compose(
  ListFormatter,
  ActiveFormatter,
  ActionsFormatter("encuestas"),
  connect(
    mapStateToProps,
    { getPolls }
  )
);
export default enhance(PollsIndex);
