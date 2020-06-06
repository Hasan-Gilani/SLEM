import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';

class Sports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goodtype: props.goodtype,
            goodId: props.goodId,
            quantity: props.quantity
        }
    }
    componentDidMount() {
        this.setState({
            goodtype: this.props.goodtype,
            goodId: this.props.goodId,
            quantity: this.props.quantity
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.goodId !== prevState.goodId){
            this.setState({
                goodId: this.props.goodId,
                goodtype: this.props.goodtype,
                quantity: this.props.quantity
            })
        }
    }

    render() {
        return (
            <div className="px-4">
                <h3>Sports Details</h3>
                <div className="table-wrapper table-responsive table-bordered ">
                    
                    <table className="table table-hover mb-0" variant='dark' cellSpacing="0" width="100%">
                        <thead>
                        <tr>
                            <th className="th-lg" >
                                <a href="_blank">Good ID
                                    <i className="fa fa-sort ml-1"/>
                                </a>
                            </th>
                            <th className="th-lg" >
                                <a href="_blank">Good Type
                                    <i className="fa fa-sort ml-1"/>
                                </a>
                            </th>
                            <th className="th-lg" >
                                <a href="_blank">Quantity
                                    <i className="fa fa-sort ml-1"/>
                                </a>
                            </th>
                            <th className="th-lg">
                                <a href="_blank">Status
                                    <i className="fa fa-sort ml-1"/>
                                </a>
                            </th>
                            <th className="th-lg">
                                <a href="_blank">Actions
                                    <i className="fa fa-sort ml-1"/>
                                </a>
                            </th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr>
                            <td >{this.state.goodId}</td>
                            <td >{this.state.goodtype}</td>
                            <td >{this.state.quantity}</td>
                            <td >{(this.state.quantity > 0) ? 'Available' : "All copied Loaned"}</td>
                            <td>
                                <button type="button" className="btn btn-primary"><i className="fa fa-eye"/></button>
                                <button type="button" className="btn btn-success"><i className="fa fa-edit"/></button>
                                <button type="button" className="btn btn-danger"><i className="fa fa-trash-o"/></button>
                            </td>
                        
                        </tr>
                        </tbody>

                    </table>

                </div>

            </div>
        );

    }
}
export default Sports;
