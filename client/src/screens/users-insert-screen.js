import React, { Component } from "react";
import axios from "axios";
import { Progress } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
var XLSX = require("xlsx");

//TODO: Refactor old validation, remove unnedded functionalities

export class UploadExcelScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: 0,
      jsonData: null,
      readyUpload: false
    };
  }
  checkMimeType = event => {
    let file = event.target.files[0];
    let err = null;
    // allowed file types [excel files]
    const types = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ];
    if (types.every(type => file.type !== type)) {
      err = file.type + " is not a supported format\n";
    }
    if (err) {
      toast.error(err);
      return false;
    } else {
      return true;
    }
  };

  //Setting file size limit
  checkFileSize = event => {
    let file = event.target.files[0];
    let size = 1000 * 1000 * 20;
    let err = '';
    // (file.size)
    // (size)
    if (file.size > size) {
      err = file.type + "is too large, please pick a smaller file\n";
    }
    if (err) {
      toast.error(err);
      return false;
    } else {
      return true;
    }
  };

  checkLength = even => {
    if (even.target.files.length !== 1) {
      toast.error("Must select one excel sheet");
      return false;
    }
    return true;
  };
  //On click choose file
  onChangeHandler = event => {
    if (
      this.checkLength(event) &&
      this.checkMimeType(event) &&
      this.checkFileSize(event)
    ) {
      // If return true, convert the data to JSON to be ready to be sent to backend
      this.setState({
        readyUpload: true
      });
      let workBook = null;
      let jsonData = null;
      const reader = new FileReader();
      reader.onload = onloadEvent => {
        const data = reader.result;
        workBook = XLSX.read(data, { type: "binary" });
        jsonData = XLSX.utils.sheet_to_json(
          workBook.Sheets[workBook.SheetNames[0]]
        );
        this.setState({
          jsonData: jsonData
        });
      };
      if (event.target.files.length === 1) {
        reader.readAsBinaryString(event.target.files[0]);
      }
    }
  };

  //On click upload
  onClickHandler = () => {
    if (this.state.readyUpload === false) {
      toast.error("Please follow the instructions"); // Must wrtie the instructions down
      return;
    }
    axios //Post request with a formatted JSON file
      .post(
        "/api/users/bulkregister",
        this.state.jsonData,
        {
          onUploadProgress: ProgressEvent => {
            this.setState({
              loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
            });
          }
        }
      )
      .then(res => {
        toast.success("Upload successed");
      })
      .catch(err => {
        toast.error("Upload failed");
      });
  };

  render() {
    return (
      <div className="container">
        <center style = {{margin: "25px"}}>
          <div className="row">
            <div className="offset-md-3 col-md-6">
              <div className="form-group files">
                <h1>Upload Excel File </h1>
                <input
                  type="file"
                  className="form-control"
                  multiple
                  onChange={this.onChangeHandler}
                />
              </div>
              <div className="form-group">
                <ToastContainer />
                <Progress max="100" color="success" value={this.state.loaded}>
                  {Math.round(this.state.loaded, 2)}%
                </Progress>
              </div>

              <button
                type="button"
                className="btn btn-success btn-block"
                onClick={this.onClickHandler}
              >
                Upload
              </button>
            </div>
          </div>
        </center>
      </div>
    );
  }
}
