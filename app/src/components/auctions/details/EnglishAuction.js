import React, {Fragment} from 'react';
import {AuctionItem} from "./atoms/AuctionItem";
import {connect} from "react-redux";
import {
    cancelEnglishAuction, endEnglishAuction,
    fetchEnglishAuction, fetchHistoryBids, fetchUserFromAddress, finalizeEnglishAuction,
    getEnglishBidForUser, hasFinalizedEnglish
} from "../../../redux/actions/detailsAuction";
import UserNavBar from "../../navbar/UserNavBar";
import './Auction.css'
import {Col, Form, Row} from "react-bootstrap";
import './EnglishAuction.css'
import {AlertContainer} from "./AlertContainer";
import {MDBBtn, MDBIcon} from "mdbreact";
import {Loading} from "../../Loading";
import {convertToEther, convertToTime} from "../../../utils/util";
import {CANCELED, ENDED, ENDED_SEALEDBID, STARTED} from "../../../constans/types";
import {resetToastMessage, setToastMessage, SEVERITY} from "../../../redux/actions/messages";
import {BidHistory} from "./BidHistory";
import {AuctionItemApartment} from "./atoms/AuctionItemApartment";
var Web3 = require('web3');
class EnglishAuction extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.props.resetMessage();

        this.state = {
            expanded: false
        }
    }

    componentDidMount() {
        if (this.props.loggedInUser && this.props.auctionId) {
            console.log(this.props.auctionId);
            this.props.fetchEnglishAuction(this.props.loggedInUser.username, this.props.auctionId);
            this.props.getEnglishBidForUser(this.props.loggedInUser.username, this.props.auctionId);
            this.props.hasFinalizedEnglish(this.props.loggedInUser.username, this.props.auctionId);
            this.props.fetchHistoryBids(this.props.auctionId);
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.props.auctionId);
        if (this.props.auctionId !== prevProps.auctionId ||
            this.props.refreshDetailsAuction !== prevProps.refreshDetailsAuction ||
            this.props.loggedInUser !== prevProps.loggedInUser
        ) {
            if (this.props.loggedInUser && this.props.auctionId !==undefined) {
                this.props.fetchEnglishAuction(this.props.loggedInUser.username, this.props.auctionId);
                this.props.getEnglishBidForUser(this.props.loggedInUser.username, this.props.auctionId);
                this.props.hasFinalizedEnglish(this.props.loggedInUser.username, this.props.auctionId);
                this.props.fetchHistoryBids(this.props.auctionId);

            }
           // this.props.getEnglishBidForUser('user', this.props.contractAddress);
        }

        if(this.props.auction !== prevProps.auction){
            this.props.auction && this.props.fetchUserFromAddress(this.props.auction.owner_address);
        }

        if(this.props.errorMessage !== prevProps.errorMessage ){
            //this.props.resetMessage();
            this.props.showToastMessage(this.props.errorMessage, SEVERITY.ERROR);
        }
        if(this.props.errorBid !== prevProps.errorBid ){
           // this.props.resetMessage();
            this.props.showToastMessage(this.props.errorBid, SEVERITY.ERROR);

        }

        if(this.props.successMessage !== prevProps.successMessage){
          //  this.props.resetMessage();
                    this.props.showToastMessage(this.props.successMessage, SEVERITY.SUCCESS);
        }



    }

    cancelAuction = () => {
        this.props.loggedInUser && this.props.auctionId !== undefined &&
        this.props.cancelEnglishAuction(this.props.loggedInUser.username, this.props.auctionId);
    };

    endAuction = () =>{
        this.props.loggedInUser && this.props.auctionId !== undefined &&
        this.props.endEnglishAuction(this.props.loggedInUser.username, this.props.auctionId);
    };

    finalizeAuction =() =>{
        this.props.loggedInUser && this.props.auctionId !== undefined &&
        this.props.finalizeEnglishAuction(this.props.loggedInUser.username, this.props.auctionId);
    };

    getLast3Bids = ()=>{

        if(this.props.historyEnglishBids.length<3) {
            return this.props.historyEnglishBids
        } else
        {
            let list=[];
            for (let i= this.props.historyEnglishBids.length - 3; i < this.props.historyEnglishBids.length; i++) {
                list.push(this.props.historyEnglishBids[i]);
            }
            //console.log(list);
            return list;
        }

    };


    expand = () =>{
        this.setState({expanded: true})
    };

    hide = () =>{
        this.setState({expanded: false})
    };

    getData = () =>{
        let chartValues = [];
        this.props.historyEnglishBids.map((item)=>{
            chartValues.push(convertToEther(item.returnValues.amount))
        });
        return chartValues;
    };

  /*  getReceipts = () =>{
        let receipts =[];
        this.props.historyEnglishBids.map((item)=>{
           Web3.eth.getTransactionReceipt(item.transactionHash,(err,res)=>{
                console.log(err,res);

            }).then((result)=>{
                console.log(result);
                receipts.push(result)
           })
        })
        return receipts;
    }*/
    render() {
        console.log(this.props.errorMessage);
        return (
            <Fragment>
                <Loading
                    show={this.props.loadingAuctionDetails}
                    customMessage={'Loading'}
                />
                <BidHistory
                    historyBids={this.props.historyEnglishBids}
                    onHide={this.hide}
                    show={this.state.expanded}
                    data={this.getData()}
                />

                <UserNavBar/>
                <div className="background-details">
                    <Row className="auction-item-container">
                        <div style={{width: "100%", position: "relative"}}>
                            <Row style={{width:"100%"}}>
                                <Col xs={6} className="auction-item-panel">
                                    <Col xs={1}>   {'  '}</Col>
                                    <Col xs={10}>
                                      {/*  <AuctionItem
                                            name={this.props.auction.name}
                                            description={this.props.auction.description}
                                            nameOfPrice="Current Price: "
                                            price={`${this.props.auction.currentPrice} ETH`}
                                            owner={this.props.user}
                                            ownerAvatar={this.props.avatar}
                                            auctionState={this.props.auction.auctionState}
                                        />*/}
                                        <AuctionItemApartment
                                            name={this.props.auction.name}
                                            description={this.props.auction.description}
                                            nameOfPrice="Current Price: "
                                            price={`${this.props.auction.currentPrice} ETH`}
                                            owner={this.props.user}
                                            ownerAvatar={this.props.avatar}
                                            auctionState={this.props.auction.auctionState}
                                            ipfs_has={this.props.auction.ipfs_has}
                                        />
                                    </Col>

                                </Col>

                                <Col xs={6}>

                                    <Col xs={10}>
                                        <div className="bid-container-owner">
                                            <Row className="bid-row">


                                                    {
                                                        this.props.loggedInUser && this.props.auction &&
                                                        (this.props.loggedInUser.address.toLowerCase() === this.props.auction.owner_address.toLowerCase()
                                                            && this.props.auction.auctionState === STARTED) &&
                                                        <Col xs={6}>
                                                        <MDBBtn
                                                            className="button-details"
                                                            color="primary"
                                                            onClick={this.endAuction}
                                                        >End auction
                                                        </MDBBtn>
                                                        </Col>
                                                    }
                                                    {
                                                        this.props.loggedInUser && this.props.auction &&
                                                        (this.props.loggedInUser.address.toLowerCase() === this.props.auction.owner_address.toLowerCase()
                                                            && (this.props.auction.auctionState === ENDED ) && this.props.responseHasFinalizedEnglish===false) &&
                                                        <Col xs={12}>
                                                        <MDBBtn
                                                            className="button-details"
                                                            color="primary"
                                                            onClick={this.finalizeAuction}
                                                        >Finalize
                                                        </MDBBtn>
                                                        </Col>
                                                    }
                                                {
                                                    this.props.loggedInUser && this.props.auction &&
                                                    (this.props.loggedInUser.address.toLowerCase() === this.props.auction.owner_address.toLowerCase()
                                                        && this.props.auction.auctionState === STARTED) &&
                                                    <Col xs={6}>
                                                        <MDBBtn
                                                            className="button-details"
                                                            color="red"
                                                            onClick={this.cancelAuction}
                                                        >Cancel auction
                                                        </MDBBtn>
                                                    </Col>


                                                }

                                            </Row>
                                        </div>
                                    </Col>

                                    { this.props.loggedInUser && this.props.auction &&
                                    (this.props.loggedInUser.address.toLowerCase() !== this.props.auction.owner_address.toLowerCase())
                                    && <Col xs={10}>
                                        <div className="bid-container-english">

                                            {
                                                this.props.auction.auctionState === STARTED &&
                                                <Row className="bid-row">

                                                    <Col xs={12}>
                                                        <MDBBtn
                                                            className="button-details"
                                                            color="orange"
                                                            onClick={this.props.handleBidClick}
                                                        >

                                                            Bid now!{' '}
                                                            <i className="fas fa-gavel fa-rotate-270"></i>
                                                        </MDBBtn>
                                                    </Col>
                                                </Row>
                                            }
                                            {
                                            this.props.auction.auctionState === STARTED &&
                                              this.props.loggedInUser.address.toLowerCase()  !== this.props.auction.highestBidder.toLowerCase() &&
                                                <Row>
                                                    <Col xs={12}>
                                                        <Form.Label style={{fontSize: "14px"}}>
                                                            Bid more
                                                            than {convertToEther(this.props.auction.highestBid)} ETH
                                                            to
                                                            outbid the highest bidder!
                                                        </Form.Label>
                                                    </Col>
                                                </Row>

                                        }
                                            {
                                                this.props.auction.auctionState === ENDED || this.props.auction.auctionState === CANCELED?
                                                    this.props.responseHasFinalizedEnglish === false?
                                                        <div>
                                                        <Row className="bid-row">

                                                            <Col xs={12}>
                                                                <MDBBtn
                                                                    className="button-details"
                                                                    color="orange"
                                                                    onClick={this.finalizeAuction}
                                                                >
                                                                    {
                                                                        this.props.loggedInUser.address.toLowerCase() === this.props.auction.highestBidder.toLowerCase()?
                                                                            <div>
                                                                                Claim now!{' '}
                                                                            </div>
                                                                            :
                                                                            <div>
                                                                                REFUND
                                                                            </div>


                                                                    }
                                                                </MDBBtn>
                                                            </Col>
                                                        </Row>
                                                            {
                                                            this.props.loggedInUser.address.toLowerCase() === this.props.auction.highestBidder.toLowerCase() ?
                                                                <Row>
                                                                    <Col xs={12}>
                                                                        <Form.Label style={{fontSize: "14px"}}>
                                                                            Congratulations! You are the lucky winner.
                                                                        </Form.Label>
                                                                    </Col>
                                                                </Row>:

                                                            <Row>
                                                                <Col xs={12}>
                                                                    <Form.Label style={{fontSize: "14px"}}>
                                                                        Oops, you did not win.
                                                                    </Form.Label>
                                                                </Col>
                                                            </Row>
                                                                }
                                                        </div>

                                                        :
                                                        <Row className="bid-row">
                                                            <Col xs={12}>
                                                            You have already finalized!
                                                            </Col>
                                                        </Row>
                                                    :null

                                            }


                                        </div>

                                    </Col>

                                    }

                                </Col>
                            </Row>
                            {
                                this.getLast3Bids() &&
                                this.getLast3Bids().length>0 &&
                                <div className="history-bids">
                                    <h3 style={{fontWeight: 400}}>Bidding history</h3>
                                    {
                                        this.getLast3Bids().map((item) => {
                                            return <div className="history-bids-item">

                                                <MDBIcon icon="gavel"/> {' '}
                                                {item.returnValues.bidder.toString().substring(0, 9)} :
                                                {convertToEther(item.returnValues.amount)}ETH

                                            </div>
                                        })
                                    }
                                    <div  onClick={this.expand} style={{visibility:"hidden"}}>
                                        <MDBIcon icon="chart-line" />
                                    </div>
                                </div>

                            }
                            {
                                this.getLast3Bids() &&
                                this.getLast3Bids().length >= 3 &&
                                <div className="history-bids-item-extend" onClick={this.expand}>
                                    <MDBIcon icon="chart-line"/>
                                </div>
                            }
                            <div className="auction-alert-container">
                                <AlertContainer
                                    priceName={this.props.auction.auctionState !==ENDED ? "Current Bid" : "Winning Bid"}
                                    price={this.props.auction.highestBid}
                                    nrOfBids={this.props.auction.bidsCount}
                                    timeLeft={this.props.auction.auctionState !==ENDED && convertToTime(this.props.auction.remainingTime)}
                                    hasBid={this.props.englishBidForCurrentUser}
                                    startingPrice={this.props.auction.startingPrice}
                                    startingPriceName="Starting price"
                                />
                            </div>
                            <div className="auction-line">
                                {' '}
                            </div>
                        </div>

                    </Row>
                    <Row className="auction-item-container">

                    </Row>
                </div>

            </Fragment>);
    }
}

