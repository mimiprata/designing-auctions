import React from 'react';
import {MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle} from "mdbreact";
import './Auctions.css';
import {Col, Row} from "react-bootstrap";
import {convertToEther, convertToTime} from "../../utils/util";
import {AddCardItem} from './AddCardItem'
import {fetchAllDutchAuctions} from "../../redux/actions/auction";
import {connect} from "react-redux";
import {Loading} from "../Loading";
import {Link} from "react-router-dom";
import {fetchTokenDetails} from "../../redux/actions/token";
import {API} from "../../constans";


class DutchAuctions extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            auctionList:[]
        }

    }


    componentDidMount() {
        if (this.props.loggedInUser) {
            this.props.fetchAllDutchAuctions(this.props.loggedInUser.username);

        }
        //console.log(this.props.auctions);
      /*  let auctionList=[];
        this.props.auctions.map((auction) => {
            console.log(auction);
            this.props.fetchTokenDetails(this.props.loggedInUser.username, auction.assetId);
            let newObject;
            newObject = {
                ...auction,
                ...this.props.tokenDetails
            };
           // console.log(newObject);
            auctionList.push(
                newObject
            )
        });
       this.setState({auctionList: auctionList})*/
    }

   /* componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.auctionType !== prevProps.auctionType
            || this.props.loggedInUser.username !== prevProps.loggedInUser.username){
            //console.log("xxxxxxxxxxxxxxxxxx");
            let auctionList=[];
            this.props.auctions.map((auction) => {
              //  console.log(auction);
                this.props.fetchTokenDetails(this.props.loggedInUser.username, auction.assetId);
                let newObject;
                newObject = {
                    ...auction,
                    ...this.props.tokenDetails
                };

                auctionList.push(
                    newObject
                )
            });
            this.setState({auctionList: auctionList})
        }
    }

    getAuctionList = () =>{
        let auctionList=[];
        this.props.auctions.map((auction) => {
            console.log(auction);
            this.props.fetchTokenDetails(this.props.loggedInUser.username, auction.assetId);
            let newObject;
            newObject = {
                ...auction,
                ...this.props.tokenDetails
            };
            console.log(newObject);
            auctionList.push(
                newObject
            )
        });
        return auctionList;
    };
*/

    render() {
        //console.log(this.state.auctionList);
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
                        title="Start a dutch auction!"
                        color="#2196f3"
                    />
                </div>
                {auctions &&
                auctions.map((item) => {
                    //console.log(item.currentPrice, convertToEther(item.currentPrice));
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
                                            { convertToTime(item.duration)}
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
}
const mapStateToProps = (state) => {
    const {auctions} = state.auction;
    const {auctionType} = state.auctionType;
    const {loggedInUser} = state.authData;
    const {loadingActiveAuctions, loadingTokenDetails} = state.ui;
    const {tokenDetails} = state.token;
    return {auctionType, auctions, loggedInUser, loadingActiveAuctions, tokenDetails, loadingTokenDetails};
};

const mapDispatchToProps = (dispatch) => ({
    fetchAllDutchAuctions: (username) => {
        dispatch(fetchAllDutchAuctions(username))
    },
    fetchTokenDetails : (username, tokenId) =>{
        dispatch(fetchTokenDetails(username, tokenId))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DutchAuctions);


