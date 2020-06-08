import React, { Component } from "react";
import axios from "axios";
import Sports from "./Sports";
import LoanInfo from "./LoanInfo";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import FlashMessage from "react-flash-message";
import RenderBookHeader from "./RenderBookHeader";

class SportsFindGood extends Component{
    constructor(props){
        super(props);
        this.state = {
            goodID: "",
            good_form: null,
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
            .get(`/api/recordSports/find/${this.state.goodID}`)
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
            if(data.error === true){  //good doesn't exist.
                this.setState({
                    error: true,
                    msgFail: <FlashMessage duration={3000}><p style={{color: "red", fontStyle: "italic"}}>{data.message}</p></FlashMessage>
                });
            }
            else{
                console.log(data);
                let x = (Object.keys(data)).filter( key => {
                    return (typeof data[key]) === "object";
                });
                let loanArray = []
                let cnt=1;
                x.forEach(id => {
                    if(id !== 'sportInfo'){
                        loanArray.push(<LoanInfo key={cnt} count={cnt} id={id} loanDate={data[id]["Loaning Date"]} returnDate={data[id]["Return Date"]} />)
                    }
                    cnt+=1
                });
                let temp = data['sportInfo'];
                console.log(temp);
                this.setState({
                    error: false,
                    good_form: <Sports goodId={temp.goodID} goodtype={temp.goodType}  quantity={temp.copies}/>,
                    loanForm: loanArray
                })
            }
        })
    };
    resetAll = e => {
        e.preventDefault();
        this.setState({msgFail: null, msgSuccess: null, good_form: null, loanForm: [],goodID: ""});
    };
    render() {
        return (
            <div>
                <h2>Search Good</h2>
            <div className="row p-5 rounded mb-0 block-example border border-light">
                <Form>
                    <Form.Group as={Col} >
                        <Form.Row>
                            <Form.Label column lg={4}>
                                Good ID
                            </Form.Label>
                            <Col>
                                <Form.Control id="goodID" type="text" placeholder="Enter Good ID" onChange={this.onChange} value={this.state.goodID}/>
                            </Col>
                        </Form.Row>
                    </Form.Group>

                    <div className="row ml-auto">
                        <div className="col-xs-2  p-2 block-example ml-auto">
                            <Button variant="primary" type = "button" className="fa fa-search" onClick={this.onFindPress}>search</Button>
                        </div>
                        <div className="col-xs-2  p-2 block-example ">
                            <Button variant="light" type = "button" className="fa fa-undo" onClick={this.resetAll}>Reset</Button>
                        </div>
                    </div>
                </Form>
                <div className="container p-5 rounded mb-0 block-example border border-light">
                    <div >
                        {(this.state.error) ? this.state.msgFail : this.state.good_form}
                    </div>

                    <div >
                        {(this.state.loanForm.length > 0) ? <RenderBookHeader /> : null}
                        {(this.state.loanForm.length > 0) ? this.state.loanForm: ""}
                    </div>

                </div>
            </div>


            </div>
        );
    }
}
export default SportsFindGood;
