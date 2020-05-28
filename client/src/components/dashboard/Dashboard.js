import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Navbar, NavbarBrand , Button} from 'reactstrap';
import Link from "react-router-dom/es/Link";
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery';

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
        <div className="App">
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

            <div className="container">
              <div className="row">
              </div>
              <div className="row p-5">
                <div className="col-12 col-sm-2">

                </div>

                <div className="col-12 col-sm-5 d-flex align-items-center border border-light p-5">
                  <figure className="figure text-center">
                    <Link to="/ManageLibrary">
                      <img src="assets/images/bookicon.png" className="mx-auto d-block img-fluid " alt="Manage Library"/>
                      <figcaption className="figure-caption text-center"><strong>Manage Library</strong></figcaption>
                    </Link>
                  </figure>
                </div>

                <div className="col-12 col-sm-5 p-5 justify-content-center">
                  <figure className="figure text-center">
                    <Link to="/ManageSports">
                      <img src="assets/images/sportsicon.png" className="mx-auto d-block  img-fluid " alt="Manage Sports"/>
                      <figcaption className="figure-caption text-center"><strong>Manage Sports</strong></figcaption>
                    </Link>
                  </figure>
                </div>
              </div>
            </div>
        </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
