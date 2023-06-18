import React, { useEffect, useRef } from 'react'
import { Pie, Doughnut, Bar, Line } from 'react-chartjs-2'


function DoughnutChart(props) {
    const chartRef = useRef(null)
    const { chartData, title, legendDirection, dimensions, layout, labelOffset, legendAlignment, colorSet } = props
    const stats = chartData && chartData.length ? chartData : [{ label: "No Data Found", value: 1 }]
    const bgColors = chartData && chartData.length ? colorSet : ["#ddd"]
    const labels = stats.map(item => `sensor-${item.label}`)
    const values = stats.map(item => item.value)
    const totalSum = values.reduce((a, b) => a + b, 0)
    const percentage = value => (value * 100) / totalSum


    const data = {
        labels,
        datasets: [{
            label: title,
            data: values,
            backgroundColor: bgColors,
            borderWidth: 0
        }]
    }

    const options = {
        responsive: true,
        // maintainAspectRatio: true,
        plugins: {
            // title: {
            //     display: true,
            //     text: "Sensor-wise Data",
            //     align: "start",
            //     color: "#aaa",
            //     font: {
            //         weight: "bold",
            //         size: 16
            //     }
            // },
            legend: {
                display: true,
                position: "right",
                labels: {
                    boxWidth: 20,
                    fontSize: 10
                }
            },
            tooltip: {
                callbacks: {
                    label: c => `${c.label}: $${c.parsed}`
                }
            }
        },
        layout: {
            padding: {
                bottom: 180
            }
        },
    }

    return (
        <Doughnut ref={chartRef} data={data} options={options} height={parseFloat(dimensions.height)} width={parseFloat(dimensions.width)} />
    )
}


const LineChart = (props) => {
    const { chartData, colorSet, dimensions } = props
    const bgColors = chartData && chartData.length ? colorSet : ["#ddd"]

    let _labels = []
    let _data = []
    let _pColors = []
    chartData?.forEach(item => {
        _labels.push(item._time)
        _data.push(item._value)
        _pColors.push(bgColors[parseInt(item.sensor_id, 10) - 1])
    })

    const data = {
        labels: _labels,
        datasets: [
            {
                label: 'Sensor Data',
                data: _data,
                fill: true,
                backgroundColor: 'rgba(75, 192, 192, .2)',
                borderColor: 'rgb(75, 192, 192)',
                pointBackgroundColor: _pColors,
                pointBorderColor: _pColors,
                pointRadius: 3,
                tension: 0.2,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
            },
            x: {
                display: false
            }
        }
    };


    return (
        <Line data={data} options={options} height={parseFloat(dimensions.height)} width={parseFloat(dimensions.width)} />
    )
}

export { DoughnutChart, LineChart }