import React, {Component} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col } from 'react-bootstrap';
import FlashMessage from "react-flash-message";
import 'font-awesome/css/font-awesome.min.css';
import axios from "axios";

class SportsAddGood extends Component{
    constructor(props) {
        super(props);
        this.state = {
            goodId: "",
            goodType: "",
            quantity: "",
            error: false,
            msgSuccess: null,
            msgFail: null
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        this.setState({msgSuccess: null, msgFail: null});
        e.preventDefault();
        const GoodData = { goodId: this.state.goodId, goodType: this.state.goodType, quantity: this.state.quantity};
        this.makeCall(GoodData)
            .then((data) => {
                if(data.error === true){
                    this.setState({
                        error: true,
                        msgFail: <FlashMessage duration={3000}><p style={{color: "red", fontStyle: "italic"}}>{data.message}</p></FlashMessage>
                    })
                }
                else{
                    this.setState({
                        error: false,
                        msgSuccess: <FlashMessage duration={3000}><p style={{color: "green", fontStyle: "italic"}}>{data.message}</p></FlashMessage>
                    })
                }
            })
            .catch(err => console.log(err));
    }
    makeCall = GoodData => {
        return axios
                // .post("/api/books/Addbook", GoodData)
                .then( (res) => {
                    return res.data;
                })
                .catch(err => {
                    console.log(err);
                        return err.response.data;
                    }
                );
    };


    render() {
        return(
            <div>
                <h2>Add New Good</h2>
            <div className="container p-5 rounded mb-0 block-example border border-light">
                <Form noValidate onSubmit={this.onSubmit}>
                    <Form.Group as={Col} >
                        <Form.Row>
                            <Form.Label column lg={4}>
                                Good Id
                            </Form.Label>
                            <Col>
                                <Form.Control id="goodId" type="text"  pattern="[0-9]*" minLength="13" maxLength="13" placeholder="Enter Good ID " onChange={this.onChange} value={this.state.goodId}/>
                            </Col>
                        </Form.Row>
                  
                        <Form.Row>
                            <Form.Label column lg={4}>
                                Good Type
                            </Form.Label>
                            <Col>
                                <Form.Control type="text"  id="goodType" placeholder="Enter Good Type" onChange={this.onChange} value={this.state.name} />
                            </Col>
                        </Form.Row>
                 
                        <Form.Row>
                            <Form.Label column lg={4}>
                                No. of quantity
                            </Form.Label>
                            <Col>
                                <Form.Control id="quantity" type="text" placeholder="No. of quantity" onChange={this.onChange} value={this.state.quantity}/>
                            </Col>
                        </Form.Row>
                    </Form.Group>
                    <div className="row ml-auto">
                        <div className="col-xs-2  p-2 block-example ml-auto">
                            <Button variant="primary" type = "submit" className="fa fa-save" >Save</Button>
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


export default SportsAddGood;
