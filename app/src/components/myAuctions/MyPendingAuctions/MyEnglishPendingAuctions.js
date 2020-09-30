import React from 'react';
import {MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle} from "mdbreact";
import '../../auctions/Auctions.css';
import {connect} from "react-redux";
import {Col, Row} from "react-bootstrap";
import {fetchMyPendingEnglishAuctions} from "../../../redux/actions/myAuctions";
import {convertToEther, convertToTime} from "../../../utils/util";
import {Link} from "react-router-dom";
import {API} from "../../../constans";
import {apiIPFS, apiIPFSLOCAL} from "../../../constans/config";


class MyEnglishPendingAuctions extends React.Component {
    constructor(props, context) {
        super(props, context);

    }

    componentDidMount() {
        this.props.loggedInUser &&
        this.props.fetchMyPendingEnglishAuctions(this.props.loggedInUser.username);
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.loggedInUser !== prevProps.loggedInUser){
            this.props.fetchMyPendingEnglishAuctions(this.props.loggedInUser.username);
        }
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
                                              //src={`${API.AVATAR(item.name)}`}
                                              src={`${apiIPFS}ipfs/${item.ipfs_has}`}
                                              waves/>
                                <MDBCardBody>
                                    <MDBCardTitle>{item.name}</MDBCardTitle>
                                    <MDBCardText>
                                        <Row>
                                            <Col xs={6}>
                                                {item.highestBid!=="0" ?
                                                    <div>Current bid</div>
                                                    :
                                                    <div>Starting price</div>
                                                }
                                            </Col>
                                            <Col xs={6}>
                                                TimeLeft
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={6}>
                                                {item.highestBid !== "0" ?
                                                    <div>  {convertToEther(item.highestBid)} ETH</div>
                                                    :
                                                    <div>{ convertToEther(item.startingPrice)} ETH</div>
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
                                        style={{backgroundColor: "#33b5e5", color: "white"}}
                                        onClick={() => {
                                            //  props.handleEnglishClick(item.contract_address)
                                        }}
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

const mapDispatchToProps = (dispatch) => {
    return ({
        fetchMyPendingEnglishAuctions: (username) => {
            dispatch(fetchMyPendingEnglishAuctions(username))
        }
    });
};

export default connect(mapStateToProps,mapDispatchToProps)(MyEnglishPendingAuctions);

