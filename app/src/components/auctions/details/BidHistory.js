import {Modal} from "react-bootstrap";
import React from "react";
import {MDBIcon} from "mdbreact";
import {convertToEther} from "../../../utils/util";
import './EnglishAuction.css'
import './BidHistory.css'
import {Chart} from "./atoms/Chart";
import {Line} from "react-chartjs-2";

export const BidHistory = (props) => {
    const {show, onHide, historyBids, data} = props;
    console.log(data);
    const u = historyBids.map(i=>'');
    const parametersData = {
        //labels: [`Buy now Price: ${convertToEther(0)} ETH`, ` Price goes to : ${convertToEther(10)} ETH`],
        labels:u,
        datasets: [{
            label: 'English Bid',

            fill: false,
            lineTension: 0.1,
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
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Bid value/ETH'
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Bid number'
                }
            }],
        }
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
        >
            <Modal.Header>
                <Modal.Title>History</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="bid-history-container">
                    <div className="bid-history-container-left">
                        {
                            historyBids.map((item) => {
                                return <div className="history-bids-item">

                                    <MDBIcon icon="gavel"/> {' '}
                                    {item.returnValues.bidder.toString().substring(0, 9)} :
                                    {convertToEther(item.returnValues.amount)}ETH

                                </div>
                            })

                        }
                    </div>
                    <div className="bid-history-container-right">
                        <Line options={options} data={parametersData}/>
                    </div>
                </div>
            </Modal.Body>
        </Modal>)
}