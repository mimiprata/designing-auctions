import React, {Fragment} from "react";
import {Loading} from "../../Loading";
import UserNavBar from "../../navbar/UserNavBar";
import {
    cancelSealedBidAuction,
    endReveal, fetchHistorySealedBids,
    fetchSealedBidAuction, fetchUserFromAddress,
    finalizeSealedBidAuction,
    getSealedBidForUser, getSealedBidValueForUser,
    hasFinalizedSealedBid,
    hasRevealed,
    revealBid,
    startReveal, verifySealedBid,
} from "../../../redux/actions/detailsAuction";
import {connect} from "react-redux";
import {Col, Form, Row} from "react-bootstrap";
import {AuctionItem} from "./atoms/AuctionItem";
import {MDBBtn, MDBIcon} from "mdbreact";
import {AlertContainerSealedBid} from "./AlertContainerSealedBid";
import {convertToEther, convertToTime, convertToWei} from "../../../utils/util";
import {
    CANCELED_SEALEDBID,
    ENDED_SEALEDBID,
    REVEALING_SEALEDBID,
    STARTED_SEALEDBID
} from "../../../constans/types";
import {RevealModal} from "./RevealModal";
import {AuctionReceipt} from "./AuctionReceipt";
import {resetToastMessage, setToastMessage, SEVERITY} from "../../../redux/actions/messages";
import {BidHistory} from "./BidHistory";
import BidHistorySealed from "./BidHistorySealed";
//import {BidHistorySealed} from "./BidHistorySealed";


var Web3 = require('web3');


