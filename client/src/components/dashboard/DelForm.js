import React, { Component } from "react";
import  { delBook } from "../../crudActions/deleteBook";
import PropTypes from "prop-types"
import {connect} from "react-redux";
import axios from 'axios';
import FlashMessage from "react-flash-message";

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
    onSubmit = e => {
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
            <div className="container">
                <div style={{marginTop: "4rem"}} className="row">
                    <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                        <h4>
                            <b>Delete Book</b>
                        </h4>
                    </div>
                    <div className="input-field col s-12" style={{
                        marginLeft:"20px"
                    }}>
                        <form noValidate onSubmit={this.onSubmit}>
                            <h6>Enter isbn </h6>
                            <input
                                onChange={this.onChange}
                                value={this.state.isbn}
                                id="isbn"
                                type='text'
                            />
                            <button
                                style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem"
                                }}
                                type="submit"
                                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                            >
                                Delete
                            </button>
                        </form>
                        <div>
                            {(this.state.error) ? this.state.msgFail : this.state.msgSuccess}
                        </div>
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
