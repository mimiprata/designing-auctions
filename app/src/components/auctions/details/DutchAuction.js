import React, {Fragment} from "react";
import {Loading} from "../../Loading";
import UserNavBar from "../../navbar/UserNavBar";
import {connect} from "react-redux";
import {
    bidDutchAuction,
    cancelDutchAuction,
    fetchDutchAuction,
    fetchUserFromAddress
} from "../../../redux/actions/detailsAuction";
import {Col, Form, Row} from "react-bootstrap";
import {AuctionItem} from "./atoms/AuctionItem";
import {MDBBtn} from "mdbreact";
import {AlertContainerDutch} from "./AlertContainerDutch";
import './EnglishAuction.css'
import {BidModal} from "./BidModal";
import {fetchAvatar} from "../../../redux/actions/avatar";
import {ENDED, STARTED} from "../../../constans/types";
import {Line} from "react-chartjs-2";
import {Chart} from "./atoms/Chart";
import {convertToEther, convertToTime} from "../../../utils/util";
import {resetToastMessage, setToastMessage, SEVERITY} from "../../../redux/actions/messages";


class DutchAuction extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            bidValue: '',
            showBidModal: false
        }
        this.props.resetMessage();
    }

    componentDidMount() {
        if (this.props.loggedInUser && this.props.auctionId !== undefined) {
            this.props.fetchDutchAuction(this.props.loggedInUser.username, this.props.auctionId);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.auctionId !== prevProps.auctionId ||
            this.props.refreshDetailsAuction !== prevProps.refreshDetailsAuction) {
            this.props.loggedInUser && this.props.auctionId !==undefined &&
            this.props.fetchDutchAuction(this.props.loggedInUser.username, this.props.auctionId);
        }
        if(this.props.auction !== prevProps.auction){
            //this.props.resetMessage();
            this.props.auction && this.props.fetchUserFromAddress(this.props.auction.owner_address);
        }
        if(this.props.errorBid !== prevProps.errorBid){
            //this.props.resetMessage();
            this.props.showToastMessage(this.props.errorBid, SEVERITY.ERROR);
        }

        if(this.props.successMessage !== prevProps.successMessage){
            //this.props.resetMessage();
            this.props.showToastMessage('Success!', SEVERITY.SUCCESS);
        }
    }
    cancelAuction = () => {
        this.props.loggedInUser && this.props.auctionId !== undefined &&
        this.props.cancelDutchAuction(this.props.loggedInUser.username, this.props.auctionId);
    };

    render() {
        return (
            <Fragment>
                <Loading
                    show={this.props.loadingAuctionDetails}
                    customMessage={'Loading'}
                />
                <UserNavBar/>
                <div className="background-details">
                    <Row className="auction-item-container">
                        <div style={{width: "100%", position: "relative"}}>
                            <Row style={{width:"100%"}}>
                            <Col xs={6} className="auction-item-panel">
                                <Col xs={1}>   {'  '}</Col>
                                <Col xs={10}>
                                    <AuctionItem
                                        name={this.props.auction.name}
                                        description={this.props.auction.description}
                                        owner={this.props.user}
                                        auctionState={this.props.auction.auctionState}
                                    />
                                </Col>

                            </Col>

                            <Col xs={6}>
                                {
                                    this.props.loggedInUser && this.props.auction &&
                                    this.props.loggedInUser.address.toLowerCase() === this.props.auction.owner_address.toLowerCase() ?
                                        this.props.auction.auctionState === STARTED ?
                                        <Col xs={10}>
                                            <div className="bid-container">
                                                <Row className="bid-row">
                                                    <Col xs={12}>
                                                        <MDBBtn
                                                            className="button-details"
                                                            color="red"
                                                            onClick={this.cancelAuction}
                                                        >Cancel auction
                                                        </MDBBtn>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                            :null
                                        :

                                        this.props.auction.auctionState ===STARTED ?
                                        <Col xs={10}>
                                            <div className="bid-container">
                                                <Row className="bid-row">
                                                    <Col xs={12}>

                                                        <MDBBtn
                                                            className="button-details"
                                                            color="orange"
                                                            onClick={this.props.handleBidClick}
                                                        >Bid now!{' '}
                                                            <i className="fas fa-gavel fa-rotate-270"></i>
                                                        </MDBBtn>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col> :
                                            null
                                }
                            </Col>
                        </Row>
                            {
                                this.props.auction.auctionState !==ENDED &&
                                <div className="chart-bids">
                                    <div>
                                        Starting price: {convertToEther(this.props.auction.startingPrice)} ETH
                                    </div>
                                    {/*<Row>
                                <Col xs={6}>
                                <div> Buy now price : {convertToEther(this.props.auction.startingPrice) } ETH
                                </div>
                                </Col>
                                <Col xs={6}>
                                <div>
                                    Price goes to : {convertToEther(this.props.auction.currentPrice-this.props.auction.decrement)} ETH
                                </div>
                                </Col>
                                </Row>*/}
                                    <Chart
                                        // title="Price decrement"
                                        data={[convertToEther(this.props.auction.currentPrice), convertToEther(this.props.auction.currentPrice - this.props.auction.decrement)]}

                                        labels={[`Buy now Price: ${convertToEther(this.props.auction.currentPrice)} ETH`, ` Price goes to : ${convertToEther(this.props.auction.currentPrice - this.props.auction.decrement)} ETH
                              `]}
                                        //data={[convertToEther(this.props.auction.currentPrice), convertToEther(this.props.auction.currentPrice-this.props.auction.decrement)]}
                                    />

                                </div>
                            }
                            <div className="auction-alert-container">
                                <AlertContainerDutch
                                    priceName={this.props.auction.auctionState !==ENDED ?"Current Price" : "Winning Price"}
                                    price={this.props.auction.auctionState !==ENDED ? this.props.auction.currentPrice :this.props.auction.winningBid}
                                    startedAt={this.props.auction.startingPrice  }
                                    timeLeft={this.props.auction.auctionState !==ENDED && convertToTime(this.props.auction.remainingTime)}
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
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    const {loggedInUser} = state.authData;
    const {auction, refreshDetailsAuction, user, errorBid, successMessage} = state.activeAuction;
    const {loadingAuctionDetails} = state.ui;
    return {auction, loggedInUser, loadingAuctionDetails, refreshDetailsAuction, user, errorBid, successMessage};
};

const mapDispatchToProps = (dispatch) => ({
    fetchDutchAuction: (username, auctionId) => {
        dispatch(fetchDutchAuction(username, auctionId))
    },
    cancelDutchAuction: (username, auctionId) => {
        dispatch(cancelDutchAuction(username, auctionId))
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


export default connect(mapStateToProps, mapDispatchToProps)(DutchAuction);