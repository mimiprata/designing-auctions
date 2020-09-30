import React from 'react';
import {MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol} from "mdbreact";
import './Auctions.css';
import {Col, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {convertToEther, convertToTime} from "../../utils/util";
import {AddCardItem} from "./AddCardItem";
import {fetchAllSealedBidAuctions} from "../../redux/actions/auction";
import {Loading} from "../Loading";
import {Link} from "react-router-dom";
import {API} from "../../constans";

var x = [];
var i = 0;
for(i; i<102; i++){
    x.push(i);
}

class SealedBidAuctions extends React.Component{


    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        this.props.loggedInUser &&
        this.props.fetchAllSealedBidAuctions(this.props.loggedInUser.username);
    }

    render() {
        const auctions = this.props.auctions;
        return (
            <React.Fragment>
                <Loading
                    show={this.props.loadingActiveAuctions}
                    customMessage={'Loading'}
                />
            <div className="cards-body">
                <div className="cards-body-item">
                <AddCardItem
                    title="Start a sealed bid auction!"
                    color="#3f51b5"
                    className="card-class"
                    //handleClick={this.handleSealedBidClick}
                />
            </div>
                {auctions &&
                auctions.map((item) => {
                    return <div className="cards-body-item">
                   <MDBCard className="card-class">
                            <MDBCardImage className="img-fluid"
                                          src={`${API.AVATAR(item.name)}`}
                                          waves/>
                            <MDBCardBody>
                                <MDBCardTitle>{item.name}</MDBCardTitle>
                                <MDBCardText>
                                    <Row>
                                        <Col xs={6}>
                                            StartingPrice
                                        </Col>
                                        <Col xs={6}>
                                            TimeLeft
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={6}>
                                            {item && convertToEther(item.startingPrice)} ETH
                                        </Col>
                                        <Col xs={6}>
                                            { convertToTime(item.remainingBiddingTime)}
                                        </Col>
                                    </Row>
                                </MDBCardText>
                                {
                                    console.log(item.auctionId)
                                }
                                <Link to={{
                                    pathname: '/activeAuction',
                                    state: {
                                        auctionId: item.auctionId
                                    }
                                }}>
                                <MDBBtn
                                    color="indigo"
                                    >Open</MDBBtn>
                                </Link>
                            </MDBCardBody>
                        </MDBCard>
                            </div>

                })
                }
            </div>

            </React.Fragment>
        )
    }
};
const mapStateToProps = (state) => {
    const {auctions} = state.auction;
    const {auctionType} = state.auctionType;
    const {loggedInUser} = state.authData;
    const {loadingActiveAuctions} = state.ui;
    return {auctionType, auctions, loggedInUser, loadingActiveAuctions};
};


const mapDispatchToProps = (dispatch) => ({
    fetchAllSealedBidAuctions :(username) =>{
        dispatch(fetchAllSealedBidAuctions(username))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(SealedBidAuctions)

