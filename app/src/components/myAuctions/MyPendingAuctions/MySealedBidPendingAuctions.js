import React from 'react';
import {MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle} from "mdbreact";
import '../../auctions/Auctions.css';
import {connect} from "react-redux";
import {Col, Row} from "react-bootstrap";
import {convertToEther, convertToTime} from "../../../utils/util";
import {Link} from "react-router-dom";
import {API} from "../../../constans";
import {fetchMyPendingSealedBidAuctions} from "../../../redux/actions/myAuctions";

class MySealedBidPendingAuctions extends React.Component {
    constructor(props, context) {
        super(props, context);

    }

    componentDidMount() {
        this.props.loggedInUser &&
        this.props.fetchMyPendingSealedBidAuctions(this.props.loggedInUser.username);
    }


    render() {
        return (
            <React.Fragment>
                <div className="cards-body">
                    {this.props.myPendingAuctions &&
                    this.props.myPendingAuctions.map((item) => {
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
                                    <Link to={{
                                        pathname: '/activeAuction',
                                        state: {
                                            auctionId: item.auctionId
                                        }
                                    }}>
                                    <MDBBtn
                                        color="indigo"
                                        //onClick={()=>{props.handleSealedBidClick(item.contract_address)}}
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
    const {myPendingAuctions} = state.myAuctions;
    const {auctionType} = state.auctionType;
    const {loggedInUser} = state.authData;
    return {auctionType, myPendingAuctions, loggedInUser};
};

const mapDispatchToProps = (dispatch) => ({
    fetchMyPendingSealedBidAuctions: (username) => {
        dispatch(fetchMyPendingSealedBidAuctions(username))
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(MySealedBidPendingAuctions);

