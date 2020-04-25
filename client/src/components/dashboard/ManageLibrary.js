import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Link from "react-router-dom/es/Link";
import { Navbar, NavbarBrand , Button} from 'reactstrap';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Tab from 'react-bootstrap/Tab';
import 'react-bootstrap'

class ManageLibrary extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
        <div >
          <Navbar dark color="primary" >
            <div className="container-fluid">
              <div className="col-xs-6">
                <Link to="/dashboard">
                  <NavbarBrand><img src="assets/images/navbarlogo.png" className="rounded float-left nav-logo" alt="SLEM" height="59" width="55"/>
                  <h1 height="65" width="55"><strong>LEM</strong></h1></NavbarBrand>

                </Link>
              </div>
              <div className="col-xs-6 d-flex justify-content-end">
                <Button color="primary" className="fa fa-sign-out" onClick={this.onLogoutClick}>logout</Button>
              </div>
            </div>
          </Navbar>
          <div >
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb bg-dark ">
                  <li class="breadcrumb-item" ><a href="/dashboard" class="text-light">Home</a></li>
                  <li class="breadcrumb-item "><a href="#" class="text-light" active>Manage Library</a></li> 
                </ol>      
            </nav>
          </div>
          <hr />

          <div className="container-fluid">
            <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
              <div className="row">
                <div className="col-xs-4">
                  <ListGroup variant="flush">
                    <ListGroup.Item action href="#link1">Audit Logs</ListGroup.Item>
                    <ListGroup.Item action href="#link2">Settings</ListGroup.Item>
                    <ListGroup.Item action href="#link3">Users</ListGroup.Item>
                    <ListGroup.Item action href="#link4">Loans</ListGroup.Item>
                    <ListGroup.Item action href="#link5">Books</ListGroup.Item>
                  </ListGroup>
                </div>
                <div className="col-xs-8">
                  <Tab.Content>
                  
                    <Tab.Pane eventKey="#link1">
                      <p>1</p>
                      {/* <Sonnet /> */}
                    </Tab.Pane>

                    <Tab.Pane eventKey="#link2">
                      <p>22</p>
                    </Tab.Pane>

                    <Tab.Pane eventKey="#link3">
                      <p>33</p>
                    </Tab.Pane>

                    <Tab.Pane eventKey="#link4">
                      <p>44</p>
                    </Tab.Pane>

                    <Tab.Pane eventKey="#link5">
                      <p>55</p>
                    </Tab.Pane>
                  </Tab.Content>
                </div>
              </div>
            </Tab.Container>
              {/* <div className="col-xs-3">
              

              </div>
              <div className="col-xs-9">

              </div> */}

         

          </div>
      </div>
    );
  }
}

ManageLibrary.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(ManageLibrary);
