import React, { Component } from 'react'

import classes from "./ConsultGraph.module.css";
import moment from "moment";
import Chart from "chart.js/dist/Chart.bundle.js";

//--Chart Style Options--Doesn't seem to work differently for now//
Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif"
Chart.defaults.global.legend.display = false;
// Chart.defaults.global.legend.position = top;
Chart.defaults.global.elements.line.tension = 0.3;
//--Chart Style Options--//

//Here it starts
let myLineChart;

export default class YourLineGraph extends Component {
    chartRef = React.createRef();
    
    componentDidMount() {
        this.buildChart();
        // const myChartRef = this.chartRef.current.getContext("2d");
    }

    componentDidUpdate() {
        this.buildChart();
    }

    buildChart = () => {
        const myChartRef = this.chartRef.current.getContext("2d");
        const { data, average, labels } = this.props;

        if (typeof myLineChart !== "undefined") myLineChart.destroy();

        myLineChart = new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels: labels,
                datasets: [
                    {
                        label: "Consults",
                        data: data,
                        fill: false,
                        borderColor: "#1cacc7",
                        backgroundColor: "#1cacc7",
                        borderWidth: 1
                    }
                    // {
                    //     label: "Cosser Average",
                    //     data: average,
                    //     fill: false,
                    //     borderColor: "#2f5496",
                    //     backgroundColor: "rgba(47, 84, 150, 0.4)",
                    //     borderWidth: 1
                    // }
                ]
            },
            options: {
                //Customize chart options
                responsive: true,
                maintainAspectRatio: true,
                layout: {
                    padding: {
                        top: 0,
                        left: 0,
                        right: 50,
                        bottom: 0
                    }
                },
                scales: {
                    xAxes: [{
                        ticks: { 
                            display: true,
                            // lineWidth: 3,
                            // drawTicks: false,
                            // stepSize: 2000,
                            // beginAtZero: true,
                        },


                        scaleLabel: {
                            display: true,
                            labelString: 'Month'
                        },
                        gridLines: {
                            display: false,
                            drawBorder: false,

                        },
                        type: 'time',
                        time: {
                             unit: 'month'
                         }
                    }],
                    yAxes: [{
                        ticks: { 
                            display: true,
                            drawTicks: true,
                            // lineWidth: 3,
                            // stepSize: 200,
                            // beginAtZero: true,
                            // max: 4400
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'No. of Consults'
                        },
                        gridLines: {
                            display: true,
                            drawBorder: true,

                        },
                    }]
                }    
            }
        });

    }

    render() {
        return (
            <canvas
                id="myChart"
                ref={this.chartRef}
            />
        )
    }
}
