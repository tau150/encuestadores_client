import React, { Component } from 'react';
import SidebarLink from '../components/SidebarLink';
import { Link } from 'react-router-dom';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

class LayoutSimple extends Component {
  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    let links;

    if (this.props.role === 1) {
      links = (
        <div>
          <SidebarLink
            icon={'perm_identity'}
            pathName={'Usuarios'}
            path="/usuarios"
          />
          <SidebarLink
            icon={'assignment'}
            pathName={'Encuestas'}
            path="/encuestas"
          />
          <SidebarLink
            icon={'assignment_ind'}
            pathName={'Encuestadores'}
            path="/encuestadores"
          />
        </div>
      );
    } else if (this.props.role === 2) {
      links = (
        <div>
          <SidebarLink
            icon={'assignment'}
            pathName={'Encuestas'}
            path="/encuestas"
          />
          <SidebarLink
            icon={'assignment_ind'}
            pathName={'Encuestadores'}
            path="/encuestadores"
          />
        </div>
      );
    } else if (this.props.role === 3) {
      links = (
        <SidebarLink
          icon={'assignment_ind'}
          pathName={'Encuestadores'}
          path="/encuestadores"
        />
      );
    }

    return (
      <div>
        <div className="container-fluid general-container">
          <div className="row">
            <div className="sidebar col-2">
              <h5 className="text-center m-5">DPE</h5>
              <div className="dropdown-divider" />
              {links}
            </div>
            <div className="col-10">
              <div>
                <Navbar color="none" className="navMenu" light expand="md">
                  <NavbarBrand href="/" />
                  <NavbarToggler onClick={this.toggle} />
                  <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                      <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle
                          nav
                          caret
                          className="d-flex align-items-center"
                        >
                          <i className="material-icons pr-2">account_circle</i>
                          {this.props.userName}
                        </DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem onClick={this.props.logout}>
                            <i className="material-icons pr-2">exit_to_app</i>
                            Cerrar sesión
                          </DropdownItem>
                          <DropdownItem>
                            <Link to="/cambiarClave" className="linkNoStyle">
                              <i className="material-icons pr-2">security</i>
                              Cambiar Contraseña
                            </Link>
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </Nav>
                  </Collapse>
                </Navbar>
              </div>
              <div className="main-content">{this.props.children}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LayoutSimple;
