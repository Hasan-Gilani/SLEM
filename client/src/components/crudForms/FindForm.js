import React, { Component } from "react";
import axios from "axios";

class FindForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            isbn: "",
            book: []
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    };
    onFindPress = e => {
        axios
            .get(`/api/books/findbook/${this.state.isbn}`)
            .then( (response) => {
                this.setState({book: response.data});
                console.log(this.state.book)
            })
            .catch(err => console.log(err))
    };
    render() {
        return (
            <div className="container">
                <div style={{marginTop: "4rem"}} className="row">
                    <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                    <h4> <b>Find Book</b> </h4>
                    </div>
                    <div className="col s12" style={{paddingLeft: "50px"}}>
                        <form style={{}} >
                            <ul>
                                <h5><li> By Isbn </li></h5>
                                    <input style={{marginTop:"15px", width: "50%"}}
                                        onChange={this.onChange}
                                        value={this.state.isbn}
                                        id="isbn"
                                        type="text"
                                    />
                            </ul>
                            <button style={{
                                width: "150px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                            }}
                                    type = "button"
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                    onClick={this.onFindPress}
                            >
                                Find
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default FindForm;