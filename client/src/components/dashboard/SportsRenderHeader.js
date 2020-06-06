import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';


class SportsRenderHeader extends Component {
    render() {
        return (
                <div className="px-4">
                    <div className="table-wrapper table-responsive table-bordered ">
                        <table className="table table-hover mb-0" variant='dark' cellSpacing="0" width="100%">
                            <thead>
                                <tr>
                                <th style={{width:"5%"}}>
                                    {/* <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="customCheckall"/>
                                        <label className="custom-control-label" for="customCheckall"></label>
                                    </div> */}
                                </th>
                                <th className="th-lg" style={{width:"19%"}}>
                                <a href="_blank">Good-ID
                                    <i className="fa fa-sort ml-1"/>
                                    </a>
                                </th>
                                <th className="th-lg" style={{width:"19%"}}>
                                <a href="_blank">Good-Type
                                    <i className="fa fa-sort ml-1"/>
                                    </a>
                                </th>
                                <th className="th-lg" style={{width:"15%"}}>
                                    <a href="_blank">Student ID
                                    <i className="fa fa-sort ml-1"/>
                                    </a>
                                </th>
                                <th className="th-lg" style={{width:"20%"}}>
                                    <a href="_blank">Issue Date
                                    <i className="fa fa-sort ml-1"/>
                                    </a>
                                </th>
                                <th className="th-lg" style={{width:"20%"}}>
                                    <a href="_blank">Due Date
                                    <i className="fa fa-sort ml-1"/>
                                    </a>
                                </th>
                                <th className="th-lg" style={{width:"20%"}}>
                                    <a href="_blank">Actions
                                    <i className="fa fa-sort ml-1"/>
                                    </a>
                                </th>
                               
                                </tr>
                            </thead>
                        </table>
                    </div>
                    </div>
        );
    }
}
export default SportsRenderHeader;