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
      selectedFile: null,
      loaded: 0,
      jsonData: null,
      readyUpload: false
    };
  }
  checkMimeType = event => {
    //Getting files object // No need
    let files = event.target.files;
    //Gefine message container // No need
    let err = [];
    // allowed file types [excel files]
    const types = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ];
    for (let x = 0; x < files.length; x++) {
      // Check each file's type
      if (types.every(type => files[x].type !== type)) {
        err[x] = files[x].type + " is not a supported format\n";
      }
    }
    for (var z = 0; z < err.length; z++) {
      //??
      // if message not same old that mean has error
      // discard selected file
      toast.error(err[z]);
      event.target.value = null;
    }
    return true;
  };

  //Setting file size limit
  checkFileSize = event => {
    let files = event.target.files;
    let size = 2000000;
    let err = [];
    for (var x = 0; x < files.length; x++) {
      if (files[x].size > size) {
        err[x] = files[x].type + "is too large, please pick a smaller file\n";
      }
    }
    for (var z = 0; z < err.length; z++) {
      // if message not same old that mean has error
      // discard selected file
      toast.error(err[z]);
      event.target.value = null;
    }
    return true;
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
      this.checkMimeType(event) &&
      this.checkFileSize(event) &&
      this.checkLength(event)
    ) {
      // If return true, convert the data to JSON to be ready to be sent to backend
      this.setState({
        readyUpload: true
      });
      let workBook = null;
      let jsonData = null;
      const reader = new FileReader();
      reader.onload = ev => {
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
        "http://localhost:8080/api/users/bulkregister",
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
      </div>
    );
  }
}
