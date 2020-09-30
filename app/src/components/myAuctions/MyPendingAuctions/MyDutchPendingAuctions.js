import React from 'react';
import {MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle} from "mdbreact";
import '../../auctions/Auctions.css';
import {connect} from "react-redux";
import {Col, Row} from "react-bootstrap";
import { fetchMyPastDutchAuctions} from "../../../redux/actions/myAuctions";
import '../../auctions/Auctions.css';
import {convertToEther, convertToTime} from "../../../utils/util";
import {Link} from "react-router-dom";
import {API} from "../../../constans";

class MyDutchPendingAuctions extends React.Component {
    constructor(props, context) {
        super(props, context);

    }

    componentDidMount() {
        this.props.loggedInUser &&
        this.props.fetchMyPastDutchAuctions(this.props.loggedInUser.username);
    }

    /*componentDidUpdate(prevProps, prevState, snapshot) {
        this.props.loggedInUser !== prevProps.loggedInUser
        this.props.fetchMyPastDutchAuctions(this.props.loggedInUser.username);
    }*/


    render() {
        return (
            <React.Fragment>

            <div className="cards-body">
                {this.props.myPendingAuctions &&
                this.props.myPendingAuctions.map((item) => {
                    console.log(item)
                    return <div className="cards-body-item">
                        <MDBCard className="card-class">
                            <MDBCardImage className="img-fluid"
                                          src={`${API.AVATAR(item.name)}`}
                                          waves/>
                            <MDBCardBody>
                                <MDBCardTitle>{item.name}</MDBCardTitle>
                                <MDBCardText>
                                    <Row>
                                        <Col xs={12}>
                                            {item.winningBid!=="0" ?
                                                <div>Winning price</div>
                                                :
                                                <div>Current price</div>
                                            }
                                        </Col>
                                       {/* <Col xs={6}>
                                            TimeLeft
                                        </Col>*/}
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            {item.winningBid !== "0" ?
                                                <div>  {convertToEther(item.winningBid)} ETH</div>
                                                :
                                                <div>{ convertToEther(item.currentPrice)} ETH</div>
                                            }
                                        </Col>
                                       {/* <Col xs={6}>
                                            { convertToTime(item.remainingTime)}
                                        </Col>*/}
                                    </Row>
                                </MDBCardText>
                                <Link to={{
                                    pathname: '/activeAuction',
                                    state: {
                                        auctionId: item.auctionId
                                    }
                                }}>
                                <MDBBtn
                                    color={null}
                                    style={{backgroundColor: "#2196f3", color: "white"}}
                                    onClick={() => {
                                   // this.props.handleDutchClick(item.contract_address)
                                }}>Open</MDBBtn>
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
    fetchMyPastDutchAuctions: (username) => {
        dispatch(fetchMyPastDutchAuctions(username))
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(MyDutchPendingAuctions);

