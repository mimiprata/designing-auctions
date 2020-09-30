import React from 'react';
import {Col, Modal, Row} from "react-bootstrap";
import {MDBBtn, MDBIcon} from "mdbreact";
import './EnglishAuctionModal.css'
import {EnglishAddAuctionForm} from "./EnglishAddAuctionForm";
import {API} from "../../../../constans";
import {convertToWei, convertToWeiFromGwei, getOneWeekFromNow} from "../../../../utils/util";


class EnglishAuctionModal extends React.Component{

    constructor(props, context) {
        super(props, context);
        this.state={
            tokenId:'',
            startingPrice: '',
            bidIncrement: '',
            //startingTime:'',
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
    handleInputChange = (e)=>{
        const value= e.target.value;
        this.setState({[e.target.name]: value})
    };

    handleEndingDate = (date)=>{
        this.setState({endingTime:date});
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
                    value: item.tokenId,
                    name: item.name,
                    flag: API.AVATAR(item.name)
                }
                list.push(newObject)
            }
        })
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
        const auctionDetails = {
            tokenId:this.getIdByName(this.state.tokenId),
            startingPrice: convertToWei(this.state.startingPrice),
            gasPrice: convertToWeiFromGwei(this.state.gasPrice),
            gas: this.state.gas,
            duration: blocks,
            bidIncrement: convertToWei(this.state.bidIncrement)

        };
        console.log(this.props.loggedInUser.username, auctionDetails);
        this.props.create(this.props.loggedInUser.username,auctionDetails);
        this.props.onHide();
    };

    render() {
        return(
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                size="lg"              >
                <Modal.Header className="header-english-modal">
                    <Modal.Title >Add English Auction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xs={4} className="icon-class-add-modal">
                            <MDBIcon icon="gavel" />
                        </Col>
                        <Col xs={8}>
                            <EnglishAddAuctionForm
                                endingTime={this.state.endingTime}
                                gasPrice={this.state.gasPrice}
                                gas={this.state.gas}
                                bidIncrement={this.state.bidIncrement}
                                startingPrice={this.state.startingPrice}
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
                    <MDBBtn color={null} className="button-class-add-modal-english"
                            onClick = {this.addAuction}
                    >Save </MDBBtn>
                </Modal.Footer>
            </Modal>

        )
    }
}

export default EnglishAuctionModal;