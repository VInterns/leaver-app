import React from "react";
import { Table, Form, Col, Row, Button } from "react-bootstrap";
import { LeaverDetails } from "../components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API = '/api';
const INSERT = '/resignations/wf/insertBalance';
const DONE = "done";
const PENDING = "pending";
export class WorkForceScreenDetail extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            detail: {},
            leaver: {},
            annualsGranted: "",
            annualsTaken: "",
            noShow: "",
            lostHours: "",
            daysToTake: "",
            iex: "",
        }

    }

    ///////////////////////////////////////////////
    handleChange = (event) => {
        let state = {};
        state[event.target.id] = event.target.value;
        this.setState(state);
    }

    ///////////////////////////////////////////////
    componentDidMount() {
        const retDetail = this.props.location.state.detail;
        const wfData = retDetail.phase3;
        this.setState({
            detail: retDetail,
            iex: wfData.iex,
            annualsGranted: wfData.annualsGranted,
            annualsTaken: wfData.annualsTaken,
            noShow: wfData.noShow,
            daysToTake: wfData.daysToTake,
            lostHours: wfData.lostHours

        })
        this.fetchLeaverInfo(retDetail.staffId);
    }

    ///////////////////////////////////////////////
    fetchLeaverInfo = (searchId) => {
        let QUERY = "/users/?id=" + searchId;
        fetch(API + QUERY, {
            method: "get",
            headers: { "Content-Type": "application/json" }
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                this.setState({
                    leaver: data
                })
            })
            .catch((err) => {
                if (err)
                    throw err;
            })

    }

    checkStatus(condX, condY, condZ,condA,condB,condC) {

        if ((condX === "" || condX === undefined) || (condY === ""|| condY === undefined) || (condZ === "" || condZ === undefined) || (condA === ""|| condA === undefined) || (condB === "" || condB === undefined) || (condC === "" || condC === undefined)) {
          return PENDING;
        } else {
          return DONE;
        }
      }

    checkRequestStatus(resignation,currentphaseStatus) {
        if (
          resignation.phase4.status === 'new' &&
          resignation.phase6.status === 'new' &&
          resignation.phase7.status === 'new' &&
          resignation.phase8.status === 'new' &&
          currentphaseStatus === 'new'
        ) {
          return 'new';
        } else if (
          resignation.phase4.status === 'done' &&
          resignation.phase6.status === 'done' &&
          resignation.phase7.status === 'done' &&
          resignation.phase8.status === 'done' &&
          currentphaseStatus === 'done' 
        ) {
          return 'done';
        } else {
          return 'pending';
        }
      }

    ///////////////////////////////////////////////
    submitBalance = (event) => {

        event.preventDefault();
        
        var phase3 = {
            "annualsGranted": this.state.annualsGranted,
            "annualsTaken": this.state.annualsTaken,
            "noShow": this.state.noShow,
            "lostHours": this.state.lostHours,
            "daysToTake": this.state.daysToTake,
            "iex": this.state.iex,
            "status": this.checkStatus(this.state.iex,this.state.annualsGranted,this.state.annualsTaken,this.state.noShow,this.state.lostHours,this.state.daysToTake)
        }
        console.log(phase3)

        fetch(API + INSERT, {
            method: 'post',
            body: JSON.stringify({
                "staffId": this.state.detail.staffId,
                "phase3": phase3,
                "status" : this.checkRequestStatus(this.state.detail,phase3.status)
            }),
            headers: { "Content-Type": "application/json" }
        })
            .then((response) => {
                if (response.status === 200) {
                    toast.success("Data sent");
                }
                else if (response.status === 503) {
                    toast.error("Error in db");
                }
                else {
                    toast.error("Data cannot be sent");
                    return undefined;
                }
            })
            .catch(err => {
                throw err;
            });
    }

    ///////////////////////////////////////////////
    render() {
        const { detail, leaver } = this.state;
        const phase1 = Object(detail.phase1);
        return (
            <div className="container mt-5">
                <ToastContainer />
                <div className='p-2'>
                    <LeaverDetails leaverDetail={{ leaverInfo: leaver, lastDay: phase1.lastWorkDay }} />
                </div>
                <Form className='p-2'>
                    <Form.Group className='p-5 border'>
                        <Row>
                            <Col>
                                <Form.Label className='col-form-group font-weight-bold'>IEX</Form.Label>
                            </Col>
                            <Col>
                                <input
                                    id="iex"
                                    type="number"
                                    value={this.state.iex}
                                    onChange={this.handleChange}
                                    className="form-control"
                                />
                            </Col>
                        </Row>
                        <Row className='mt-3 table-responsive-md p-3'>
                            <Table bordered>
                                <thead>
                                    <tr nowrap style={{ backgroundColor: "#BE0002"}}>
                                        <th className="text-white">Annuals Granted</th>
                                        <th className="text-white">Annuals Taken</th>
                                        <th className="text-white">No Show</th>
                                        <th className="text-white">Lost Hours</th>
                                        <th className="text-white">In Lieu Days to Take</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><input type="number" className="form-control" id="annualsGranted" value={this.state.annualsGranted} onChange={this.handleChange} /></td>
                                        <td><input type="number" className="form-control" id="annualsTaken" value={this.state.annualsTaken} onChange={this.handleChange} /></td>
                                        <td><input type="number" className="form-control" id="noShow" value={this.state.noShow} onChange={this.handleChange} /></td>
                                        <td><input type="number" className="form-control" id="lostHours" value={this.state.lostHours} onChange={this.handleChange} /></td>
                                        <td><input type="number" className="form-control" id="daysToTake" value={this.state.daysToTake} onChange={this.handleChange} /></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Row>
                        <Row className='mt-3'>
                            <Col>
                                <Button
                                    size='lg'
                                    type='submit'
                                    block
                                    variant='danger'
                                    onClick={this.submitBalance}
                                >
                                    Submit
                        </Button>
                            </Col>
                        </Row>
                    </Form.Group>
                </Form>
            </div>

        )
    }


}
