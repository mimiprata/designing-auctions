import React, {Fragment} from 'react';
import {connect} from "react-redux";
import SealedBidAuction from "./SealedBidAuction";
import EnglishAuction from "./EnglishAuction";
import DutchAuction from "./DutchAuction";
import {BidModal} from "./BidModal";
import {BidModalSealedBid} from "./BidModalSealedBid";
import {Receipt} from "../AddAuction/atoms/Receipt";
import {
    bidDutchAuction,
    bidEnglishAuction,
    bidSealedBidAuction,
    fetchUserFromAddress
} from "../../../redux/actions/detailsAuction";
import {convertToWei, convertToWeiFromGwei} from "../../../utils/util";
import {AuctionReceipt} from "./AuctionReceipt";
var Web3 = require('web3');


class Auction extends React.Component{

    constructor(props, context) {
        super(props, context);
        this.state={
            auctionId: '',
            showBidModal : false,
            bidValue:'',
            gasPrice:'',
            gas:'',
            nonce: '',
            showReceiptModal:false,
        }

    }

    handleBidClick = () =>{
        this.setState({showBidModal: true})
    };

    handleChange = (e)=>{
        this.setState({bidValue:e.target.value});
    };

    handleGasPrice = (e)=>{
        this.setState({gasPrice:e.target.value});
    };

    handleGas = (e)=>{
        this.setState({gas:e.target.value});
    };

    handleChangeNonce = (e)=>{
        this.setState({nonce:e.target.value});
    };

    hideModal = () =>{
        this.setState({showBidModal:false});
    };

    placeDutchBid = () =>{
        console.log(this.state.bidValue);
        const weiValue = Web3.utils.toWei(`${this.state.bidValue}`, 'ether');
        console.log(parseInt(weiValue));
        const gasPriceGwei = convertToWeiFromGwei(this.state.gasPrice);
        this.props.bidDutchAuction(this.props.loggedInUser.username,this.state.auctionId,parseInt(weiValue),gasPriceGwei , this.state.gas);
        this.hideModal();
    };

    placeEnglishBid = () =>{
        console.log(this.state.bidValue);
        const weiValue = Web3.utils.toWei(`${this.state.bidValue}`, 'ether');
        console.log(parseInt(weiValue));
        const gasPriceGwei = convertToWeiFromGwei(this.state.gasPrice);
        this.props.bidEnglishAuction(this.props.loggedInUser.username,this.state.auctionId,parseInt(weiValue),gasPriceGwei , this.state.gas);
        this.hideModal();
    };

    placeSealedBid = () =>{
        console.log(this.state.bidValue, this.state.nonce);
        const details = {
            auctionId:this.state.auctionId,
            value: convertToWei(this.state.bidValue),
            nonce: this.state.nonce,
            username: this.props.loggedInUser.username,
            gasPrice : convertToWeiFromGwei(this.state.gasPrice),
            gas: this.state.gas
        };
        this.props.bidSealedBidAuction(details);
        this.hideModal();
    };


    componentDidMount() {
        this.setState({auctionId: this.props.location.state.auctionId})
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.location.state.auctionId !== prevProps.location.state.auctionId){
            this.setState({auctionId: this.props.location.state.auctionId});
        }

        if(this.props.responseBid !== prevProps.responseBid){
            this.showReceiptModal();
        }
    }

    showReceiptModal = ()=>{
        this.setState({showReceiptModal: true});
    };

    hideReceiptModal = () =>{
        this.setState({showReceiptModal: false});
    }


    render() {

        return(
        <Fragment>
            <AuctionReceipt
                show={this.state.showReceiptModal}
                transactionHash={this.props.responseBid && this.props.responseBid.transactionHash}
                gasUsed={this.props.responseBid && this.props.responseBid.gasUsed}
                blockNumber={this.props.responseBid && this.props.responseBid.blockNumber}
                onHide={this.hideReceiptModal}
                message='OK'
            />

            {

                this.props.auctionType === 'SEALED_BID' ?
                    <React.Fragment>
                    <SealedBidAuction
                        auctionId={this.state.auctionId}
                        handleBidClick={this.handleBidClick}
                    />
                        <BidModalSealedBid
                            handleChange={this.handleChange}
                            handleBidClick={this.placeSealedBid}
                            value={this.state.bidValue}
                            show={this.state.showBidModal}
                            onHide={this.hideModal}
                            handleGasPrice={this.handleGasPrice}
                            handleGas={this.handleGas}
                            gasPrice={this.state.gasPrice}
                            gas={this.state.gas}
                            nonce={this.state.nonce}
                            handleChangeNonce={this.handleChangeNonce}
                        />
                    </React.Fragment>:
                    this.props.auctionType ==='ENGLISH' ?
                        <React.Fragment>
                        <EnglishAuction
                            auctionId={this.state.auctionId}
                            handleBidClick={this.handleBidClick}
                        />
                            <BidModal
                                handleChange={this.handleChange}
                                handleBidClick={this.placeEnglishBid}
                                value={this.state.bidValue}
                                handleGasPrice={this.handleGasPrice}
                                handleGas={this.handleGas}
                                gasPrice={this.state.gasPrice}
                                gas={this.state.gas}
                                show={this.state.showBidModal}
                                onHide={this.hideModal}
                            />
                        </React.Fragment>:
                        <React.Fragment>
                        <DutchAuction
                            auctionId={this.state.auctionId}
                            handleBidClick={this.handleBidClick}
                        />
                            <BidModal
                                handleChange={this.handleChange}
                                handleGasPrice={this.handleGasPrice}
                                handleGas={this.handleGas}
                                handleBidClick={this.placeDutchBid}
                                value={this.state.bidValue}
                                gasPrice={this.state.gasPrice}
                                gas={this.state.gas}
                                show={this.state.showBidModal}
                                onHide={this.hideModal}
                            />
                        </React.Fragment>
            }

            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    const {auctionType} = state.auctionType;
    const {loggedInUser} = state.authData;
    const {responseBid}= state.activeAuction;
    return {auctionType, responseBid, loggedInUser};
};

const mapDispatchToProps = (dispatch) => ({
    bidSealedBidAuction: (details) => {
        dispatch(bidSealedBidAuction(details))
    },
    bidDutchAuction :(username, auctionId, value, gasPrice, gas)=>{
        dispatch(bidDutchAuction(username, auctionId, value, gasPrice, gas))
    },
    bidEnglishAuction: (username, auctionId, value, gasPrice, gas) => {
        dispatch(bidEnglishAuction(username, auctionId, value, gasPrice, gas))
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(Auction);