const mapStateToProps = (state) => {
    const {loggedInUser} = state.authData;
    const {auction, refreshDetailsAuction, englishBidForCurrentUser,
        responseHasFinalizedEnglish, historyEnglishBids, user, successMessage, errorMessage, errorBid} = state.activeAuction;
    const {loadingAuctionDetails} = state.ui;
    return {auction, loggedInUser, loadingAuctionDetails,user,
        refreshDetailsAuction, englishBidForCurrentUser, responseHasFinalizedEnglish, historyEnglishBids, successMessage, errorMessage, errorBid};
};


const mapDispatchToProps = (dispatch) => ({
    fetchEnglishAuction: (username, auctionId) => {
        dispatch(fetchEnglishAuction(username, auctionId))
    },
    getEnglishBidForUser: (username, auctionId) => {
        dispatch(getEnglishBidForUser(username, auctionId))
    },
    cancelEnglishAuction: (username, auctionId)=>{
        dispatch(cancelEnglishAuction(username,auctionId))
    },
    endEnglishAuction:(username,auctionId)=>{
        dispatch(endEnglishAuction(username,auctionId))
    },
    finalizeEnglishAuction:(username,auctionId)=>{
        dispatch(finalizeEnglishAuction(username,auctionId))
    },
    hasFinalizedEnglish:(username,auctionId)=>{
        dispatch(hasFinalizedEnglish(username,auctionId))
    },
    fetchHistoryBids:(auctionId)=>{
        dispatch(fetchHistoryBids(auctionId))
    },
    fetchUserFromAddress: (account_address)=>{
        dispatch(fetchUserFromAddress(account_address))
    },
    showToastMessage: (message, severity) => {
        dispatch(setToastMessage(message, severity));
    },
    resetMessage: ()=>{
        dispatch(resetToastMessage());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(EnglishAuction);