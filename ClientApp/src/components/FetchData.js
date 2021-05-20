import React, { Component } from 'react';
import axios from 'axios'
import { error } from 'jquery';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
      this.state = { forecasts: [], sOfficeName: '', sOfficeAdd: '', loading: true };
     this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.populateWeatherData();
    }

    static renderCreateOfficeTable(forecasts) {
      return (

             <table className='table table-striped' aria-labelledby="tabelLabel">
              <thead>
                  <tr>
                      <th>Office Name</th>
                      <th>Address</th>
                      <th>Mob No</th>
                  </tr>
              </thead>
              <tbody>
                  {
                      forecasts.map(forecast =>
                      <tr key={forecast.sOfficeName}>
                          <td>{forecast.sOfficeName}</td>
                          <td>{forecast.sOfficeAdd}</td>
                          <td>{forecast.sOfficeMobNo}</td>
                      </tr>
                      )}

                  {/*<tr>*/}
                  {/*    <td><input type="text" onChange={e => this.updateOfficeName(e.target.value)} /></td>*/}
                  {/*    <td><input type="text" onChange={e => this.updateOfficeAdd(e.target.value)} /></td>*/}
                  {/*    <td><button value={"example"} onClick={this.handleSubmit} > Save </button> </td>*/}
                  {/*    */}{/*<button onClick={() => { alert("hello world") }}>Hello Application</button>*/}
                  {/*    <td></td>*/}
                  {/*</tr>*/}

              </tbody>
          </table>
      );
    }

    handleSubmit() {
            axios({
            method: 'post',
            url: 'https://yza2oma942.execute-api.eu-west-1.amazonaws.com/Prod/api/officeData',
            headers: {
                'Content-Type': 'application/json'
                     },
                data: {
                    sOfficeName: this.state.sOfficeName,
                    sOfficeAdd: this.state.sOfficeAdd           

            }
        }).then(response => {
            console.log(response.data);
            this.setState({ sOfficeName: '', sOfficeAdd: '' });
            this.populateWeatherData();
            })
            .catch(error => {
                console.log(error)
            });
    }

   
    updateOfficeName(eventValue) {
        this.setState({ sOfficeName: eventValue });
    }


     updateOfficeAdd(eventValue) {
         this.setState({ sOfficeAdd: eventValue })
    }


     static renderForecastsTable(forecasts) {

     return FetchData.renderCreateOfficeTable(forecasts);
         
    }


  render() {
      let contents = this.state.loading
          ? <p><em>Loading...</em></p>
          : FetchData.renderForecastsTable(this.state.forecasts);

      let contents_data =  (
          <table className='table table-striped' aria-labelledby="tabelLabel">

              <tbody>
                  <tr>
                      <td><input type="text" onChange={e => this.updateOfficeName(e.target.value)} /></td>
                      <td><input type="text" onChange={e => this.updateOfficeAdd(e.target.value)} /></td>
                      <td><button value={"example"} onClick={this.handleSubmit} > Save </button> </td>
                      <td></td>
                  </tr>

              </tbody>
          </table>
      );

    return (
      <div>
        <h1 id="tabelLabel" >Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
            {contents}
            {contents_data}
      </div>
      );
  }

    async populateWeatherData() {

        axios.get('https://yza2oma942.execute-api.eu-west-1.amazonaws.com/Prod/api/officeData')           
             .then(response =>
             {
                 console.log(response.data);
                 const data = response.data;

                 this.setState({ forecasts: data, loading: false });
             })
             .catch(error =>
             {
                 console.log(error)
             })
    }
}
