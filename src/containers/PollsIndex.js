import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import SweetAlert from 'sweetalert2-react';
import GridCard from '../components/GridCard';
import { getPolls, deletePoll } from '../store/actions/pollsActions';

const ContainerIcons = styled.div`
  cursor: pointer;
`;

class UsersIndex extends Component {
  state = {
    showSwal: false,
    idToDelete: null,
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.allPolls !== nextProps.allPolls) {
      return true;
    }
    if (this.state.showSwal !== nextState.showSwal) {
      return true;
    }

    return false;
  }

  componentDidMount() {
    if (this.props.allPolls === null) {
      this.props.getPolls();
    }
  }

  handleEdit = e => {
    const id = e.target.getAttribute('data-id');
    this.props.history.push('/encuestas/' + id);
  };

  handleDelete = () => {
    this.props.deletePoll(this.state.idToDelete);
    this.setState({
      showSwal: false,
      idToDelete: null,
    });
  };

  handleDeleteConfirm = e => {
    const id = e.target.getAttribute('data-id');
    this.setState({ showSwal: true, idToDelete: id });
  };

  handleCancel = () => {
    this.setState({ showSwal: false, idToDelete: null });
  };

  render() {
    if (!this.props.allPolls) return null;

    // const headerSortingStyle = { color: "red" };

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

    const polls = this.props.allPolls;
    const columns = [
      {
        dataField: 'id',
        text: 'ID',
        hidden: true,
      },
      {
        dataField: 'name',
        text: 'Nombre',
        sort: true,
      },
      {
        dataField: 'description',
        text: 'Descripción',
      },
      {
        dataField: 'id',
        text: 'Acciones',
        formatter: actionsFormatter,
      },
    ];

    return (
      <div>
        <GridCard
          title={'Encuestas'}
          subTitle={'Listado de Encuestas'}
          resource={'encuestas'}
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
            keyField={'id'}
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
    loading: state.notifications.loading,
  };
};

export default connect(
  mapStateToProps,
  { getPolls, deletePoll }
)(UsersIndex);
