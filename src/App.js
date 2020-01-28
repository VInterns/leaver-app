import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { render } from 'react-dom';
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [{
        headerName: "Staff ID", field: "staffId",width:100,resizable: true
      }, {
        headerName: "Manager Name", field: "managerName",width:150,resizable: true
      }, {
        headerName: "Phase 1", field: "phase1",width:100,resizable: true
      }, {
        headerName: "Phase 2", field: "phase2",width:100,resizable: true
      }, {
        headerName: "Phase 3", field: "phase3",width:100,resizable: true
      }, {
        headerName: "Phase 4", field: "phase4",width:100,resizable: true
      }, {
        headerName: "Phase 5", field: "phase5",width:100,resizable: true
      }, {
        headerName: "Phase 6", field: "phase6",width:100,resizable: true
      }, {
        headerName: "Phase 7", field: "phase7",width:100,resizable: true
      }],
      rowData:[
        {staffId:"", managerName:"",phase1:"",phase2:"",phase3:"",phase4:"",phase5:"",phase6:"",phase7:""}
      ]
    }
		this.recive = this.recive.bind(this)
}
async recive(){
var data= [];
const table = await axios.get( '/api/table', {
  data
})
}
  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };
		
  
    render() {
    return (
      <table onRecive={this.recive} >
      
      <div className="ag-theme-balham" style={ {height: '600px', width: '950px', position:'top'} }>
        <AgGridReact
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}>
        </AgGridReact>
      </div>
      </table>



    );
  }
}
export default App;