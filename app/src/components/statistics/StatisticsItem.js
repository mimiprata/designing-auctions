import React from "react";
import {connect} from "react-redux";
import {
    fetchDutchAddReceipt,
    fetchDutchBidReceipts,
    fetchEnglishAddReceipt, fetchEnglishBidReceipts,
    fetchSealedBidAddReceipt,
    fetchSealedBidBidReceipts
} from "../../redux/actions/statistics";
import {Table} from "./Table";
import {Card, Nav} from "react-bootstrap";
import './Statistics.css'
import {withRouter} from "react-router-dom";
import {Line} from "react-chartjs-2";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import {convertToGweiFromWei} from "../../utils/util";

class StatisticsItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            type:'ADD'
        }
    }

    componentDidMount() {
        if (this.props.loggedInUser) {
            this.props.fetchSealedBidBidReceipts(this.props.loggedInUser.username);
            this.props.fetchSealedBidAddReceipt(this.props.loggedInUser.username);
            this.props.fetchEnglishBidReceipts(this.props.loggedInUser.username);
            this.props.fetchEnglishAddReceipt(this.props.loggedInUser.username);
            this.props.fetchDutchBidReceipts(this.props.loggedInUser.username);
            this.props.fetchDutchAddReceipt(this.props.loggedInUser.username);
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.loggedInUser !== prevProps.loggedInUser) {
            this.props.fetchSealedBidBidReceipts(this.props.loggedInUser.username);
            this.props.fetchSealedBidAddReceipt(this.props.loggedInUser.username);
            this.props.fetchEnglishBidReceipts(this.props.loggedInUser.username);
            this.props.fetchEnglishAddReceipt(this.props.loggedInUser.username);
            this.props.fetchDutchBidReceipts(this.props.loggedInUser.username);
            this.props.fetchDutchAddReceipt(this.props.loggedInUser.username);
        }
    }

    formatData = () =>{
        let data=[];

        this.props.sealedAddReceipts &&
        this.props.sealedAddReceipts.map((item)=>{
            data.push({
                transactionHash: item.hash.substring(0,19),
                gas: item.gas,
                gasPrice: convertToGweiFromWei(item.gasPrice),
                from : item.from.substring(0,19),
                type: 'ADD',
                marketPlace :'SEALED BID',
                blockNumber: item.blockNumber
            })
        });

        this.props.sealedBidReceipts &&
        this.props.sealedBidReceipts.map((item)=>{
            data.push({
                transactionHash: item.hash.substring(0,19),
                gas: item.gas,
                gasPrice:  convertToGweiFromWei(item.gasPrice),
                from : item.from.substring(0,19),
                type: 'BID',
                marketPlace :'SEALED BID',
                blockNumber: item.blockNumber
            })
        });

        this.props.dutchAddReceipts &&
        this.props.dutchAddReceipts.map((item)=>{
            data.push({
                transactionHash: item.hash.substring(0,19),
                gas: item.gas,
                gasPrice:  convertToGweiFromWei(item.gasPrice),
                from : item.from.substring(0,19),
                type: 'ADD',
                marketPlace :'DUTCH',
                blockNumber: item.blockNumber
            })
        });

        this.props.dutchBidReceipts &&
        this.props.dutchBidReceipts.map((item)=>{
            data.push({
                transactionHash: item.hash.substring(0,19),
                gas: item.gas,
                gasPrice:  convertToGweiFromWei(item.gasPrice),
                from : item.from.substring(0,19),
                type: 'BID',
                marketPlace :'DUTCH',
                blockNumber: item.blockNumber
            })
        });

        this.props.englishAddReceipts &&
        this.props.englishAddReceipts.map((item)=>{
            data.push({
                transactionHash: item.hash.substring(0,19),
                gas: item.gas,
                gasPrice:  convertToGweiFromWei(item.gasPrice),
                from : item.from.substring(0,19),
                type: 'ADD',
                marketPlace :'ENGLISH',
                blockNumber: item.blockNumber
            })
        });

        this.props.englishBidReceipts &&
        this.props.englishBidReceipts.map((item)=>{
            data.push({
                transactionHash: item.hash,
                gas: item.gas,
                gasPrice:  convertToGweiFromWei(item.gasPrice),
                from : item.from,
                type: 'BID',
                marketPlace :'ENGLISH',
                blockNumber: item.blockNumber
            })
        });

        return data;
    };

    formatDutchBid = () =>{
        let dutchBidData = [];
        this.props.dutchBidReceipts &&
        this.props.dutchBidReceipts.map((item)=> {
            dutchBidData.push(convertToGweiFromWei(item.gasPrice))
        })
        return dutchBidData;
    };
    formatEnglishBid = () =>{
        let englishBidData = [];
        this.props.englishBidReceipts &&
        this.props.englishBidReceipts.map((item)=> {
            englishBidData.push(convertToGweiFromWei(item.gasPrice))
        })
        return englishBidData;
    };
    formatSealedBid = () =>{
        let sealedBidData = [];
        this.props.sealedBidReceipts &&
        this.props.sealedBidReceipts.map((item)=> {
            sealedBidData.push(convertToGweiFromWei(item.gasPrice))
        })
        return sealedBidData;
    };
    formatDutchAdd = () =>{
        let dutchBidData = [];
        this.props.dutchAddReceipts &&
        this.props.dutchAddReceipts.map((item)=> {
            dutchBidData.push(convertToGweiFromWei(item.gasPrice))
        })
        return dutchBidData;
    };

    getBlockNr= () =>{
        let blockNr=[];
        this.formatData().map((item)=>{
            if(item.type==='ADD') {
                blockNr.push(item.blockNumber);
            }
        });
        return blockNr;
    }
    formatEnglishAdd = () =>{
        let englishBidData = [];
        this.props.englishAddReceipts &&
        this.props.englishAddReceipts.map((item)=> {
            englishBidData.push(convertToGweiFromWei(item.gasPrice))
        })
        return englishBidData;
    };
    formatSealedAdd = () =>{
        let sealedBidData = [];
        this.props.sealedAddReceipts &&
        this.props.sealedAddReceipts.map((item)=> {

            sealedBidData.push(convertToGweiFromWei(item.gasPrice))
        })
        return sealedBidData;
    };

    changeType = (e) =>{
        console.log(e.target.value);
        this.setState({type:e.target.value})
    }


    render() {
        console.log(this.formatSealedAdd());
        const data = this.formatData();
        const x  = this.formatEnglishBid();
        const y = this.formatDutchBid();
        const z = this.formatSealedBid();
        const xAdd = this.formatEnglishAdd();
        const yAdd = this.formatDutchAdd();
        const zAdd = this.formatSealedAdd();



        const u = x.map(i=>'');
        //const z = x.map(i => i+ this.randomInteger(0,2));
        console.log(x, y,z);
        const data1 = {
            //labels: this.getBlockNr(),
            labels: u,
            datasets: [
                {
                    label: 'English',
                    fontSize:20,
                    backgroundColor: 'rgba(255,165,0.2)',
                    borderColor: 'rgba(255,165,1)',
                    pointBackgroundColor: 'rgba(255,165,1)',
                    pointBorderColor: '#fff',
                    fill: false,
                    //lineTension: 1,
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(255,165,1)',

                    lineTension: 0.1,

                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',

                    pointBorderWidth: 1,
                    pointHoverRadius: 5,

                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.state.type === 'ADD' ? zAdd :z

                },
                {
                    label: 'Dutch',
                    fontSize:20,
                    backgroundColor: 'rgba(33,150,243,0.2)',
                    borderColor: 'rgba(33,150,243,1)',
                    fill: false,
                   // lineTension: 1,
                    pointBackgroundColor: 'rgba(33,150,243,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(33,150,243,1)',
                    lineTension: 0.1,

                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',

                    pointBorderWidth: 1,
                    pointHoverRadius: 5,

                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.state.type === 'ADD' ? yAdd : y

                },
                {
                    label: 'FPSB',
                    fontSize:20,
                    backgroundColor: 'rgba(0,128,0,0.2)',
                    borderColor: 'rgba(0,128,0,1)',
                    pointBackgroundColor: 'rgba(0,128,0,1)',
                    pointBorderColor: '#fff',
                    fill: false,
                   // lineTension: 1,
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(0,128,0,1)',
                    lineTension: 0.1,

                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',

                    pointBorderWidth: 1,
                    pointHoverRadius: 5,

                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data:this.state.type === 'ADD' ? xAdd : x
                   // data:x
                }
            ]
        };

        const options = {
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    fontColor: 'black',
                    fontSize: 20
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        fontSize: 20
                    },
                    scaleLabel: {
                        display: true,
                        fontSize:30,
                        labelString: 'GasPrice/GWEI'
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontSize: 20
                    },
                    scaleLabel: {
                        display: true,
                        fontSize:30,
                        labelString: 'Time'
                    }
                }],
            }
        }
        console.log(data);
        return (
            <React.Fragment>

                <Card className="panel-statistics">
                    <Card.Header className="panel-statistics-header">
                        <Nav variant="tabs" activeKey={this.props.location.pathname}>
                        <Nav.Item>
                            <Nav.Link href="/statistics">Statistics</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/statistics/graph">Graphics</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    </Card.Header>
                    <Card.Body className="panel-statistics-body">
                        {
                            this.props.location.pathname === "/statistics"  ?
                            <Table
                                data={data}
                            />
                            :
                                <React.Fragment>
                                    <br/>
                                    <Form>
                                    <Form.Group as={Col} controlId="formGridState">

                                        <Form.Control as="select" value={this.state.type} onChange={this.changeType}>
                                            <option>ADD</option>
                                            <option>BID</option>
                                        </Form.Control>
                                    </Form.Group>
                                    </Form>
                                    <Line
                                        data={data1} options={options}

                                    />
                                </React.Fragment>
                        }
                    </Card.Body>
                </Card>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    const {sealedAddReceipts, sealedBidReceipts, englishAddReceipts, englishBidReceipts, dutchAddReceipts, dutchBidReceipts} = state.statistics;
    const {auctionType} = state.auctionType;
    const {loggedInUser} = state.authData;
    return {auctionType, sealedAddReceipts, sealedBidReceipts, englishAddReceipts, englishBidReceipts, dutchAddReceipts,dutchBidReceipts, loggedInUser};
};

const mapDispatchToProps = (dispatch) => {
    return ({
        fetchSealedBidAddReceipt: (username) => {
            dispatch(fetchSealedBidAddReceipt(username))
        },
        fetchSealedBidBidReceipts: (username) => {
            dispatch(fetchSealedBidBidReceipts(username))
        },
        fetchDutchAddReceipt: (username) => {
            dispatch(fetchDutchAddReceipt(username))
        },
        fetchDutchBidReceipts: (username) => {
            dispatch(fetchDutchBidReceipts(username))
        },
        fetchEnglishAddReceipt: (username) => {
            dispatch(fetchEnglishAddReceipt(username))
        },
        fetchEnglishBidReceipts: (username) => {
            dispatch(fetchEnglishBidReceipts(username))
        }
    });
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(StatisticsItem));