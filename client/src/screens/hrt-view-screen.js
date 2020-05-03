import React, { Component } from 'react';
import { Table } from 'reactstrap';
import querString from 'query-string';

export class ResignationsScreen extends Component {
    constructor() {
        super();
        this.state = {
            data: null

        };

        this.normalizeVal = this.normalizeVal.bind(this);
    }


    normalizeVal(value) {
        return (value === true) ? "Yes" : "No";
    }

    componentDidMount() {
        let url = this.props.location.search;
        let params = querString.parse(url);
        const id = params.id;

        fetch(`/api/resignations/${id}`).then((res) => {
            res.json().then((data) => {
                this.setState({ data: data });
            })
        })
    }
    render() {
        return (
            <div className="container">
                <center style={{ margin: "25px" }}>
                    <header>
                        <hr />
                        <h3 className='container'>Resignation Request </h3>
                        <hr />
                    </header>
                    <Table bordered hover className='container' >
                        <thead>
                            {this.state.data && <tr>
                                <th style={{ backgroundColor: "#BE0002" }} className="text-white">Data</th>
                                <th style={{ backgroundColor: "#BE0002" }} className="text-white">Value</th>
                                <th style={{ backgroundColor: "#BE0002" }} className="text-white">Status : {this.state.data.phase1.status}</th>
                            </tr>
                            }
                        </thead>
                        <tbody>
                            {this.state.data && <tr>
                                <td>Staff ID </td>
                                <td>{this.state.data.staffId}</td>
                            </tr>
                            }
                            {this.state.data && <tr>
                                <td>Name </td>
                                <td>{this.state.data.name}</td>
                            </tr>
                            }
                            {this.state.data && <tr>
                                <td>Returned Headset </td>
                                <td>{this.normalizeVal(this.state.data.phase1.returnedHeadset)}</td>
                            </tr>
                            }
                            {this.state.data && <tr>
                                <td>Returned Keys </td>
                                <td>{this.normalizeVal(this.state.data.phase1.returnedKeys)}</td>
                            </tr>
                            }
                            {this.state.data && <tr>
                                <td>Returned 3ohada </td>
                                <td>{this.normalizeVal(this.state.data.phase1.returnedOhda)}</td>
                            </tr>
                            }
                            {this.state.data && <tr>
                                <td>3ohada Type </td>
                                <td>{this.state.data.phase1.ohdaType}</td>
                            </tr>
                            }
                            {this.state.data && <tr>
                                <td>Last Working Day </td>
                                <td>{this.state.data.phase1.lastWorkDay}</td>
                            </tr>
                            }
                            {this.state.data && <tr>
                                <td>National ID </td>
                                <td>{this.state.data.phase1.nationalId}</td>
                            </tr>
                            }
                            {this.state.data && this.state.data.phase1.nationalIdImg && <tr>
                                <td>National ID Image </td>
                                <td>
                                    {
                                        this.state.data.phase1.nationalIdImg && <img
                                            alt={`${this.state.data.phase1.nationalIdImg.fileName}`}
                                            src={`${this.state.data.phase1.nationalIdImg.dataURL}`}
                                        />}
                                </td>
                            </tr>
                            }
                            {this.state.data && <tr>
                                <td>Annuals Granted </td>
                                <td>{this.state.data.phase1.annualsGranted}</td>
                            </tr>
                            }
                            {this.state.data && <tr>
                                <td>Annuals Taken </td>
                                <td>{this.state.data.phase1.annualsTaken}</td>
                            </tr>
                            }
                            {this.state.data && <tr>
                                <td>No Show </td>
                                <td>{this.state.data.phase1.noShow}</td>
                            </tr>
                            }
                            {this.state.data && <tr>
                                <td>Lost Hours </td>
                                <td>{this.state.data.phase1.lostHours}</td>
                            </tr>
                            }
                            {this.state.data && <tr>
                                <td>Days To Take </td>
                                <td>{this.state.data.phase1.daysToTake}</td>
                            </tr>
                            }
                            {this.state.data && <tr>
                                <td>IEX </td>
                                <td>{this.state.data.phase1.iex}</td>
                            </tr>
                            }
                        </tbody>
                    </Table>

                    <header>
                        <hr />
                        <h3 className='container'>Customer Care (SMC)</h3>
                        <hr />
                    </header>
                    <Table bordered hover className='container' >
                        <thead>
                            {this.state.data && <tr>
                                <th style={{ backgroundColor: "#BE0002" }} className="text-white">Data</th>
                                <th style={{ backgroundColor: "#BE0002" }} className="text-white">Value</th>
                                <th style={{ backgroundColor: "#BE0002" }} className="text-white">Status : {this.state.data.phase2.status}</th>
                            </tr>
                            }
                        </thead>
                        <tbody>

                            {this.state.data && <tr>
                                <td>Staff ID </td>
                                <td>{this.state.data.staffId}</td>

                            </tr>
                            }
                            {this.state.data && <tr>
                                <td>Name </td>
                                <td>{this.state.data.name}</td>
                            </tr>
                            }
                            {this.state.data && <tr>
                                <td>Returned Headset </td>
                                <td>{this.normalizeVal(this.state.data.phase2.returnedHeadset)}</td>
                            </tr>
                            }
                            {this.state.data && <tr>
                                <td>Returned Keys </td>
                                <td>{this.normalizeVal(this.state.data.phase2.returnedKeys)}</td>
                            </tr>
                            }
                            {this.state.data && <tr>
                                <td>Returned 3ohada </td>
                                <td>{this.normalizeVal(this.state.data.phase2.returnedOhda)}</td>
                            </tr>
                            }
                            {this.state.data && <tr>
                                <td>Comment </td>
                                <td>{this.state.data.phase2.comment}</td>
                            </tr>
                            }


                        </tbody>
                    </Table>

                    <header>
                        <hr />
                        <h3 className='container'>Work Force</h3>
                        <hr />
                    </header>
                    <Table bordered hover className='container' >
                        <thead>
                            {this.state.data && <tr>
                                <th style={{ backgroundColor: "#BE0002" }} className="text-white">Data</th>
                                <th style={{ backgroundColor: "#BE0002" }} className="text-white">Value</th>
                                <th style={{ backgroundColor: "#BE0002" }} className="text-white">Status : {this.state.data.phase3.status}</th>
                            </tr>
                            }
                        </thead>
                        <tbody>

                            {this.state.data && <tr>
                                <td>Annuals Granted </td>
                                <td>{this.state.data.phase3.annualsGranted}</td>
                            </tr>
                            }
                            {this.state.data && <tr>
                                <td>Annuals Taken </td>
                                <td>{this.state.data.phase3.annualsTaken}</td>
                            </tr>
                            }
                            {this.state.data && <tr>
                                <td>No Show </td>
                                <td>{this.state.data.phase3.noShow}</td>
                            </tr>
                            }
                            {this.state.data && <tr>
                                <td>Lost Hours </td>
                                <td>{this.state.data.phase3.lostHours}</td>
                            </tr>
                            }
                            {this.state.data && <tr>
                                <td>Days To Take </td>
                                <td>{this.state.data.phase3.inLieuDaysToTake}</td>
                            </tr>
                            }
                            {this.state.data && <tr>
                                <td>IEX </td>
                                <td>{this.state.data.phase3.iex}</td>
                            </tr>
                            }

                        </tbody>
                    </Table>
                    <header>
                        <hr />
                        <h3 className='container'>CC Consumer Activation </h3>
                        <hr />
                    </header>
                    <Table bordered hover className='container' >
                        <thead>
                            {this.state.data && <tr>
                                <th style={{ backgroundColor: "#BE0002" }} className="text-white">Data</th>
                                <th style={{ backgroundColor: "#BE0002" }} className="text-white">Value</th>
                                <th style={{ backgroundColor: "#BE0002" }} className="text-white">Status : {this.state.data.phase4.status}</th>
                            </tr>
                            }
                        </thead>
                        <tbody>
                            {this.state.data && <tr>
                                <td>Staff ID </td>
                                <td>{this.state.data.staffId}</td>

                            </tr>
                            }
                            {this.state.data && <tr>
                                <td>Name </td>
                                <td>{this.state.data.name}</td>
                            </tr>
                            }
                            {this.state.data && this.state.data.phase1.nationalIdImg && <tr>
                                <td>National ID Scanned Copy </td>
                                <td>
                                    <img
                                        alt={this.state.data.phase1.nationalIdImg.fileName}
                                        src={this.state.data.phase1.nationalIdImg.dataURL} />
                                </td>
                            </tr>
                            }
                            {this.state.data && <tr>
                                <td>Rate Plan </td>
                                <td>{this.state.data.phase4.ratePlan}</td>

                            </tr>
                            }
                            {this.state.data && <tr>
                                <td>Has Phone Billed Account </td>
                                <td>{this.normalizeVal(this.state.data.phase4.phoneBilledAcc)}</td>

                            </tr>
                            }
                            {this.state.data && <tr>
                                <td>Comment </td>
                                <td>{this.state.data.phase4.comment}</td>

                            </tr>
                            }

                        </tbody>
                    </Table>

                    <header>
                        <hr />
                        <h3 className='container'>Application Security</h3>
                        <hr />
                    </header>
                    <Table bordered hover className='container' >
                        <thead>
                            {this.state.data && <tr>
                                <th style={{ backgroundColor: "#BE0002" }} className="text-white">Data</th>
                                <th style={{ backgroundColor: "#BE0002" }} className="text-white">Value</th>
                                <th style={{ backgroundColor: "#BE0002" }} className="text-white">Status : {this.state.data.phase6.status}</th>
                            </tr>
                            }
                        </thead>
                        <tbody>

                            {this.state.data && <tr>
                                <td>Staff ID </td>
                                <td>{this.state.data.staffId}</td>

                            </tr>
                            }
                            {this.state.data && <tr>
                                <td>Name </td>
                                <td>{this.state.data.name}</td>
                            </tr>
                            }
                            {this.state.data && <tr>
                                <td>Disabled Secure ID </td>
                                <td>{this.normalizeVal(this.state.data.phase6.disabledSecureId)}</td>
                            </tr>
                            }
                            {this.state.data && <tr>
                                <td>Disabled Remedy Account </td>
                                <td>{this.normalizeVal(this.state.data.phase6.disabledRemedyAccount)}</td>
                            </tr>
                            }
                            {this.state.data && <tr>
                                <td>Disabled Accounts in Productions Systems </td>
                                <td>{this.normalizeVal(this.state.data.phase6.disabledAccountsInProductionSystems)}</td>
                            </tr>
                            }
                            {this.state.data && <tr>
                                <td>Comment </td>
                                <td>{this.state.data.phase6.comment}</td>
                            </tr>
                            }

                        </tbody>
                    </Table>

                    <header>
                        <hr />
                        <h3 className='container'>Corporate Security</h3>
                        <hr />
                    </header>
                    <Table bordered hover className='container' >
                        <thead>
                            {this.state.data && <tr>
                                <th style={{ backgroundColor: "#BE0002" }} className="text-white">Data</th>
                                <th style={{ backgroundColor: "#BE0002" }} className="text-white">Value</th>
                                <th style={{ backgroundColor: "#BE0002" }} className="text-white">Status : {this.state.data.phase8.status}</th>
                            </tr>
                            }
                        </thead>
                        <tbody>

                            {this.state.data && <tr>
                                <td>Staff ID </td>
                                <td>{this.state.data.staffId}</td>

                            </tr>
                            }
                            {this.state.data && <tr>
                                <td>Name </td>
                                <td>{this.state.data.name}</td>
                            </tr>
                            }
                            {this.state.data && <tr>
                                <td>Disable Company ID </td>
                                <td>{this.normalizeVal(this.state.data.phase8.disabledAccount)}</td>
                            </tr>
                            }
                            {this.state.data && <tr>
                                <td>Received Physical ID </td>
                                <td>{this.normalizeVal(this.state.data.phase8.physicalId)}</td>
                            </tr>
                            }
                            {this.state.data && <tr>
                                <td>Comment </td>
                                <td>{this.state.data.phase8.comment}</td>
                            </tr>
                            }

                        </tbody>
                    </Table>

                    <header>
                        <hr />
                        <h3 className='container'>Security Hardware</h3>
                        <hr />
                    </header>
                    <Table bordered hover className='container' >
                        <thead>
                            {this.state.data && <tr>
                                <th style={{ backgroundColor: "#BE0002" }} className="text-white">Data</th>
                                <th style={{ backgroundColor: "#BE0002" }} className="text-white">Value</th>
                                <th style={{ backgroundColor: "#BE0002" }} className="text-white">Status : {this.state.data.phase7.status}</th>
                            </tr>
                            }
                        </thead>
                        <tbody>

                            {this.state.data && <tr>
                                <td>Returned HW Token </td>
                                <td>{this.normalizeVal(this.state.data.phase7.returnedHwToken)}</td>
                            </tr>
                            }
                            {this.state.data && <tr>
                                <td>Comment </td>
                                <td>{this.state.data.phase7.comment}</td>
                            </tr>
                            }

                        </tbody>
                    </Table>
                </center>
            </div>
        );
    }
}