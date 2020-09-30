import React from 'react';
import {Col, Modal, Row} from "react-bootstrap";
import {MDBBtn, MDBIcon} from "mdbreact";
import SealedBidAddAuctionForm from "./SealedBidAddAuctionForm";
import './SealedBidAuctionModal.css'
import {API} from "../../../../constans";
import {
    convertToWei,
    convertToWeiFromGwei,
    getOneWeekFromNow,
    getOneWeekFromNowPlus2Days
} from "../../../../utils/util";



class SealedBidAuctionModal extends React.Component{

    constructor(props, context) {
        super(props, context);
        this.state={
            tokenId:'',
            startingPrice: '',
            startingTime:'',
            gasPrice:'',
            gas:'',
            endingTime:getOneWeekFromNow(),
            revealTime:getOneWeekFromNowPlus2Days(),
            name:''
        }
    }
    handleInputChange = (e)=>{
        const value= e.target.value;
        this.setState({[e.target.name]: value})
    };


    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.tokenList.length != prevProps.tokenList.length){
            this.props.tokenList &&
            this.props.tokenList.find(item=>item.available) ?
                this.setState({tokenId:this.props.tokenList.find(item=>item.available).name})
                :
                this.setState({tokenId:'NoToken'})

        }
    }
    handleInputChange = (e)=>{
        const value= e.target.value;
        this.setState({[e.target.name]: value})
    };

    handleEndingDate = (date)=>{
        this.setState({endingTime:date});
    };

    handleRevealDate = (date)=>{
        this.setState({revealTime:date});
    };

    handleChangeToken = (e) =>
    {
        this.setState({tokenId:e})
    };

    formatTokenList = () =>{
        let list = [];
        this.props.tokenList &&
        this.props.tokenList.map((item)=>{
            if(item.available) {
                let newObject = {
                    id: item.name,
                    value: item.name,
                    name: item.name,
                    flag: API.AVATAR(item.name)
                }
                list.push(newObject)
            }
        });
        return list;
    };

    getIdByName = (name)=>{
        if (this.props.tokenList)
            return this.props.tokenList.find(element => element.name === name).tokenId;
    };

    addAuction = () =>{
        const diff = this.state.endingTime - new Date();
        const seconds = diff / 1000;
        const blocks = Math.ceil(seconds/15);
        const diff2 = this.state.revealTime - new Date();
        const seconds2 = diff2 / 1000;
        const blocks2 = Math.ceil(seconds2/15);
        const auctionDetails = {
            tokenId:this.getIdByName(this.state.tokenId),
            startingPrice: convertToWei(this.state.startingPrice),
            gasPrice: convertToWeiFromGwei(this.state.gasPrice),
            gas: this.state.gas,
            endBiddingTime : blocks,
            endRevealingTime: blocks2
        };
        console.log(this.props.loggedInUser.username, auctionDetails);
        this.props.create(this.props.loggedInUser.username,auctionDetails);
        this.props.onHide();
    };
    render() {
        console.log(this.formatTokenList());
        console.log(this.state.tokenId);
        return(
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                size="lg"              >
                <Modal.Header className="header-sealed-bid-modal">
                    <Modal.Title >Add Sealed Bid Auction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xs={4} className="icon-class-add-modal-sealed">
                            <MDBIcon far icon="envelope" />
                        </Col>
                        <Col xs={8}>
                            <SealedBidAddAuctionForm
                                endingTime={this.state.endingTime}
                                startingPrice={this.state.startingPrice}
                                gasPrice={this.state.gasPrice}
                                gas={this.state.gas}
                                tokenId={this.props.tokenName ? this.props.tokenName :this.state.tokenId}
                                handleInputChange={this.handleInputChange}
                                handleEndingDate={this.handleEndingDate}
                                list={this.formatTokenList()}
                                handleChangeToken={this.handleChangeToken}
                                handleRevealTime={this.handleRevealDate}
                                revealTime={this.state.revealTime}
                            />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <MDBBtn
                        color="indigo"
                        style={{color: "white"}}
                        onClick={this.addAuction}
                    >Save </MDBBtn>
                </Modal.Footer>
            </Modal>

        )
    }
}

export default SealedBidAuctionModal;