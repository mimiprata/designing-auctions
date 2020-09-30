import React from 'react';
import {MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle} from "mdbreact";
import '../auctions/Auctions.css';
import {connect} from "react-redux";
import {Col, Row} from "react-bootstrap";
import {fetchMyDutchAuctions} from "../../redux/actions/myAuctions";
import '../auctions/Auctions.css';
import {convertToEther, convertToTime} from "../../utils/util";
import {Link} from "react-router-dom";
import {API} from "../../constans";

class MyDutchActiveAuctions extends React.Component {
    constructor(props, context) {
        super(props, context);

    }

    componentDidMount() {
        this.props.loggedInUser &&
        this.props.fetchMyDutchAuctions(this.props.loggedInUser.username);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {
        return (
            <React.Fragment>

            <div className="cards-body">
                {this.props.myActiveAuctions &&
                this.props.myActiveAuctions.map((item) => {
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
                                        <Col xs={6}>
                                            {item.winningBid!=="0" ?
                                                <div>Winning price</div>
                                                :
                                                <div>Current price</div>
                                            }
                                        </Col>
                                        <Col xs={6}>
                                            TimeLeft
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={6}>
                                            {item.winningBid !== "0" ?
                                                <div>  {convertToEther(item.winningBid)} ETH</div>
                                                :
                                                <div>{ convertToEther(item.currentPrice)} ETH</div>
                                            }
                                        </Col>
                                        <Col xs={6}>
                                            { convertToTime(item.remainingTime)}
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
    const {myActiveAuctions} = state.myAuctions;
    const {auctionType} = state.auctionType;
    const {loggedInUser} = state.authData;
    return {auctionType, myActiveAuctions, loggedInUser};
};

const mapDispatchToProps = (dispatch) => ({
    fetchMyDutchAuctions: (username) => {
        dispatch(fetchMyDutchAuctions(username))
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(MyDutchActiveAuctions);

