import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Link from "react-router-dom/es/Link";
import { Navbar, NavbarBrand , Button} from 'reactstrap';
import 'font-awesome/css/font-awesome.min.css';

class ManageSports extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
        <div>
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
      <div style={{ height: "75vh" }} className="container halign-wrapper">
          <div className="row">
              <Link
                  to="/Addform"
                  style={{
                      width: "150px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem"
                  }}

                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                  Add Book
              </Link>
          </div>
          <div className="row">
              <Link
                  to="/Delform"
                  style={{
                      width: "150px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem"
                  }}

                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                  Delete Book
              </Link>
          </div>
          <div className="row">
              <Link
                  to="/Findform"
                  style={{
                      width: "150px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem"
                  }}

                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                  Find Book
              </Link>
          </div>


          <div className="row">
              <button
                  style={{
                      width: "150px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem"
                  }}
                  onClick={this.onLogoutClick}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                  Logout
              </button>
          </div>
      </div>
      </div>
    );
  }
}

ManageSports.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(ManageSports);
