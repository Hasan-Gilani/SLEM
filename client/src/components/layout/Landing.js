import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
        <div className="row">
          <div className="col s12 center-align">
            <br />
              <div className="row">
                  <img src={require("./Logo.png")}/>
              </div>
            <div className="row">
            <div className="col s12">
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn mb-2 waves-effect waves-light hoverable purple accent-3"
              >
                Log In
              </Link>
            </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Landing;
