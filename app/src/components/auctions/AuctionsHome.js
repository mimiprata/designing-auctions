import React, {Fragment} from 'react';
import {connect} from "react-redux";
import  SealedBidAuctions from "./SealedBidAuctions";
import {Col, Row} from "react-bootstrap";
import TypesNavBar from "../navbar/TypesNavBar";
import EnglishAuctions from "./EnglishAuctions";
import DutchAuctions from "./DutchAuctions";
import {fetchDutchAuction, fetchEnglishAuction, fetchSealedBidAuction} from "../../redux/actions/detailsAuction";
import UserNavBar from "../navbar/UserNavBar";
import Auction from "./details/Auction";
import {fetchAllDutchAuctions, fetchAllEnglishAuctions, fetchAllSealedBidAuctions} from "../../redux/actions/auction";
import {fetchTokenDetails} from "../../redux/actions/token";
import {Loading} from "../Loading";
import {Receipt} from "./AddAuction/atoms/Receipt";
import SearchBar from "./SearchBar";


class AuctionsHome extends React.Component {

    constructor(props) {
        super(props);
        this.state={
           // auctionList: [],
            auctionId: ''
        }
    }

    /*componentDidMount() {

        if (this.props.loggedInUser) {
            switch (this.props.auctionType) {
                case 'DUTCH': {
                    console.log("DUTCH-STARTED");
                    this.props.fetchAllDutchAuctions(this.props.loggedInUser.username);
                    break;
                }
                case 'ENGLISH': {
                    console.log("ENGLISH-STARTED");
                    this.props.fetchAllEnglishAuctions(this.props.loggedInUser.username);
                    break;
                }
                case 'SEALED_BID': {
                    this.props.fetchAllSealedBidAuctions(this.props.loggedInUser.username);
                    break;
                }

            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

            if ((this.props.auctions.length !== prevProps.auctions.length) )
                if(this.props.loggedInUser) {
                console.log('IM UPDATING');
                switch (this.props.auctionType) {
                    case 'DUTCH': {
                        console.log("DUTCH-UPDATING");
                        this.props.fetchAllDutchAuctions(this.props.loggedInUser.username);
                        break;
                    }
                    case 'ENGLISH': {
                        console.log("ENGLISH-UPDATING");
                        this.props.fetchAllEnglishAuctions(this.props.loggedInUser.username);
                        break;
                    }
                    case 'SEALED_BID': {
                        this.props.fetchAllSealedBidAuctions(this.props.loggedInUser.username);
                        break;
                    }


            }
        }
    }*/

    handleAuction = (auctionId) => {
        this.setState({auctionId:auctionId});
    };


    render() {
        console.log(this.props.auctions);
        return (
            <React.Fragment>
                {

              /*  this.state.auctionId ?
                    <React.Fragment>
                        <UserNavBar/>
                        <Auction
                            auctionId = {this.state.auctionId}
                        />
                    </React.Fragment>

                    :*/
                    <React.Fragment>
                        <Loading
                            show={this.props.loadingActiveAuctions}
                            customMessage={'Loading'}
                        />

                <TypesNavBar/>
                <Row>

                    <Col xs={1}/>
                    <Col xs={10}>
                        <SearchBar/>
                    </Col>
                    <Col xs={1}/>
                </Row>
                <Row>
                    {/*<Col xs={1}/>*/}
                    <Col xs={12}>

                        {
                            this.props.auctionType === 'SEALED_BID' ?
                                <SealedBidAuctions
                                    handleAuction = {this.handleAuction}
                                    //auctions = {this.props.auctions}
                                /> :
                                this.props.auctionType ==='ENGLISH' ?
                                    <EnglishAuctions
                                        handleAuction = {this.handleAuction}
                                       // auctions = {this.props.auctions}
                                    /> :
                                    <DutchAuctions
                                        handleAuction = {this.handleAuction}
                                        //auctions = {this.props.auctions}
                                    />
                        }
                    </Col>
                {/*    <Col xs={1}/>*/}
                </Row>
                    </React.Fragment>
                    }
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    const {auctions} = state.auction;
    const {auctionType} = state.auctionType;
    const {loggedInUser} = state.authData;
    const {loadingActiveAuctions} = state.ui;
    return {auctionType, auctions, loggedInUser, loadingActiveAuctions};
};


const mapDispatchToProps = (dispatch) => ({

   /* fetchAllDutchAuctions: (username) => {
        dispatch(fetchAllDutchAuctions(username))
    },
    fetchAllEnglishAuctions: (username) => {
        dispatch(fetchAllEnglishAuctions(username))
    },
    fetchAllSealedBidAuctions: (username) => {
        dispatch(fetchAllSealedBidAuctions(username))
    },*/
    fetchEnglishAuction : (username, auctionId) =>{
        dispatch(fetchEnglishAuction(username,auctionId))
    },
    fetchDutchAuction : (username, auctionId) =>{
        dispatch(fetchDutchAuction(username,auctionId))
    },
    fetchSealedBidAuction : (username, auctionId) =>{
        dispatch(fetchSealedBidAuction(username,auctionId))
    },

});

export default connect(mapStateToProps, mapDispatchToProps)(AuctionsHome);