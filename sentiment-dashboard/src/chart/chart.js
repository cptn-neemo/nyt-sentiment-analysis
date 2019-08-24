import React from 'react'
import axios from 'axios'
import { Line } from 'react-chartjs-2'

const url = 'https://z0ljpmkx7h.execute-api.us-east-1.amazonaws.com/Prod/sentiment';

export default class ChartContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        axios.get(url)
            .then(response => {
                const chartData = {
                    labels: [],
                    datasets: [
                        {
                            data: []
                        }
                    ]
                }
                
                response.data.body.Items.map(item => {

                })
            })
    }

    render() {

        return (
            <div>Hello</div>
        );
    }
}