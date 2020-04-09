import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Link from "react-router-dom/es/Link";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
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
