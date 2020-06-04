import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Navbar, NavbarBrand , Button} from 'reactstrap';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Tab from 'react-bootstrap/Tab';
import 'react-bootstrap';
import NewUser from "./NewUser";
import FindForm from "./FindForm";
import AddForm from "./AddForm";
import DelForm from "./DelForm";
import NewLoan from "./NewLoan";
import SearchStudentRecord from "./SearchStudentRecord";
import SendReminder from "./SendReminder";
import RemoveUser from "./RemoveStudent";
import FinePayement from "./FinePayement";
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
              <NavbarBrand>
                <img src="assets/images/navbarlogo.png" className="rounded float-left nav-logo" alt="SLEM" height="59" width="55"/>
                <h1 height="65" width="55"><strong>LEM</strong></h1>
              </NavbarBrand>
              </div>
              <div className="col-xs-6 d-flex justify-content-end">
                <Button color="primary" className="fa fa-sign-out" onClick={this.onLogoutClick}>logout</Button>
              </div>
            </div>
          </Navbar>
          <div >
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb bg-dark ">
                  <li className="breadcrumb-item" ><a href="/dashboard" className="text-light">Home</a></li>
                  <li className="breadcrumb-item "><a href="#" className="text-light" active="true" >Manage Library</a></li>
                </ol>
            </nav>
          </div>
          <hr />

          <div className="container-fluid">
            <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link5">
              <div className="row">
                <div className="col col-sm-3">
                  <ListGroup >
                    <ListGroup.Item action href="#link3" className="p-4 d-flex justify-content-around"><i className="fa fa-user-plus">Users</i></ListGroup.Item>
                    <ListGroup.Item action href="#link4" className="p-4 d-flex justify-content-around"><i className="fa fa-address-card-o">Loans</i></ListGroup.Item>
                    <ListGroup.Item action href="#link5" className="p-4 d-flex justify-content-around"><i className="fa fa-book">Books</i></ListGroup.Item>
                  </ListGroup>
                </div>
                <div className="col col-sm-9" >
                  <Tab.Content>

                    <Tab.Pane eventKey="#link3">
                      <div>
                        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link31">
                          <div className="container">
                            <div className="row">
                              <ListGroup horizontal>
                                <ListGroup.Item action href="#link31" className="p-4 d-flex justify-content-around"><i className="fa fa-plus">New Student</i></ListGroup.Item>
                                <ListGroup.Item action href="#link32" className="p-4 d-flex justify-content-around"><i className="fa fa-remove">Remove Student</i></ListGroup.Item>
                                <ListGroup.Item action href="#link33" className="p-4 d-flex justify-content-around"><i className="fa fa-money">Fine Payement</i></ListGroup.Item>
                              </ListGroup>
                            </div>
                            <div className="row">
                              <Tab.Content>
                                <Tab.Pane eventKey="#link31">
                                  <div>
                                    <NewUser />

                                  </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link32">
                                  <div>
                                    <RemoveUser />
                                  </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link33">
                                  <div>
                                    <FinePayement />
                                  </div>
                                </Tab.Pane>
                                
                              </Tab.Content>
                            </div>
                          </div>
                        </Tab.Container>
                      </div>
                    </Tab.Pane>

                    <Tab.Pane eventKey="#link4">
                      <div>
                        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link40">
                          <div className="container">
                            <div className="row">
                              <ListGroup horizontal>
                                <ListGroup.Item action href="#link40" className="p-4 d-flex justify-content-around"><i className="fa fa-search">Search Student Loan</i></ListGroup.Item>
                                <ListGroup.Item action href="#link41" className="p-4 d-flex justify-content-around"><i className="fa fa-plus">New Loan</i></ListGroup.Item>
                                <ListGroup.Item action href="#link43" className="p-4 d-flex justify-content-around"><i className="fa fa-trash-o">Return Loan</i></ListGroup.Item>
                                <ListGroup.Item action href="#link46"><i className="fa fa-envelope">Send Reminders via Email </i></ListGroup.Item>
                              </ListGroup>
                            </div>
                            <div className="row">
                              <Tab.Content>
                                <Tab.Pane eventKey="#link40">
                                  <div>
                                    <SearchStudentRecord />

                                  </div>
                                </Tab.Pane>

                                <Tab.Pane eventKey="#link41">
                                  <div>
                                    <NewLoan />

                                  </div>
                                </Tab.Pane>
                               
                                <Tab.Pane eventKey="#link43">
                                  <div>

                                  </div>
                                </Tab.Pane>
                                
                                <Tab.Pane eventKey="#link46">
                                  <div>
                                    <SendReminder />

                                  </div>
                                </Tab.Pane>

                              </Tab.Content>
                            </div>
                          </div>
                        </Tab.Container>
                      </div>
                    </Tab.Pane>

                    <Tab.Pane eventKey="#link5">
                      <div>
                        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link50">
                          <div className="container">
                            <div className="row">
                              <ListGroup horizontal>
                                <ListGroup.Item action href="#link50" className="col-4 p-4 d-flex justify-content-around"><i className="fa fa-search">Search Book</i></ListGroup.Item>
                                <ListGroup.Item action href="#link51" className="col-4 p-4 d-flex justify-content-around"><i className="fa fa-plus">New Book</i></ListGroup.Item>
                                <ListGroup.Item action href="#link53" className="col-4 p-4 d-flex justify-content-around"><i className="fa fa-trash-o">Delete</i></ListGroup.Item>
                              </ListGroup>
                            </div>
                            <div className="row">
                              <Tab.Content>
                              <Tab.Pane eventKey="#link50">
                                  <div>
                                  <FindForm />

                                  </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link51">
                                  <div>
                                    <AddForm />

                                  </div>
                                </Tab.Pane>
                               
                                <Tab.Pane eventKey="#link53">
                                  <div>
                                    <DelForm />
                                  </div>
                                </Tab.Pane>

                              </Tab.Content>
                            </div>
                          </div>
                        </Tab.Container>
                      </div>
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
