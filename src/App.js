import React, { Component } from 'react';
import processCreditCard from './ValidationRoutines.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputCardsText: "",
      validationResults: []
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-3"></div>
        <div className="col-sm-6">
          <div className="card text-center">
            <h4 className="card-header">CTM Test by Alexander Kiskin</h4>
            <div className="card-body">
              <h5 className="card-title">Drop your CC numbers here, one per line</h5>
              <div className="card-text">
                <div className="form-group">
                  <textarea className="form-control" rows="3" onChange={this.handleChange}></textarea>
                </div>
              </div>
              <button className="btn btn-success" onClick={this.onSubmit} disabled={this.state.inputCardsText === ''}>Go!</button>
            </div>
          </div>
          <p></p>
          { (this.state.validationResults.length > 0) && <ValidationResults data={this.state.validationResults} />}
        </div>
        <div className="col-sm-3"></div>
      </div>
    );
  }

  handleChange = (e) => { this.setState({inputCardsText: e.target.value}); }

  onSubmit = (e) => {
    if (this.state.inputCardsText.trim() === '') { 
      this.setState({validationResults: []});
      return; 
    } //Do not do useless work

    //Split input in sepapate strings and call processCreditCard() against them
    this.setState({validationResults: this.state.inputCardsText.replace(/\r\n/g,"\n").split("\n").map(elem => processCreditCard(elem))});
  }
}

const ValidationResults = (props) => 
<div className="card">
  <h5 className="card-header">Results in their order</h5>
  <div className="card-body">
    <div className="card-text">
      {props.data.map((elem, index) => 
        <p key={index}>{elem.type}: {elem.cc} ({elem.valid ? 'valid' : 'invalid'})</p>
      )}
    </div>
  </div>
</div>

export default App;