class SealedBidAuction extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.props.resetMessage();
        this.state={
            revealValue:'',
            nonce: '',
            showRevealModal:false,
            clicked:false,
            showReceiptModal:false
        }
    }

    componentDidMount() {
        if (this.props.loggedInUser && this.props.auctionId !== undefined) {
            this.props.fetchSealedBidAuction(this.props.loggedInUser.username, this.props.auctionId);
            this.props.getSealedBidForUser(this.props.loggedInUser.username, this.props.auctionId);
            this.props.hasRevealed(this.props.loggedInUser.username, this.props.auctionId);
            this.props.hasFinalizedSealedBid(this.props.loggedInUser.username, this.props.auctionId);
            this.props.fetchHistorySealedBids(this.props.auctionId);
            this.props.getSealedBidValueForUser(this.props.loggedInUser.username, this.props.auctionId);

        }
        if(this.props.loggedInUser && this.props.auctionId !== undefined){
            this.props.auction && this.props.fetchUserFromAddress(this.props.auction.owner_address);
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.auctionId !== prevProps.auctionId ||
            this.props.refreshDetailsAuction !== prevProps.refreshDetailsAuction) {
            this.props.loggedInUser && this.props.auctionId !== undefined &&
            this.props.fetchSealedBidAuction(this.props.loggedInUser.username, this.props.auctionId);
            this.props.getSealedBidForUser(this.props.loggedInUser.username, this.props.auctionId);
            this.props.hasRevealed(this.props.loggedInUser.username, this.props.auctionId);
            this.props.hasFinalizedSealedBid(this.props.loggedInUser.username, this.props.auctionId);
            this.props.fetchHistorySealedBids(this.props.auctionId);
            this.props.getSealedBidValueForUser(this.props.loggedInUser.username, this.props.auctionId);
        }
        if(this.props.errorResponseReveal !== prevProps.errorResponseReveal) {
            //this.props.resetMessage();
            this.props.showToastMessage(`Wrong reveal values!  Transaction hash:${this.props.errorResponseReveal.receipt.transactionHash.substring(0,9)}`, SEVERITY.ERROR);
            //this.props.fetchSealedBidAuction(this.props.loggedInUser.username, this.props.auctionId);
        }
        if(this.props.errorBid !== prevProps.errorBid) {
            //this.props.resetMessage();
            this.props.showToastMessage(this.props.errorBid, SEVERITY.ERROR);
            //this.props.fetchSealedBidAuction(this.props.loggedInUser.username, this.props.auctionId);
        }
        if(this.props.auction !== prevProps.auction || this.props.auctionId !== prevProps.auctionId){
            this.props.auction && this.props.fetchUserFromAddress(this.props.auction.owner_address);
        }
        if(this.props.successMessage !== prevProps.successMessage){
            //this.props.resetMessage();
            this.props.showToastMessage('Success!', SEVERITY.SUCCESS);
        }
        if(this.props.responseReveal !== prevProps.responseReveal){
            this.showReceiptModal();
        }
    }

    cancelAuction = () => {
        this.props.loggedInUser && this.props.auctionId !== undefined &&
        this.props.cancelSealedBidAuction(this.props.loggedInUser.username, this.props.auctionId);
    };

    startRevealingPeriod = () => {
        this.props.loggedInUser && this.props.auctionId !== undefined &&
        this.props.startReveal(this.props.loggedInUser.username, this.props.auctionId);
    };

    endRevealingPeriod = () =>{
        this.props.loggedInUser && this.props.auctionId !== undefined &&
        this.props.endReveal(this.props.loggedInUser.username, this.props.auctionId);
    };

    handleReveal = () =>{
        //this.props.loggedInUser && this.props.auctionId !== undefined &&
        //this.props.endReveal(this.props.loggedInUser.username, this.props.auctionId);
    };
    finalizeAuction = () =>{
        this.props.loggedInUser && this.props.auctionId !== undefined &&
        this.props.finalizeSealedBidAuction(this.props.loggedInUser.username, this.props.auctionId);
    };

    handleRevealClick = () =>{
        this.setState({showRevealModal: true})
    };

    handleChange = (e)=>{
        this.setState({bidValue:e.target.value});
    };

    handleChangeNonce = (e)=>{
        this.setState({nonce:e.target.value});
    };

    hideModal = () =>{
        this.setState({showRevealModal:false});
    };
    revealSealedBid = () =>{
        console.log(this.state.bidValue, this.state.nonce);

        const details = {
            auctionId:this.props.auctionId !== undefined && this.props.auctionId,
            amount: convertToWei(this.state.bidValue),
            nonce: this.state.nonce,
            username: this.props.loggedInUser.username

        }
        this.props.reveal(details);
        this.hideModal();
    };
    showReceiptModal = ()=>{
        this.setState({showReceiptModal: true});
    };

    hideReceiptModal = () =>{
        this.setState({showReceiptModal: false});
    }
    getLast3Bids = ()=>{

        //console.log(this.props.historySealedBids,this.props.historySealedBids.length);
        if(this.props.historySealedBids.length<3) {
            return this.props.historySealedBids
        } else
           {
                let list=[];
                for (let i= this.props.historySealedBids.length - 3; i < this.props.historySealedBids.length; i++) {
                    list.push(this.props.historySealedBids[i]);
                }
                //console.log(list);
                return list;
            }

    };
    expand = () =>{
        this.setState({expanded: true})
    };

    hide = () =>{
        this.setState({expanded: false,revealValue:'', nonce:''})
    };
    verifyOfferByHash = (transactionHash)=>{
        this.props.verifyOffer(this.props.loggedInUser.username, transactionHash);
        this.setState({clicked:true});
    }
    render() {
        console.log("MIMI++++", this.getLast3Bids())
        return (
            <Fragment>
                <AuctionReceipt
                    show={this.state.showReceiptModal}
                    transactionHash={this.props.responseReveal && this.props.responseReveal.transactionHash}
                    gasUsed={this.props.responseReveal && this.props.responseReveal.gasUsed}
                    blockNumber={this.props.responseReveal && this.props.responseReveal.blockNumber}
                    onHide={this.hideReceiptModal}
                    message='OK'
                />
                <Loading
                    show={this.props.loadingAuctionDetails }
                    customMessage={'Loading'}
                />
                <UserNavBar/>
                <RevealModal
                    handleChange={this.handleChange}
                    revealSealedBid={this.revealSealedBid}
                    value={this.state.bidValue}
                    show={this.state.showRevealModal}
                    onHide={this.hideModal}
                    nonce={this.state.nonce}
                    handleChangeNonce={this.handleChangeNonce}
                />
                <BidHistorySealed
                    historyBids={this.props.historySealedBids}
                    onHide={this.hide}
                    show={this.state.expanded}
                    verifyOfferByHash={this.verifyOfferByHash}
                    responseVerify={this.props.responseVerify}
                    username={this.props.loggedInUser.username}
                    clicked={this.state.clicked}
                />
                <div className="background-details">
                    <Row className="auction-item-container">
                        <div style={{width: "100%", position: "relative"}}>
                            <Row style={{width:"100%"}}>
                            <Col xs={6} className="auction-item-panel">
                                <Col xs={1}>   {'  '}</Col>
                                <Col xs={10}>
                                    <AuctionItem
                                        name={this.props.auction.name}
                                        owner={this.props.user}
                                        description={this.props.auction.description}
                                        auctionState={this.props.auction.auctionState}
                                        auctionType={this.props.auctionType}
                                    />
                                </Col>

                            </Col>


                            <Col xs={6}>
                                <Col xs={10}>
                                    <div className="bid-container">
                                        <Row className="bid-row">


                                                {
                                                    this.props.loggedInUser && this.props.auction &&
                                                    (this.props.loggedInUser.address.toLowerCase() === this.props.auction.owner_address.toLowerCase()
                                                        && this.props.auction.auctionState === STARTED_SEALEDBID) &&
                                                    <Col xs={6}>
                                                    <MDBBtn
                                                        className="button-details"
                                                        color="primary"
                                                        onClick={this.startRevealingPeriod}
                                                    >Start Reveal
                                                    </MDBBtn>
                                                    </Col>
                                                }

                                                {
                                                    this.props.loggedInUser && this.props.auction &&
                                                    (this.props.loggedInUser.address.toLowerCase() === this.props.auction.owner_address.toLowerCase()
                                                        && this.props.auction.auctionState === REVEALING_SEALEDBID) &&
                                                    <Col xs={12}>
                                                    <MDBBtn
                                                        className="button-details"
                                                        color="primary"
                                                        onClick={this.endRevealingPeriod}
                                                    >End reveal
                                                    </MDBBtn>
                                                    </Col>
                                                }

                                                {
                                                    this.props.loggedInUser && this.props.auction &&
                                                    (this.props.loggedInUser.address.toLowerCase() === this.props.auction.owner_address.toLowerCase()
                                                        && this.props.auction.auctionState === ENDED_SEALEDBID && this.props.responseHasFinalizedSealedBid === false) &&
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
                                                    && this.props.auction.auctionState === STARTED_SEALEDBID) &&
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


                                {
                                    this.props.loggedInUser && this.props.auction &&
                                    (this.props.loggedInUser.address.toLowerCase() !== this.props.auction.owner_address.toLowerCase())
                                    && <Col xs={10}>
                                        <div className="bid-container">

                                            {
                                                this.props.auction.auctionState === STARTED_SEALEDBID ?
                                                this.props.sealedBidForCurrentUser.toString().substring(0,9)  === "0x0000000"

                                                ?
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

                                                :
                                                <Row className="bid-row">
                                                    <Col xs={9}>
                                                    You have already send a bid and you cannot send another one!
                                                    </Col>
                                                </Row>
                                                    :null

                                            }
                                            {
                                                this.props.auction.auctionState === REVEALING_SEALEDBID ?

                                                !this.props.responseHasRevealed

                                                ?
                                                <Row className="bid-row">

                                                <Col xs={12}>
                                                <MDBBtn
                                                className="button-details"
                                                color="primary"
                                                onClick={this.handleRevealClick}
                                                >

                                                Reveal now!{' '}
                                                {/* <i className="fas fa-gavel fa-rotate-270"></i>*/}
                                                </MDBBtn>
                                                </Col>
                                                </Row>

                                                :
                                                <Row className="bid-row">
                                                    <Col xs={12}>
                                                You have already revealed your bid!
                                                    </Col>
                                                </Row>
                                                    :null

                                            }
                                            {
                                                this.props.auction.auctionState === ENDED_SEALEDBID || this.props.auction.auctionState === CANCELED_SEALEDBID  ?
                                                    this.props.responseHasFinalizedSealedBid === false?
                                                        <div>
                                                        <Row className="bid-row">

                                                            <Col xs={12}>
                                                                <MDBBtn
                                                                    className="button-details"
                                                                    color="orange"
                                                                    onClick={this.finalizeAuction}
                                                                >
                                                                    {
                                                                        this.props.loggedInUser.address.toLowerCase() === this.props.auction.winningBidder.toLowerCase()?
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
                                                                this.props.loggedInUser.address.toLowerCase() === this.props.auction.winningBidder.toLowerCase() ?
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
                                                {item.returnValues._creator.toString().substring(0, 9)} :
                                                {item.returnValues.hash.substring(0,19)}

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
                                <AlertContainerSealedBid
                                    priceName="Starting price"
                                    price={this.props.auction.startingPrice}
                                    endOfBidding={this.props.auction.auctionState !== ENDED_SEALEDBID && convertToTime(this.props.auction.remainingBiddingTime)}
                                    hasBid={this.props.sealedBidValueForCurrentUser}
                                    actionState={this.props.auction.auctionState}
                                    //hasBid="10"
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
    const {auctionType} = state.auctionType;
    const {loggedInUser} = state.authData;
    const {auction, responseVerify, refreshDetailsAuction, historySealedBids, sealedBidForCurrentUser, sealedBidValueForCurrentUser, responseReveal, errorResponseReveal,responseHasRevealed, user, responseHasFinalizedSealedBid, errorBid, successMessage} = state.activeAuction;
    const {loadingAuctionDetails} = state.ui;
    return {auctionType,auction, loggedInUser, historySealedBids, loadingAuctionDetails, refreshDetailsAuction, sealedBidValueForCurrentUser, errorResponseReveal,sealedBidForCurrentUser, user, responseReveal, responseHasRevealed, responseHasFinalizedSealedBid, responseVerify, errorBid, successMessage};
};


const mapDispatchToProps = (dispatch) => ({
    fetchSealedBidAuction: (username, auctionId) => {
        dispatch(fetchSealedBidAuction(username, auctionId))
    },
    getSealedBidForUser: (username, auctionId) => {
        dispatch(getSealedBidForUser(auctionId, username))
    },
    getSealedBidValueForUser: (username, auctionId) => {
        dispatch(getSealedBidValueForUser(auctionId, username))
    },
    cancelSealedBidAuction: (username, auctionId) => {
        dispatch(cancelSealedBidAuction(username, auctionId))
    },
    startReveal: (username, auctionId) => {
        dispatch(startReveal(username, auctionId))
    },
    endReveal : (username, auctionId) =>{
        dispatch(endReveal(username, auctionId))
    },
    finalizeSealedBidAuction : (username, auctionId) =>{
        dispatch(finalizeSealedBidAuction(username,auctionId))
    },
    reveal : (details)=>{
        dispatch(revealBid(details))
    },
    hasRevealed: (username, auctionId)=>{
        dispatch(hasRevealed(username, auctionId))
    },
    hasFinalizedSealedBid: (username, auctionId)=>{
        dispatch(hasFinalizedSealedBid(username, auctionId))
    },
    fetchUserFromAddress: (account_address)=>{
        dispatch(fetchUserFromAddress(account_address))
    },
    showToastMessage: (message, severity) => {
        dispatch(setToastMessage(message, severity));
    },
    fetchHistorySealedBids : (auctionId) =>{
        dispatch(fetchHistorySealedBids(auctionId));
    },
    verifyOffer:(username, hash)=>{
        dispatch(verifySealedBid(username,hash));
    },
    resetMessage: ()=>{
        dispatch(resetToastMessage());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SealedBidAuction);