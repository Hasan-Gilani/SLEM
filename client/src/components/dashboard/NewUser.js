import React, {Component} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux"
import { addBook } from "../../crudActions/addAction";
// import 'react-image-input';

class NewUser extends Component{
    constructor(props) {
        super(props);
        // this.state = {
        //     isbn: "",
        //     name: "",
        //     author: "",
        //     subject: ""
        // };
    }

    // onChange = e => {
    //     this.setState({ [e.target.id]: e.target.value });
    // };

    // onSubmit = e => {
    //     e.preventDefault();
    //     const bookData = {
    //         isbn: this.state.isbn,
    //         name: this.state.name,
    //         author: this.state.author,
    //         subject: this.state.subject
    //     };
    //     this.props.addBook(bookData)
    // };

    render() {
        return(
            <div className="container">
                <div style={{marginTop: "4rem"}} className="row">
                    <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                        <h4>
                            <b>New User(s)</b>
                        </h4>
                    </div>
                    <div className="input-field col s-12" style={{marginLeft:"20px"}}>
                        <form noValidate onSubmit={this.onSubmit}>
                        <h6>Email</h6>
                        <input
                            onChange={this.onChange}
                            // value={this.state.isbn}
                            // id="isbn"
                            // type='text'
                        />
                        <h6>First Name</h6>
                        <input
                            onChange={this.onChange}
                            // value={this.state.name}
                            // id='name'
                            // type='text'

                        />
                        <h6>Last Name</h6>
                        <input
                            onChange={this.onChange}
                            // value={this.state.author}
                            // id="author"
                            // type="text"
                        />
                        <h6>Phone No: </h6>
                        <input
                            onChange={this.onChange}
                            // value={this.state.subject}
                            // id="subject"
                            // type="text"
                        />
                        <h6>Avatar: </h6>
                        <input
                            onChange={this.onChange}
                            // value={this.state.subject}
                            // id="subject"
                            type="image"
                        />
                        <h6>Role(s): </h6>
                        <input
                            onChange={this.onChange}
                            // value={this.state.subject}
                            // id="subject"
                            type="text"
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
                        ><i className="fa fa-save">
                            Save
                            </i>
                        </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
// NewUser.propTypes = {
//     addBook: PropTypes.func.isRequired,
//     isbn: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     author: PropTypes.string.isRequired,
//     subject: PropTypes.string.isRequired
// };

// const mapStateToProps = state => ({
//     isbn: state.isbn,
//     name: state.name,
//     author: state.author,
//     subject: state.subject
// });

// export default connect(
//     mapStateToProps, { addBook }
// ) (NewUser);

export default NewUser;