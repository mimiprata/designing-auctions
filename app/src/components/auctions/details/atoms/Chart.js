import React from "react";
import {Line} from "react-chartjs-2";

export const Chart = (props) =>{
    const parametersData = {
        labels: props.labels,
        datasets: [{
           /* label: {
                text: props.title,
                position: "bottom"
            },*/

            fill: false,
            lineTension: 1,
            backgroundColor: '#5bc0de',
            borderColor: '#5bc0de',
            //borderCapStyle: 'butt',
            //borderDash: [],
            //borderDashOffset: 0.0,
            //borderJoinStyle: 'miter',
            pointBorderColor: '#5bc0de',
            pointBackgroundColor: '#fff',
            //pointBorderWidth: 1,
            //pointHoverRadius: 5,
            pointHoverBackgroundColor: '#2aabd2',
            pointHoverBorderColor: '#2aabd2',
            //pointHoverBorderWidth: 2,
            //pointRadius: 1,
            //pointHitRadius: 10,
            data: props.data,

        }]
    };

    const options = {
        maintainAspectRatio: false,	// Don't maintain w/h ratio
        //responsive: true,
        layout: {
            padding: {
                top: 5,
                left: 15,
                right: 15,
                bottom: 15
            }
        },
       /* scales: {
            xAxes: [{
                ticks: { display: false },
                gridLines: {
                    display: false,
                    drawBorder: false
                }
            }],
            yAxes: [{
                ticks: { display: true },
                gridLines: {
                    display: false,
                    drawBorder: true
                }
            }]
        }*/
       legend:{
           display:false,
       },
        tooltips: {
            displayColors: false,
            titleFontSize: 16,
            bodyFontSize: 14,
            xPadding: 10,
            yPadding: 10,
            callbacks: {
                label: (tooltipItem, data) => {
                    return `$ ${tooltipItem.value}`
                }
            }
        }
    }
    return(
        <Line  options={options} width={50} height={170} data={parametersData}/>
    )
}
