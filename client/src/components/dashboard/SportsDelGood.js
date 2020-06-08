import React, { Component } from "react";
import  { DeleteGood } from "../../crudActions/DeleteGood";
import Button from 'react-bootstrap/Button';
import { Col } from 'react-bootstrap';
import PropTypes from "prop-types"
import {connect} from "react-redux";
import axios from 'axios';
import FlashMessage from "react-flash-message";
import Form from "react-bootstrap/Form";

class SportsDelGood extends Component{
    constructor(props) {
        super(props);
        this.state = {
            goodID: "",
            error: "",
            msgSuccess: "",
            msgFail: ""
        };
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onDeletePress = e => {
        this.setState({msgSuccess: null, msgFail: null});
        e.preventDefault();
        this.makeCall()
            .then(data => {
                if(data.error === true){
                    this.setState({
                        error: true,
                        msgFail: <FlashMessage duration={3000}><p style={{color: "red", fontStyle: "italic"}}>{data.message}</p></FlashMessage>
                    });
                }
                else{
                    this.setState({
                        error: false,
                        msgSuccess: <FlashMessage duration={3000}><p style={{color: "green", fontStyle: "italic"}}>{data.message}</p></FlashMessage>
                    })
                }
            })
    };
    makeCall = () => {
        return axios
                .delete(`/api/sports/delete/${this.state.goodID}`)
                .then(response =>{ return response.data;})
                .catch(error => { return error.response.data;});
    }
    render(){
        return (
            <div>
                <h2>Delete Good</h2>
            <div className="container p-5 rounded mb-0 block-example border border-light">
                <Form noValidate onSubmit={this.onSubmit}>
                    <Form.Group as={Col} >
                        <Form.Row>
                            <Form.Label column lg={4}>
                                Good ID
                            </Form.Label>
                            <Col>
                                <Form.Control id="goodID" type="text" placeholder="Enter goodID" onChange={this.onChange} value={this.state.goodID}/>
                            </Col>
                        </Form.Row>
                    </Form.Group>

                    <div className="row ml-auto">
                        <div className="col-xs-2  p-2 block-example ml-auto">
                            <Button variant="primary" type = "button" className="fa fa-search" onClick={this.onDeletePress}>Remove</Button>
                        </div>
                        <div className="col-xs-2  p-2 block-example ">
                            <Button variant="light" type = "button" className="fa fa-undo">Reset</Button>
                        </div>
                    </div>
                    </Form>
                <div>
                    {(this.state.error) ? this.state.msgFail : this.state.msgSuccess}
                </div>

            </div>

            </div>
        );
    }
}

SportsDelGood.propTypes = {
    DeleteGood: PropTypes.func.isRequired,
    goodID: PropTypes.string
};

const mapStateToProps = state => ({
    goodID: state.goodID
});

export default connect(
    mapStateToProps,
    {DeleteGood}
)(SportsDelGood);
