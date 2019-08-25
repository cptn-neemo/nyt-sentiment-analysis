import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Line } from 'react-chartjs-2';

const url = 'https://z0ljpmkx7h.execute-api.us-east-1.amazonaws.com/Prod/sentiment';

export default class ChartContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = { chartData: {} }
    }

    componentDidMount() {
        axios.get(url)
            .then(response => {
                const chartData = {
                    labels: [  ],
                    datasets: [
                        {
                            label: 'Sentiment',
                            data: [ ],
                            borderColor: [ '#F9D342' ],
                            fill: false
                        }
                    ],
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    min: -1,
                                    max: 1 
                                }
                            }]
                        }
                    }
                }

                const dateBuckets = {}

                response.data.body.Items.forEach(item => {
                    const date = moment(item.created).format('M/D/YYYY');

                    if (!dateBuckets[date])
                        dateBuckets[date] = []
                    dateBuckets[date].push(item.sentiment)
                })

                Object.keys(dateBuckets).sort().forEach(day => {
                    const average = dateBuckets[day].reduce((a,b) => a + b, 0) / dateBuckets[day].length;

                    chartData.labels.push(day);
                    chartData.datasets[0].data.push(average)
                })

                console.log(chartData)

                this.setState({ chartData })
            })
    }

    render() {

        return (
            <div style={{ width: '66%', height: '50%' }}>
                <Line
                    data={this.state.chartData}
                />
            </div>
        );
    }
}