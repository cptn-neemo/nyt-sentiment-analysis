import React, { Component } from 'react';
import ChartContainer from './chart/chart'
import './App.css';

class App extends Component {
  render() {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <div className="header">
                <h1 style={{ margin: '0'}}>NYT Sentiment Analysis</h1>
            </div>
            <div className="chart-body">
                <ChartContainer />
            </div>
        </div>
    );
  }
}

export default App;
