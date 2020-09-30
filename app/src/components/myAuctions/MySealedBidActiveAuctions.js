import React from 'react';
import {MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle} from "mdbreact";
import '../auctions/Auctions.css';
import {connect} from "react-redux";
import {Col, Row} from "react-bootstrap";
import {fetchMySealedBidAuctions} from "../../redux/actions/myAuctions";
import {convertToEther, convertToTime} from "../../utils/util";
import {Link} from "react-router-dom";
import {API} from "../../constans";
class MySealedBidActiveAuctions extends React.Component {
    constructor(props, context) {
        super(props, context);

    }

    componentDidMount() {
        this.props.loggedInUser &&
        this.props.fetchMySealedBidAuctions(this.props.loggedInUser.username);
    }


    render() {
        return (
            <React.Fragment>
                <div className="cards-body">
                    {this.props.myActiveAuctions &&
                    this.props.myActiveAuctions.map((item) => {
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
    const {myActiveAuctions} = state.myAuctions;
    const {auctionType} = state.auctionType;
    const {loggedInUser} = state.authData;
    return {auctionType, myActiveAuctions, loggedInUser};
};

const mapDispatchToProps = (dispatch) => ({
    fetchMySealedBidAuctions: (username) => {
        dispatch(fetchMySealedBidAuctions(username))
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(MySealedBidActiveAuctions);

