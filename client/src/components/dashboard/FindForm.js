import React, { Component } from "react";
import axios from "axios";
import Book from "./Book";
import LoanInfo from "./LoanInfo";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import FlashMessage from "react-flash-message";

class FindForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            isbn: "",
            book_form: null,
            loanForm: [],
            error: false,
            msgSuccess: null,
            msgFail: null,
        }
    }

    onChange = e => {
        this.setState({
            [e.target.id]: e.target.value,

        })
    };
    makeCall = () => {
        return axios
            .get(`/api/records/findRecord/${this.state.isbn}`)
            .then( (response) => {
                return response.data
            })
            .catch(error => {
                return error.response.data;
            })
    }
    onFindPress = (e) => {
        this.setState({msgFail: null, loanForm: []})
        e.preventDefault();
        this.makeCall()
            .then(data => {
            if(data.error === true){  //book doesn't exist.
                this.setState({
                    error: true,
                    msgFail: <FlashMessage duration={3000}><p style={{color: "red", fontStyle: "italic"}}>{data.message}</p></FlashMessage>
                });
            }
            else{
                let x = (Object.keys(data)).filter(key => {
                    return (typeof data[key]) === "object";
                });
                let loanArray = []
                x.forEach(id => {
                    if(id !== 'bookInfo'){
                        loanArray.push(<LoanInfo id={id} loanDate={data[id]["Loaning Date"]} returnDate={data[id]["Return Date"]} />)
                    }
                });
                let temp = data['bookInfo'];
                console.log(temp);
                this.setState({
                    book_form: <Book isbn={temp.isbn} title={temp.title} subject={temp.subject} copies={temp.copies}/>,
                    loanForm: loanArray
                })
            }
        })
    };
    render() {
        return (
            <div>
                <h2>Search Book</h2>
            <div className="container p-5 rounded mb-0 block-example border border-light">
                <Form>
                    <Form.Group as={Col} >
                        <Form.Row>
                            <Form.Label column lg={4}>
                                ISBN
                            </Form.Label>
                            <Col>
                                <Form.Control id="isbn" type="text" placeholder="Enter ISBN" onChange={this.onChange} value={this.state.isbn}/>
                            </Col>
                        </Form.Row>
                    </Form.Group>

                    <div className="row ml-auto">
                        <div className="col-xs-2  p-2 block-example ml-auto">
                            <Button variant="primary" type = "button" className="fa fa-search" onClick={this.onFindPress}>search</Button>
                        </div>
                        <div className="col-xs-2  p-2 block-example ">
                            <Button variant="light" type = "button" className="fa fa-undo">Reset</Button>
                        </div>
                    </div>
                </Form>
                <div className="detail_form">
                    {(this.state.error) ? this.state.msgFail : this.state.book_form}
                    {(this.state.loanForm.length > 0) ? this.state.loanForm: ""}
                </div>
            </div>

            </div>
        );
    }
}
export default FindForm;
