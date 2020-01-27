import React from 'react';

class welcome extends React.Component {
    constructor() {
      super();
      this.state = {
        err: ""
      };
    }
    login(e) {
      e.preventDefault();
      var username = e.target.elements.username.value;
      var password = e.target.elements.password.value;
      if (username === "admin" && password === "123") {
        this.props.history.push("./welcome");
      } else {
        this.setState({
          err: "Invalid"
        });
      }
    }
    

    render() {
        return(
            <div> dd</div>
        );
        
    }

}
export default welcome;