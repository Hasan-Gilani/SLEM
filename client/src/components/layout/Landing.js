import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div className="bg-img">
        <div className="col-12" id="maincontainer">
          <div className="row row-content align-items-center" >
            
            <div className="col-12">
              <img src={require("./Logo.png")}/>
            </div>

            <div className="col-12 ">
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "6px",
                  letterSpacing: "2.5px"
                }}
                className="btn mb-2 waves-effect waves-light hoverable blue accent-3 "
              >
                <b>Log In</b>
              </Link>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
