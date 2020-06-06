import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';


class RenderBookHeader extends Component {
    render() {
        return (
                <div className="px-4">
                    <h3>Lend To</h3>
                    <div className="table-wrapper table-responsive table-bordered ">
                        <table className="table table-hover mb-0" variant='dark' cellSpacing="0" width="100%">
                            <thead>
                                <tr>
                                <th style={{width:"7%"}}>
                                    {/* <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="customCheckall"/>
                                        <label className="custom-control-label" for="customCheckall"></label>
                                    </div> */}
                                </th>
                                <th className="th-lg" style={{width:"20%"}}>
                                <a href="_blank">ID
                                    <i className="fa fa-sort ml-1"/>
                                    </a>
                                </th>
                                <th className="th-lg" style={{width:"22%"}}>
                                    <a href="_blank">Loan Date
                                    <i className="fa fa-sort ml-1"/>
                                    </a>
                                </th>
                                <th className="th-lg" style={{width:"22%"}}>
                                    <a href="_blank">Return Date
                                    <i className="fa fa-sort ml-1"/>
                                    </a>
                                </th>
                                <th className="th-lg" style={{width:"22%"}}>
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
export default RenderBookHeader;