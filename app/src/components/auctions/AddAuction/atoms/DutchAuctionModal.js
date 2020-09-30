import React from 'react';
import {Col, Modal, Row} from "react-bootstrap";
import DutchAddAuctionForm from "./DutchAddAuctionForm";
import {MDBBtn, MDBIcon} from "mdbreact";
import './DutchAuctionModal.css'
import {API} from "../../../../constans";
import {convertToWei, convertToWeiFromGwei, getOneWeekFromNow} from "../../../../utils/util";


class DutchAuctionModal extends React.Component{

    constructor(props, context) {
        super(props, context);
        this.state={
            tokenId:'',
            startingPrice: '',
            endingPrice: '',
            offerDecrement: '',
            startingTime:'',
            gasPrice:'',
            gas:'',
            endingTime:getOneWeekFromNow(),
            name:''
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.tokenList.length != prevProps.tokenList.length){
            this.props.tokenList &&
            this.props.tokenList.find(item=>item.available)?
                this.setState({tokenId:this.props.tokenList.find(item=>item.available).name})
                :
                this.setState({tokenId:'NoToken'})
        }
    }

    getIdByName = (name)=>{
        if (this.props.tokenList)
            return this.props.tokenList.find(element => element.name === name).tokenId;
    };

    addAuction = () =>{
        const diff = this.state.endingTime - new Date();
        const seconds = diff / 1000;
        const blocks = Math.ceil(seconds/15);
        const auctionDetails = {
            tokenId:this.getIdByName(this.props.tokenName ? this.props.tokenName :this.state.tokenId),
            startingPrice: convertToWei(this.state.startingPrice),
            gasPrice: convertToWeiFromGwei(this.state.gasPrice),
            gas: this.state.gas,
            duration: blocks,
            offerPriceDecrement: convertToWei(this.state.offerDecrement),
            endingPrice : convertToWei(this.state.endingPrice)

        };
        this.props.create(this.props.loggedInUser.username,auctionDetails);
        this.props.onHide();
    };

    handleInputChange = (e)=>{
        const value= e.target.value;
        this.setState({[e.target.name]: value})
    };

    handleEndingDate = (date)=>{
        this.setState({endingTime:date});
    };

    handleChangeToken = (e) =>
    {
        console.log(e);
        this.setState({tokenId:e})
    }

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
            })
        return list;
    }

    render() {
        return(
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                size="lg"              >
                <Modal.Header className="header-dutch-modal">
                    <Modal.Title >Add Dutch Auction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                    <Col xs={4} className="icon-class-add-modal">
                        <MDBIcon far icon="clock" />
                    </Col>
                    <Col xs={8}>
                    <DutchAddAuctionForm
                        endingTime={this.state.endingTime}
                        startingTime={this.state.startingTime}
                        offerDecrement={this.state.offerDecrement}
                        startingPrice={this.state.startingPrice}
                        endingPrice={this.state.endingPrice}
                        gasPrice={this.state.gasPrice}
                        gas={this.state.gas}
                        tokenId={this.props.tokenName ? this.props.tokenName :this.state.tokenId}
                        handleInputChange={this.handleInputChange}
                        handleEndingDate={this.handleEndingDate}
                        list={this.formatTokenList()}
                        handleChangeToken={this.handleChangeToken}

                    />
                    </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <MDBBtn color={null} className="button-class-add-modal-dutch"
                    onClick = {this.addAuction}>Save </MDBBtn>
                </Modal.Footer>
            </Modal>

        )
    }
}

export default DutchAuctionModal;