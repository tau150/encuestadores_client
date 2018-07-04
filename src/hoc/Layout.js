import React, { Component } from "react";
import SidebarLink from "../components/SidebarLink";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

const Layout = WrappedComponent => {
  class HOC extends Component {
    state = {
      isOpen: false
    };
    toggle = () => {
      this.setState({
        isOpen: !this.state.isOpen
      });
    };

    render() {
      return (
        <div>
          <div className="container-fluid general-container">
            <div className="row">
              <div className="sidebar col-2">
                <h5 className="text-center m-5">DPE</h5>
                <div class="dropdown-divider" />
                <SidebarLink
                  icon={"check_circle"}
                  pathName={"Usuarios"}
                  path="/users"
                />
                <SidebarLink
                  icon={"check_circle"}
                  pathName={"Usuarios"}
                  path="/users"
                />
              </div>
              <div className="col-10">
                <div>
                  <Navbar color="none" className="navMenu" light expand="md">
                    <NavbarBrand href="/" />
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                      <Nav className="ml-auto" navbar>
                        <UncontrolledDropdown nav inNavbar>
                          <DropdownToggle nav caret>
                            {this.props.Username}
                          </DropdownToggle>
                          <DropdownMenu right>
                            <DropdownItem>Cerrar sesión</DropdownItem>
                            <DropdownItem>Cambiar Contraseña</DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </Nav>
                    </Collapse>
                  </Navbar>
                </div>
                <div className="main-content">
                  <WrappedComponent {...this.props} />;
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  return HOC;
};

export default Layout;
