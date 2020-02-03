import React from 'react';
import './form-res-screen.css'
import './resignations-screen.css'

export class FormRes extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {
        entry: []
        //comment: ''
      };

      this.submit = this.submit.bind(this);

    }
    getentry()
    {
      //console.log(this.props.history.location.pathname.split('/')[2])
       fetch(`http://localhost:8080/api/form/`, {
         method: 'post',
         //mode: 'no-cors',
         body: JSON.stringify({id : this.props.history.location.state.resId}),
         headers: {
          'content-type': 'application/json'
        },
         //body: JSON.stringify({id: '2345'})
    })
       .then(response => response.json())
       .then(data =>
          this.setState({
            entry: data,
          })
       )
    }
    submit(e) {
      e.preventDefault();
      //var comment = e.target.elements.comment.value
      /* console.log("e.target::", e.target.elements.comment.value)
      console.log("staffId", this.state.entry.staffId); */

      let phase5 = {
        comment : e.target.elements.comment.value
      }
      fetch('http://localhost:8080/api/form/update', {
        method: 'post',
        body: JSON.stringify({
          staffId: this.state.entry.staffId,
          phase5: phase5
        }),
        headers: {
          'content-type': 'application/json'
        },
      })
    }
    onSubmit = (e) => {
      e.preventDefault();
    }
    handleChange = e => {
        this.state.comment = e.target.elements.value;
        //console.log(e.target.tagName);
        this.setState({ [e.target.name]: e.target.value });
        //this.submit(comment)
      }
    componentDidMount(){
    this.getentry()
    /* console.log()
    console.log(this.props.history) */
    //console.log(this.props.history.location.pathname.split('/')[2])
    }
    renderEntry() {
      return (
        Object.values(this.state.entry).map((value,index) => {
          //const { id, name, email, status } = value
          return(
            <data>
        {Object.values(value).map(id => <data>{id}</data>)}
        </data>
       )
      }
        )
     )
   };
    render() {
        return (
          <div className="App">
            <br />
            <h1>Interprise Logistics Task</h1>
            <h2>Leaver Details</h2>
            <data>{this.renderEntry()}</data>
            <br />
            <form onSubmit={this.submit.bind(this)}>
              <label htmlFor="comment">comment</label>
              <input
                type="text"
                name="comment"
                placeholder="Enter your Comment"
                onChange={this.handleChange}
              />
              <br />
              <div className="input-feedback">
                <span className="error">
                  {this.state.err !== "" ? this.state.err : ""}
                </span>
              </div>
    
              <br />
              <input type="submit" value="Submit" className="submit_btn" onClick={() => this.submit}/>
              </form>
          </div>
        );
      }
      handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
      };
    }