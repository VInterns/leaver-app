import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import {Header} from 'semantic-ui-react';

/////////////////////////////////////////////////////////////////////////
export class LeaverDetails extends React.Component {

    render() {

        let leaver = Object(this.props.leaverDetail.leaverInfo);
        let leaverDetail = this.props.leaverDetail;
        return (
            <div className = 'bg-light p-5 rounded'>
                <Header as = 'h3' className = 'text-center'>Leaver Details</Header>
                <Form className='mt-5'>
                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.Label className="font-weight-bold">StaffID</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control
                                    readOnly
                                    plaintext
                                    value={leaver.staffId}
                                />
                            </Col>
                            <Col>
                                <Form.Label className="font-weight-bold">SAP StaffID</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control
                                    readOnly
                                    plaintext
                                    value={leaver.staffId}
                                />
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col>
                                <Form.Label className="font-weight-bold">Leaver Name</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control
                                    readOnly
                                    plaintext
                                    value={leaver.name}
                                />
                            </Col>
                            <Col>
                                <Form.Label className="font-weight-bold">Manager</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control
                                    readOnly
                                    plaintext
                                    value={leaver.managerName}
                                />
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col>
                                <Form.Label className="font-weight-bold">Department</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control
                                    readOnly
                                    plaintext
                                    value={leaver.department}
                                />
                            </Col>
                            <Col>
                                <Form.Label className="font-weight-bold">Cost Center</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control
                                    readOnly
                                    plaintext
                                    value={leaver.careCenter}
                                />
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col>
                                <Form.Label className="font-weight-bold">Job Title</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control
                                    readOnly
                                    plaintext
                                    value={leaver.jobTitle}
                                />
                            </Col>
                            <Col>
                                <Form.Label className="font-weight-bold">Hiring Date</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control
                                    readOnly
                                    plaintext
                                    value={leaver.hiringDate}
                                />
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col>
                                <Form.Label className="font-weight-bold">Mobile Number</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control
                                    readOnly
                                    plaintext
                                    value={'+' + leaver.mobile}
                                />
                            </Col>
                            <Col>
                                <Form.Label className="font-weight-bold">Last Working Day</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control
                                    readOnly
                                    plaintext
                                    value={leaverDetail.lastDay|| ""} 
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                </Form>
            </div>
        )
    }
}