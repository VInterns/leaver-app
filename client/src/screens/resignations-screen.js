import React, { Component } from 'react';
import './resignations-screen.css'

export class Resignations extends Component {
   constructor(props) {
      super(props);
      this.state = {
         entries: []
      };
   }
   view(id) {
      console.log(id);
      this.props.history.push("./form-res/"+id);
   }
   getdata()
   {
      fetch(`http://localhost:8080/api/resignations/`)
      .then(response => response.json())
      .then(data =>
         this.setState({
           entries: data,
         })
      )
   }
   componentDidMount()
   {
    this.getdata()
    }
    renderTableData() {
      return this.state.entries.map((entry, index) => {
         const { id, name, email, status } = entry
         return (
            <tr onClick={() => { this.view(id) }} key={id}>
               <td>{id}</td>
               <td>{name}</td>
               <td>{email}</td>
               <td>{status}</td>
            </tr>
         )
      })
   };
   render() {
      return (
         <div>
            <h1 id='title'>Employees' Resignations</h1>
            <table id='resignations'>
               <tbody>
                  {this.renderTableData()}
               </tbody>
            </table>
         </div>
      )
   }
}
