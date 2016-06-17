require('normalize.css/normalize.css');
require('styles/App.css');
import $ from 'jquery';
import React from 'react';
import moment from 'moment';

class AppComponent extends React.Component {
  constructor() {
      super();
      this.state = {
        temperature: 0,
        humidity: 0,
        pressure: 0,
        time: moment()
      };
  }

  componentDidMount() {
    var updateTemps = this.updateTemps.bind(this);
    var updateTime = this.updateTime.bind(this);

    updateTemps();
    updateTime();

    window.setInterval(updateTemps, 10000);
    window.setInterval(updateTime, 500);
  }

  updateTemps() {
    var self = this;
    $.get('http://192.168.1.155:8000', function (data) {
      self.setState(data);
    });
  }

  updateTime() {
    this.setState({
      time: moment()
    })
  }

  render() {
    var temp = ((this.state.temperature * (9/5)) + 32).toFixed(1) - 20;
    var pressure = (this.state.pressure - 1000).toFixed(2);

    return (
      <div className="index">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <h1 className="date">
                { this.state.time.format("dddd, MMMM Do YYYY") }
              </h1>
              <h1 className="time">
                { this.state.time.format("h:mm:ss a") }
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4">
              <h1 className="metric">{ (this.state.humidity).toFixed(1) }%</h1>
              <h1>Humidity</h1>
            </div>
            <div className="col-sm-4">
              <h1 className="metric">{ temp }°F</h1>
              <h1>Temperature</h1>
            </div>
            <div className="col-sm-4">
              <h1 className="metric">{ pressure } mB</h1>
              <h1>Pressure</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
