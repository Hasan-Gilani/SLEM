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
import 'react-bootstrap';
import NewUser from "./NewUser";
import Findform from "./FindForm";
import AddForm from "./AddForm";
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
                <div className="col col-sm-3">
                  <ListGroup >
                    <ListGroup.Item action href="#link1" className="p-4 d-flex justify-content-around"><i className="fa fa-history">Audit Logs</i></ListGroup.Item>
                    <ListGroup.Item action href="#link2" className="p-4 d-flex justify-content-around"><i className="fa fa-cog">Settings</i></ListGroup.Item>
                    <ListGroup.Item action href="#link3" className="p-4 d-flex justify-content-around"><i className="fa fa-user-plus">Users</i></ListGroup.Item>
                    <ListGroup.Item action href="#link4" className="p-4 d-flex justify-content-around"><i className="fa fa-address-card-o">Loans</i></ListGroup.Item>
                    <ListGroup.Item action href="#link5" className="p-4 d-flex justify-content-around"><i className="fa fa-book">Books</i></ListGroup.Item>
                  </ListGroup>
                </div>
                <div className="col col-sm-9" >
                  <Tab.Content>
                  
                    <Tab.Pane eventKey="#link1">
                      <div>
                        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link11">
                          <div className="container">
                            <div className="row">
                              <ListGroup horizontal>
                                <ListGroup.Item action href="#link11" className="p-4 d-flex justify-content-around"><i className="fa fa-plus">New</i></ListGroup.Item>
                                <ListGroup.Item action href="#link12" className="p-4 d-flex justify-content-around"><i className="fa fa-upload">Import</i></ListGroup.Item>
                                <ListGroup.Item action href="#link13" className="p-4 d-flex justify-content-around"><i className="fa fa-remove">Remove</i></ListGroup.Item>
                                <ListGroup.Item action href="#link14" className="p-4 d-flex justify-content-around"><i className="fa fa-check">enable</i></ListGroup.Item>
                                <ListGroup.Item action href="#link15" className="p-4 d-flex justify-content-around"><i className="fa fa-ban">Disable</i></ListGroup.Item>
                                <ListGroup.Item action href="#link16"><i className="fa fa-history">Audit Logs</i></ListGroup.Item>
                                <ListGroup.Item action href="#link17" ><i className="fa fa-download">Export to Excel</i></ListGroup.Item>
                              </ListGroup>
                            </div>
                            <div className="row">
                              <Tab.Content>
                                <Tab.Pane eventKey="#link11">
                                  <div>

                                  </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link12">
                                  <div>

                                  </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link13">
                                  <div>

                                  </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link14">
                                  <div>

                                  </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link15">
                                  <div>

                                  </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link16">
                                  <div>

                                  </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link17">
                                  <div>

                                  </div>
                                </Tab.Pane>
                              </Tab.Content>
                            </div>
                          </div>
                        </Tab.Container>
                      </div>
                    </Tab.Pane>

                    <Tab.Pane eventKey="#link2">
                      <div>
                        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link21">
                          <div className="container">
                            <div className="row">
                              <ListGroup horizontal>
                                <ListGroup.Item action href="#link21" className="p-4 d-flex justify-content-around"><i className="fa fa-plus">New</i></ListGroup.Item>
                                <ListGroup.Item action href="#link22" className="p-4 d-flex justify-content-around"><i className="fa fa-upload">Import</i></ListGroup.Item>
                                <ListGroup.Item action href="#link23" className="p-4 d-flex justify-content-around"><i className="fa fa-remove">Remove</i></ListGroup.Item>
                                <ListGroup.Item action href="#link24" className="p-4 d-flex justify-content-around"><i className="fa fa-check">enable</i></ListGroup.Item>
                                <ListGroup.Item action href="#link25" className="p-4 d-flex justify-content-around"><i className="fa fa-ban">Disable</i></ListGroup.Item>
                                <ListGroup.Item action href="#link26"><i className="fa fa-history">Audit Logs</i></ListGroup.Item>
                                <ListGroup.Item action href="#link27" ><i className="fa fa-download">Export to Excel</i></ListGroup.Item>
                              </ListGroup>
                            </div>
                            <div className="row">
                              <Tab.Content>
                                <Tab.Pane eventKey="#link21">
                                  <div>
                                    <NewUser />

                                  </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link22">
                                  <div>

                                  </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link23">
                                  <div>

                                  </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link24">
                                  <div>

                                  </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link25">
                                  <div>

                                  </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link26">
                                  <div>

                                  </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link27">
                                  <div>

                                  </div>
                                </Tab.Pane>
                              </Tab.Content>
                            </div>
                          </div>
                        </Tab.Container>
                      </div>
                    </Tab.Pane>

                    <Tab.Pane eventKey="#link3">
                      <div>
                        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link31">
                          <div className="container">
                            <div className="row">
                              <ListGroup horizontal>
                                <ListGroup.Item action href="#link31" className="p-4 d-flex justify-content-around"><i className="fa fa-plus">New</i></ListGroup.Item>
                                <ListGroup.Item action href="#link32" className="p-4 d-flex justify-content-around"><i className="fa fa-upload">Import</i></ListGroup.Item>
                                <ListGroup.Item action href="#link33" className="p-4 d-flex justify-content-around"><i className="fa fa-remove">Remove</i></ListGroup.Item>
                                <ListGroup.Item action href="#link34" className="p-4 d-flex justify-content-around"><i className="fa fa-check">enable</i></ListGroup.Item>
                                <ListGroup.Item action href="#link35" className="p-4 d-flex justify-content-around"><i className="fa fa-ban">Disable</i></ListGroup.Item>
                                <ListGroup.Item action href="#link36"><i className="fa fa-history">Audit Logs</i></ListGroup.Item>
                                <ListGroup.Item action href="#link37" ><i className="fa fa-download">Export to Excel</i></ListGroup.Item>
                              </ListGroup>
                            </div>
                            <div className="row">
                              <Tab.Content>
                                  <div>
                                    <NewUser />
                                  </div>
                                <Tab.Pane eventKey="#link31">
                                  <div>
                                    <NewUser />

                                  </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link32">
                                  <div>

                                  </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link33">
                                  <div>

                                  </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link34">
                                  <div>

                                  </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link35">
                                  <div>

                                  </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link36">
                                  <div>

                                  </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link37">
                                  <div>

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
                        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link41">
                          <div className="container">
                            <div className="row">
                              <ListGroup horizontal>
                                <ListGroup.Item action href="#link41" className="p-4 d-flex justify-content-around"><i className="fa fa-plus">New</i></ListGroup.Item>
                                <ListGroup.Item action href="#link42" className="p-4 d-flex justify-content-around"><i className="fa fa-upload">Import</i></ListGroup.Item>
                                <ListGroup.Item action href="#link43" className="p-4 d-flex justify-content-around"><i className="fa fa-trash-o">Delete</i></ListGroup.Item>
                                <ListGroup.Item action href="#link44"><i className="fa fa-history">Audit Logs</i></ListGroup.Item>
                                <ListGroup.Item action href="#link45" ><i className="fa fa-download">Export to Excel</i></ListGroup.Item>
                                <ListGroup.Item action href="#link46"><i className="fa fa-envelope">Send Reminders via Email </i></ListGroup.Item>
                              </ListGroup>
                            </div>
                            <div className="row">
                              <Tab.Content>
                                <Tab.Pane eventKey="#link41">
                                  <div>
                                    <NewUser />

                                  </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link42">
                                  <div>

                                  </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link43">
                                  <div>

                                  </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link44">
                                  <div>

                                  </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link45">
                                  <div>

                                  </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link46">
                                  <div>

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
                                <ListGroup.Item action href="#link50" className="p-4 d-flex justify-content-around"><i className="fa fa-search">Search</i></ListGroup.Item>
                                <ListGroup.Item action href="#link51" className="p-4 d-flex justify-content-around"><i className="fa fa-plus">New</i></ListGroup.Item>
                                <ListGroup.Item action href="#link52" className="p-4 d-flex justify-content-around"><i className="fa fa-upload">Import</i></ListGroup.Item>
                                <ListGroup.Item action href="#link53" className="p-4 d-flex justify-content-around"><i className="fa fa-trash-o">Delete</i></ListGroup.Item>
                                <ListGroup.Item action href="#link54"><i className="fa fa-history">Audit Logs</i></ListGroup.Item>
                                <ListGroup.Item action href="#link55" ><i className="fa fa-download">Export to Excel</i></ListGroup.Item>
                              </ListGroup>
                            </div>
                            <div className="row">
                              <Tab.Content>
                              <Tab.Pane eventKey="#link50">
                                  <div>
                                  <Findform />

                                  </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link51">
                                  <div>
                                    <AddForm />

                                  </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link52">
                                  <div>

                                  </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link53">
                                  <div>

                                  </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link54">
                                  <div>

                                  </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link55">
                                  <div>

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
