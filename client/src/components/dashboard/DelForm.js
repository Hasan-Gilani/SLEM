import React, { Component } from "react";
import  { delBook } from "../../crudActions/deleteBook";
import PropTypes from "prop-types"
import {connect} from "react-redux";
import axios from 'axios';
import FlashMessage from "react-flash-message";
import Form from "react-bootstrap/Form";
import {Col} from "react-bootstrap";
import Button from "react-bootstrap/Button";

class DelForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isbn: "",
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
                console.log(data);
                if(data.error === true){
                    this.setState({
                        error: true,
                        msgFail: <FlashMessage duration={3000}><p style={{color: "red", fontStyle: "italic"}}>{data.message}</p></FlashMessage>
                    });
                }
                else{
                    this.setState({
                        error: false,
                        msgFail: <FlashMessage duration={3000}><p style={{color: "green", fontStyle: "italic"}}>{data.message}</p></FlashMessage>
                    })
                }
            })
    };
    makeCall = () => {
        return axios
                .delete(`/api/books/deleteBook/${this.state.isbn}`)
                .then(response =>{ return response.data;})
                .catch(error => { return error.response.data;});
    }
    render(){
        return(
            <div>
                <div className="container p-5 rounded mb-0 block-example border border-light">
                    <Form>
                        <Form.Group as={Col} >
                            <Form.Row>
                                <Form.Label column lg={2}>
                                    ISBN
                                </Form.Label>
                                <Col>
                                    <Form.Control id="isbn" type="text" placeholder="Enter ISBN " onChange={this.onChange} value={this.state.isbn}/>
                                </Col>
                            </Form.Row>
                        </Form.Group>

                        <div className="row ml-auto">
                            <div className="col-xs-2  p-2 block-example ml-auto">
                                <Button variant="primary" type = "button" className="fa fa-search" onClick={this.onDeletePress}>Delete</Button>
                            </div>
                            <div className="col-xs-2  p-2 block-example ">
                                <Button variant="light" type = "button" className="fa fa-undo">Reset</Button>
                            </div>
                        </div>
                    </Form>
                    <div className="detail_form">
                        {(this.state.error) ? this.state.msgFail : this.state.msgSuccess}

                    </div>
                </div>

            </div>
        );
    }
}

DelForm.propTypes = {
    delBook: PropTypes.func.isRequired,
    isbn: PropTypes.string
};

const mapStateToProps = state => ({
    isbn: state.isbn
});

export default connect(
    mapStateToProps,
    {delBook}
)(DelForm);
