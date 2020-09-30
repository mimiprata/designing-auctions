import React from 'react';
import {MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle} from "mdbreact";
import './Auctions.css';
import {Col, Row} from "react-bootstrap";
import {convertToEther, convertToTime} from "../../utils/util";
import {AddCardItem} from './AddCardItem'
import {fetchAllEnglishAuctions} from "../../redux/actions/auction";
import {connect} from "react-redux";
import {Loading} from "../Loading";
import {Link} from "react-router-dom";
import {API} from "../../constans";
import {apiIPFS, apiIPFSLOCAL} from "../../constans/config";

class EnglishAuctions extends React.Component {


    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        this.props.loggedInUser &&
        this.props.fetchAllEnglishAuctions( this.props.loggedInUser.username);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.loggedInUser!== prevProps.loggedInUser ||
        this.props.auctions.length !== prevProps.auctions.length) {
            this.props.fetchAllEnglishAuctions( this.props.loggedInUser.username);
        }
    }

    render() {
        const auctions = this.props.auctions;
        console.log(this.props.auctions);
        return (
            <React.Fragment>
                <Loading
                    show={this.props.loadingActiveAuctions}
                    customMessage={'Loading'}
                />
                <div className="cards-body">
                    <div className="cards-body-item">
                    <AddCardItem
                        title="Start an english auction!"
                        color="#33b5e5"
                        //handleClick={this.handleEnglishClick}
                    />
                </div>
                {auctions &&
                auctions.map((item) => {
                    console.log(item);
                    return(<div className="cards-body-item">
                        <MDBCard className="card-class">
                            <MDBCardImage className="img-fluid"
                                          //src={`${API.AVATAR(item.name)}`}
                                src={`${apiIPFS}ipfs/${item.ipfs_has}`}
                                          waves/>
                            <MDBCardBody>
                                <MDBCardTitle> {
                                    item.name
                                }</MDBCardTitle>
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
                                {
                                    console.log(item.auctionId)
                                }
                                <Link to={{
                                    pathname: '/activeAuction',
                                    state: {auctionId: item.auctionId}
                                }}>
                                <MDBBtn
                                    color={null}
                                    style={{backgroundColor: "#33b5e5", color: "white"}}
                                >Open</MDBBtn>
                                </Link>
                            </MDBCardBody>
                        </MDBCard>
                    </div>)
                    }
                )
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
    fetchAllEnglishAuctions: (username) => {
        dispatch(fetchAllEnglishAuctions(username))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(EnglishAuctions);


