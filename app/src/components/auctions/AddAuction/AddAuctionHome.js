import React, {Fragment} from 'react';
import {connect} from "react-redux";
import {SellWithUsMessage} from "./atoms/Message";
import {Col, Container, Row} from "react-bootstrap";

import DutchAuctionModal from "./atoms/DutchAuctionModal";
import EnglishAuctionModal from "./atoms/EnglishAuctionModal";
import SealedBidAuctionModal from "./atoms/SealedBidAuctionModal";
import {AddCardItemTypes} from "./AddCardItemTypes";
import {EnglishAuctions, DutchAuctions, SealedBidAuctions} from "../../navbar/NavItems"
import UserNavBar from "../../navbar/UserNavBar";
import {fetchMyTokens} from "../../../redux/actions/token";
import {addDutchAuction, addSealedBidAuction, addEnglishAuction} from "../../../redux/actions/auction";
import {Loading} from "../../Loading";
import {Receipt} from "./atoms/Receipt";
import {Modal} from "bootstrap/js/src";
import {NoTokens} from "./atoms/NoTokens";
import {resetToastMessage, setToastMessage, SEVERITY} from "../../../redux/actions/messages";

class AddAuctionHome extends React.Component{

    constructor(props, context) {
        super(props, context);
        this.state={
            showEnglish:false,
            showDutch: false,
            showSealedBid: false
        }
        this.props.resetMessage();
    }


    componentDidMount() {
        console.log(this.props.loggedInUser);
        this.props.loggedInUser&&
        this.props.fetchMyTokens(this.props.loggedInUser.username);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.loggedInUser !== prevProps.loggedInUser ||
        this.props.auctionType !== prevProps.auctionType){
            this.props.loggedInUser&&
            this.props.fetchMyTokens(this.props.loggedInUser.username);
        }
        if(this.props.errorAdd !== prevProps.errorAdd){
            this.props.showToastMessage(this.props.errorAdd, SEVERITY.ERROR);
        }
    }

    handleEnglishClick = () =>{
        this.setState({showEnglish: true});
    };
    handleDutchClick = () =>{
        this.setState({showDutch: true});
    };
    handleSealedBidClick = () =>{
        this.setState({showSealedBid: true});
    };
    closeDutchModal=() =>{
        this.setState({showDutch:false});
};
    closeEnglishModal= () =>{
        this.setState({showEnglish:false});
    };
    closeSealedBidModal= () =>{
        this.setState({showSealedBid: false});
    };


    render() {
        return ( <React.Fragment>
                <Loading
                    show={this.props.loadingActiveAuctions}
                    customMessage={'Loading'}
                />
                <NoTokens
                    show={this.props.myTokens.filter((item)=>item.available).length===0}
                    message='See offers'
                    href='/auctions'
                />
                { this.props.responseAdd ?
                    <Receipt
                        show={this.props.responseAdd !== ""}
                        transactionHash={this.props.responseAdd && this.props.responseAdd.transactionHash}
                        gasUsed={this.props.responseAdd && this.props.responseAdd.gasUsed}
                        blockNumber={this.props.responseAdd && this.props.responseAdd.blockNumber}
                        href='/auctions'
                        message='See all auctions'
                    />:null
                }
            <div className="background-home-page">
                <UserNavBar/>
                    <SellWithUsMessage/>
                    <br/>
                    <br/>
                    <br/>
                <Container className="themed-container-home" fluid="xl" >
                    <Row>
                        <Col xs={4} className="cards-body-item-add">
                <AddCardItemTypes
                    title="Start an english auction!"
                    color="#33b5e5"
                    handleClick={this.handleEnglishClick}
                    icon={EnglishAuctions.icon}
                    />
                        </Col>
                        <Col xs={4} className="cards-body-item-add">
                        <AddCardItemTypes
                            title="Start a dutch auction!"
                            color="#2196f3"
                            handleClick={this.handleDutchClick}
                            icon={DutchAuctions.icon}
                        />
                        </Col>
                        <Col xs={4} className="cards-body-item-add">
                        <AddCardItemTypes
                            title="Start a sealed bid auction!"
                            color="#3f51b5"
                            handleClick={this.handleSealedBidClick}
                            icon={SealedBidAuctions.icon}
                        />
                        </Col>
                    </Row>
                </Container>
            </div>
                <DutchAuctionModal
                    show={this.state.showDutch}
                    onHide={this.closeDutchModal}
                    tokenList={this.props.myTokens.filter((item)=>item.available)}
                    loggedInUser={this.props.loggedInUser}
                    create={this.props.addDutchAuction}
                    />
                    <EnglishAuctionModal
                        show={this.state.showEnglish}
                        onHide={this.closeEnglishModal}
                        tokenList={this.props.myTokens.filter((item)=>item.available)}
                        loggedInUser={this.props.loggedInUser}
                        create={this.props.addEnglishAuction}

                    />
                <SealedBidAuctionModal
                    show={this.state.showSealedBid}
                    onHide={this.closeSealedBidModal}
                    tokenList={this.props.myTokens.filter((item)=>item.available)}
                    create={this.props.addSealedBidAuction}
                    loggedInUser={this.props.loggedInUser}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {

    const {auctionType} = state.auctionType;
    const {loggedInUser} = state.authData;
    const {myTokens} = state.token;
    const {loadingActiveAuctions} = state.ui;
    const {responseAdd,errorAdd}= state.auction;
    return {auctionType, myTokens, loggedInUser,loadingActiveAuctions, responseAdd,errorAdd};
};

const mapDispatchToProps = (dispatch) => ({
    fetchMyTokens: (username) => {
        dispatch(fetchMyTokens(username))
    },
    addSealedBidAuction : (username,auctionDetails)=>{
        dispatch(addSealedBidAuction(username,auctionDetails))
    },
    addDutchAuction : (username,auctionDetails)=>{
        dispatch(addDutchAuction(username,auctionDetails))
    },
    addEnglishAuction : (username,auctionDetails)=>{
        dispatch(addEnglishAuction(username,auctionDetails))
    },
    showToastMessage: (message, severity) => {
        dispatch(setToastMessage(message, severity));
    },
    resetMessage: ()=>{
        dispatch(resetToastMessage());
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(AddAuctionHome);