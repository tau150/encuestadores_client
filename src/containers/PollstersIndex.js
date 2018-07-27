import React, { PureComponent } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { compose } from "recompose";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import SweetAlert from "sweetalert2-react";
import GridCard from "../components/GridCard";
import ImageFormatter from "../hoc/ImageFormatter";
import ActiveFormatter from "../hoc/ActiveFormatter";
import ListFormatter from "../hoc/ListFormatter";
import ActionsFormatter from "../hoc/ActionsFormatter";
import { getPollsters } from "../store/actions/pollstersActions";

class PolltersIndex extends PureComponent {
  componentDidMount() {
    if (this.props.allPollsters === null) {
      this.props.getPollsters();
    }
  }

  render() {
    if (!this.props.allPollsters) return null;

    const pollsters = this.props.allPollsters;
    const columns = [
      {
        dataField: "id",
        text: "ID",
        hidden: true
      },
      {
        dataField: "img",
        text: "Perfil",
        formatter: this.props.imgFormatter
      },
      {
        dataField: "name",
        text: "Nombre",
        headerClasses: "datatable-sortable",
        sort: true,
        filter: textFilter({
          className: "search-datatable",
          placeholder: "Buscar"
        })
      },
      {
        dataField: "surname",
        text: "Apellido",
        headerClasses: "datatable-sortable",
        sort: true,
        filter: textFilter({
          className: "search-datatable",
          placeholder: "Buscar"
        })
      },
      {
        dataField: "dni",
        text: "DNI",
        filter: textFilter({
          className: "search-datatable",
          placeholder: "Buscar.."
        })
      },
      {
        dataField: "jobPosition",
        text: "Cargo",
        headerClasses: "datatable-sortable",
        sort: true
      },
      {
        dataField: "Poll.name",
        text: "Encuesta",
        headerClasses: "datatable-sortable",
        sort: true
      },
      {
        dataField: "active",
        headerClasses: "datatable-sortable",
        text: "Activo",
        sort: true,
        formatter: this.props.activeFormatter
      },
      {
        dataField: "cities",
        text: "Localidad",
        formatter: this.props.listFormatter
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
          title={"Encuestadores"}
          subTitle={"Listado de Encuestadores"}
          resource={"encuestadores"}
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
            onCancel={this.handleCancel}
          />
          <BootstrapTable
            keyField={"id"}
            className="BootrstrapTable"
            data={pollsters}
            columns={columns}
            pagination={paginationFactory()}
            filter={filterFactory()}
          />
        </GridCard>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allPollsters: state.pollsters.pollsters,
    loading: state.notifications.loading
  };
};

const enhance = compose(
  ImageFormatter,
  ListFormatter,
  ActiveFormatter,
  ActionsFormatter("encuestadores"),
  connect(
    mapStateToProps,
    { getPollsters }
  )
);
export default enhance(PolltersIndex);

// export default imageFormatter(
//   connect(
//     mapStateToProps,
//     { getPollsters, deletePollster }
//   )(PolltersIndex)
// );
