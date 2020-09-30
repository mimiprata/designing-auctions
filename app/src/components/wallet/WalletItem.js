import React from "react";
import {MDBCard, MDBCardBody, MDBCardImage, MDBIcon} from "mdbreact";
import {Badge, Button, ButtonGroup, Col, Row} from "react-bootstrap";
import {API} from "../../constans";
import './WalletItem.css';
import {AuctionType} from "../home/AuctionType";
import DutchAuctionModal from "../auctions/AddAuction/atoms/DutchAuctionModal";
import EnglishAuctionModal from "../auctions/AddAuction/atoms/EnglishAuctionModal";
import SealedBidAuctionModal from "../auctions/AddAuction/atoms/SealedBidAuctionModal";
import {apiIPFS} from "../../constans/config";

class WalletItem extends React.Component{

    constructor(props, context) {
        super(props, context);
        this.state={
            showOptions:false,
        }
    }

    showOptions = () =>{
        this.setState({showOptions:true})
    };

  /*  handleEnglishClick = () =>{
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
*/
    render(){
        const {name, description, available} = this.props;
        return(<React.Fragment><MDBCard color="white"className="wallet-item">
                <MDBCardBody>
                    <Row>
                        <Col xs={6}>

                            <div //className="wrapper"
                            >
                                {name === "Timi" ?
                                    <img className="token-image" src={`${apiIPFS}ipfs/Qmabo15NxwPMRVGXZs8sBa9w181FdfRVFX78htYhddgQGG`}/> :
                                    <img className="token-class" src={`${API.AVATAR(name)}`}/>
                                      }
                            </div>

                        </Col>
                        <Col xs={6}>
                            <h2>{name === "Timi" ?
                                "Apartment Cluj-Napoca" :
                                name}
                            </h2>
                            <br/>
                            <h5>
                                {name === "Timi" ? "Apartament cu 2 camere, situat in Floresti..." :description}
                            </h5>
                        </Col>
                    </Row>
                    <Row classname="row-sell-with-us">
                        <Col xs={6}/>
                        <Col xs={6}>
                            { available ?
                                this.state.showOptions?
                                    <ButtonGroup aria-label="Basic example" className="button-group-sell-with-us" size="sm">
                                        <Button variant={null}  className="english-button" onClick={()=>{this.props.handleEnglishClick(name)}}>English</Button>
                                        <Button  variant={null} className="dutch-button" onClick={()=>{this.props.handleDutchClick(name)}}>Dutch</Button>
                                        <Button   variant={null} className="sealed-bid-button" onClick={()=>{this.props.handleSealedBidClick(name)}}>SealedBid</Button>
                                    </ButtonGroup>:
                                <Button
                                    className={"button-sell-with-us"}
                                    onClick={this.showOptions}
                                >Sell with us</Button>

                                :
                                <Badge variant="warning"> In auction </Badge>
                            }
                                </Col>
                                </Row>

                                </MDBCardBody>
                                </MDBCard>

            </React.Fragment>
        )
    }
}

export default WalletItem;
/*

export const WalletItem = (props) =>{
    const {name, description, available, showOptionsState} = props;
    return  <MDBCard color="white"className="wallet-item">
        <MDBCardBody>
            <Row>
            <Col xs={6}>

                <div //className="wrapper"
                >
                    <img className="token-class" src={`${API.AVATAR(name)}`}/>
                </div>

            </Col>
            <Col xs={6}>
                <h2>{name}
                </h2>
                <br/>
                <h4>
                    {description}
                </h4>
            </Col>
            </Row>
            <Row>
                <Col xs={6}/>
                <Col xs={6}>
                    { available ?
                        showOptionsState?
                                    <ButtonGroup aria-label="Basic example" className="button-group-sell-with-us" size="sm">
                                        <Button  color={"info-color"} onClick={props.handleEnglishClick}>English</Button>
                                        <Button  color={"blue"} onClick={()=>{props.handleDutchClick(name)}}>Dutch</Button>
                                        <Button  color="indigo" onClick={props.handleSealedBidClick}>SealedBid</Button>
                                    </ButtonGroup>:
                                    <Button
                                        className={"button-sell-with-us"}
                                        onClick={props.showOptions}
                                    >Sell with us</Button>


                        :
                        <Badge variant="warning"> In auction </Badge>
                    }
                </Col>
            </Row>

        </MDBCardBody>
    </MDBCard>
}
*/
