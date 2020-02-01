import React from "react";
import "./ast.css"



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
    }

    componentWillMount(){
        const retResignation = this.props.location.state.resignationDetails;
        this.setState({
            resignationDetails: retResignation
        })
    }

    render(){

        const {resignationDetails} = this.state;

        return(
            <div>
                {resignationDetails.name}
            </div>
        )
    }
}