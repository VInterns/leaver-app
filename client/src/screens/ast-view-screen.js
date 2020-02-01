import React from "react";
import "./ast.css"
import { 
    Form,
    FormLabel,
    Row,
    Col,
    Button
} from "react-bootstrap";

/////////////////////////////////////////////////////////////////////////
const API = "http://localhost:8080/api";
const ROUTE = "/resignations/update/phase6";
const DONE = "done";
const PENDING = "pending";

/////////////////////////////////////////////////////////////////////////
export class ASTResignationDetailScreen extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            resignationDetails: {},
            disabledSecureId: false,
            disabledRemedyAccount: false,
            disabledAccountsInProductionSystems: false,
            comment: ""
        }

        this.checkStatus  = this.checkStatus.bind(this);
        this.normalizeVal = this.normalizeVal.bind(this);
        this.submitButton = this.submitButton.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        const retResignation = this.props.location.state.resDetails;
        this.setState({
            resignationDetails: retResignation
        })

    }

    normalizeVal(value){
        return (value === "true") ? true : false;
    }

    
    checkStatus(condX, condY, condZ){
        if((condX === true) && (condY === true) && (condZ === true)) {
            return DONE;
        }
        else{
            return PENDING;
        }
    }


    handleChange(event){
        let state = {};
        state[event.target.id] = event.target.value;
        this.setState(state);
    }

    submitButton(event){

        event.preventDefault();

        var disabledSecureIdNormalized = this.normalizeVal(this.state.disabledSecureId);
        var disabledRemedyAccountNormalized = this.normalizeVal(this.state.disabledRemedyAccount);
        var disabledAccountsInProductionSystemsNormalized = this.normalizeVal(this.state.disabledAccountsInProductionSystems);

        let phase6 = {
            disabledSecureId : disabledSecureIdNormalized,
            disabledRemedyAccount: disabledRemedyAccountNormalized,
            disabledAccountsInProductionSystems: disabledAccountsInProductionSystemsNormalized,
            comment: this.state.comment,
            status: this.checkStatus(disabledSecureIdNormalized, disabledRemedyAccountNormalized, 
                disabledAccountsInProductionSystemsNormalized)
        }

        fetch(API + ROUTE, {
            method: 'post',
            body: JSON.stringify({
                "staffId": this.state.resignationDetails.staffId,
                "phase6": phase6 
            }),
            headers: {"Content-Type": "application/json"}
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            throw err;
        })
    }

/////////////////////////////////////////////////////////////////////////
    render(){
    

        const {resignationDetails} = this.state;
        const phase1 = Object (resignationDetails.phase1);

        return(
            <div className = "ast-page">
                <header className = "ast-header">
                    Application Security Team Task
                </header>
                <hr/>
                <div className = "leaver-info">
                    <label className = "info-title">Leaver Details</label>
                    <div className = "info">
                        <div className = "info-line">
                                <FormLabel className = "info-key">Staff ID</FormLabel>
                                <FormLabel className = "info-value">{resignationDetails.staffId}</FormLabel>
                                <FormLabel className = "info-key spaced">SAP Staff ID</FormLabel>
                                <FormLabel className = "info-value">{resignationDetails.sapStaffId}</FormLabel>
                        </div>
                        <div className = "info-line">
                            <FormLabel className = "info-key">Leaver Name</FormLabel>
                            <FormLabel className = "info-value">{resignationDetails.name}</FormLabel>
                            <FormLabel className = "info-key spaced">Manager</FormLabel>
                            <FormLabel className = "info-value">{resignationDetails.managerName}</FormLabel>
                        </div>
                        <div className = "info-line">
                            <FormLabel className = "info-key">Department</FormLabel>
                            <FormLabel className = "info-value">{resignationDetails.department}</FormLabel>
                            <FormLabel className = "info-key spaced">Cost Center</FormLabel>
                            <FormLabel className = "info-value">{resignationDetails.costCentre}</FormLabel>
                        </div>
                        <div className = "info-line">
                            <FormLabel className = "info-key">Job title</FormLabel>
                            <FormLabel className = "info-value">{resignationDetails.jobTitle}</FormLabel>
                            <FormLabel className = "info-key spaced">Hiring Date</FormLabel>
                            <FormLabel className = "info-value">{resignationDetails.hiringDate}</FormLabel>
                        </div>
                        <div className = "info-line">
                            <FormLabel className = "info-key">Mobile Number</FormLabel>
                            <FormLabel className = "info-value">{resignationDetails.mobileNumber}</FormLabel>
                            <FormLabel className = "info-key spaced">Last Working Day</FormLabel>
                            <FormLabel className = "info-value">{phase1.lastWorkDay}</FormLabel>
                        </div>
                    </div>
                    <hr/>
                    <div>
                        <Form id = "entry-data">
                            <Form.Group as = {Row}>
                                <Col sm = {2}>
                                    <Form.Label className = "info-key wide" >
                                    Disabled Secure ID
                                    </Form.Label>
                                </Col>
                                <Col sm = {10}>
                                    <Form.Control 
                                        id = "disabledSecureId"
                                        as = "select" 
                                        className = "separate"
                                        defaultValue = {this.state.disabledSecureId}
                                        onChange = {this.handleChange}>
                                        <option value = {true}>Yes</option>
                                        <option value = {false}>No</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as = {Row}>
                                <Col sm = {2}>
                                    <Form.Label className = "info-key wide" >
                                        Disabled Remedy Account
                                    </Form.Label>
                                </Col>
                                <Col sm = {10}>
                                    <Form.Control 
                                        id = "disabledRemedyAccount"
                                        as = "select"
                                        defaultValue = {this.state.disabledRemedyAccount}
                                        className = "separate"
                                        onChange = {this.handleChange}>
                                        <option value = {true}>Yes</option>
                                        <option value = {false}>No</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Col sm = {2}>
                                    <Form.Label className = "info-key wide" >
                                    Disabled Accounts In Production Systems
                                    </Form.Label>
                                </Col>
                                <Col sm = {10}>
                                    <Form.Control 
                                        id = "disabledAccountsInProductionSystems" 
                                        as = "select" 
                                        className = "separate"
                                        defaultValue = {this.state.disabledAccountsInProductionSystems}
                                        onChange = {this.handleChange}>
                                        <option value = {true}>Yes</option>
                                        <option value = {false}>No</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className = "info-key wide" >
                                    Comments
                                </Form.Label>
                                <Form.Control 
                                    id = "comment"
                                    as="textarea" 
                                    rows="5"
                                    onChange = {this.handleChange}/>
                            </Form.Group>
                            <div className = "submission">
                                <Button 
                                    variant="primary" 
                                    type="submit" 
                                    className = "submit-btn"
                                    onClick = {this.submitButton}>
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}