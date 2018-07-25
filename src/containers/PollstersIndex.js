import React, { PureComponent } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import SweetAlert from "sweetalert2-react";
import GridCard from "../components/GridCard";
import {
  getPollsters,
  deletePollster
} from "../store/actions/pollstersActions";

import {
  imageFormatter,
  citiesFormatter,
  activeFormatter
} from "../utils/util";

const ContainerIcons = styled.div`
  cursor: pointer;
`;

class PolltersIndex extends PureComponent {
  state = {
    showSwal: false,
    idToDelete: null
  };

  componentDidMount() {
    if (this.props.allPollsters === null) {
      this.props.getPollsters();
    }
  }

  handleEdit = e => {
    const id = e.target.getAttribute("data-id");
    console.log(id);
    this.props.history.push("/encuestadores/" + id);
  };

  handleDelete = () => {
    this.props.deletePollster(this.state.idToDelete);
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
    if (!this.props.allPollsters) return null;

    const actionsFormatter = (cell, row, rowIndex) => {
      return (
        <ContainerIcons className="d-flex justify-content-around align-items-center">
          <i
            data-id={row.id}
            className="material-icons text-info rounded-icon"
            onClick={this.handleEdit}
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
        formatter: imageFormatter
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
        dataField: "dni",
        text: "DNI"
      },
      {
        dataField: "Poll.name",
        text: "Encuesta"
      },
      {
        dataField: "active",
        headerClasses: "datatable-sortable",
        text: "Activo",
        sort: true,
        formatter: activeFormatter
      },
      {
        dataField: "cities",
        text: "Localidad",
        formatter: citiesFormatter
      },
      {
        dataField: "id",
        text: "Acciones",
        headerClasses: "datatable-actions",
        formatter: actionsFormatter
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
            show={this.state.showSwal}
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
            className="BootrstrapTable"
            data={pollsters}
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
    allPollsters: state.pollsters.pollsters,
    loading: state.notifications.loading
  };
};

export default connect(
  mapStateToProps,
  { getPollsters, deletePollster }
)(PolltersIndex);
