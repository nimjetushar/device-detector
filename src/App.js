import './App.scss';
import React, { Component } from 'react';
import ReactJson from 'react-json-view';
import Detect from 'tutility/detect';
import { bots } from './userAgents/bot';
import { consoles } from './userAgents/console';
import { desktops } from './userAgents/desktop';
import { smartphones } from './userAgents/smartphone';
import { tabs } from './userAgents/tabs';
import { tvs } from './userAgents/tv';

const useragentList = [
  ...bots,
  ...consoles,
  ...desktops,
  ...smartphones,
  ...tabs,
  ...tvs
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      useragent: ''
    };
  }

  componentDidMount() {
    this.setUserAgent();
  }

  setUserAgent() {
    const useragent = useragentList[Math.floor(Math.random() * useragentList.length)];
    const userDetail = new Detect().parse(useragent);

    this.setState({ userDetail, useragent });
  }

  handleTextareaChange(event) {
    this.setState({ useragent: event.target.value });
  }

  handleRandomClick() {
    this.setUserAgent();
  }

  handleKeyPress() {
    if (event.charCode === 13 || event.keyCode === 13) {
      const userDetail = new Detect().parse(this.state.useragent);
      this.setState({ userDetail });
    }
  }

  render() {
    return (
      <div className="app container">
        <h1 className="app-title">Device Detector</h1>
        <div className="app-user-agent-container">
          <div className="app-user-agent-container-title">
            <span className="app-user-agent-container-title-ua">User Agent</span>
            <button className="app-user-agent-container-title-random-btn" onClick={() => this.handleRandomClick()}>
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"
                fill="currentColor" className="app-user-agent-container-title-random-btn-icon">
                <path d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z">
                </path>
              </svg>
              <span className="app-user-agent-container-title-random-btn-title">Randomize</span>
            </button>
          </div>
          <div className="app-user-agent-container-ua-textarea">
            <textarea
              placeholder="Enter a user agent..."
              value={this.state.useragent}
              onChange={(event) => this.handleTextareaChange(event)}
              onKeyPress={(event) => this.handleKeyPress(event)}
            ></textarea>
          </div>
          <div className="app-user-agent-container-result">
            <div className="app-user-agent-container-result-title">Result</div>
            <ReactJson
              src={this.state.userDetail}
              theme="grayscale"
              iconStyle="triangle"
              displayObjectSize={false}
              enableClipboard={false}
              displayDataTypes={false}
            ></ReactJson>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
