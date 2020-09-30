import React, {Component, Fragment} from "react";
import {EnglishAuctions} from "./NavItems";
import {DutchAuctions} from "./NavItems";
import {SealedBidAuctions} from "./NavItems";
import {Col, NavDropdown, NavItem, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {setAuctionType} from "../../redux/actions/auctionType";
import {DUTCH, ENGLISH, SEALED_BID} from "../../constans/types";
import './AuctionsNavItem.css'
class AuctionsNavItem extends Component{


    constructor(props, context) {
        super(props, context);
        /*this.state = {
            activeTab: EnglishAuctions
        }*/
        this.state = {
            activeTab: ''
        }
    }

    componentDidMount() {
        switch (this.props.auctionType) {
            case 'DUTCH':
                this.setState({activeTab: DutchAuctions});
                break;
            case 'ENGLISH':
                this.setState({activeTab: EnglishAuctions});
                break;
            case 'SEALED_BID':
                this.setState({activeTab: SealedBidAuctions});
                break;
            default:
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.auctionType !== prevProps.auctionType) {
            switch (this.props.auctionType) {
                case 'DUTCH':
                    this.setState({activeTab: DutchAuctions});
                    break;
                case 'ENGLISH':
                    this.setState({activeTab: EnglishAuctions})
                    break;
                case 'SEALED_BID':
                    this.setState({activeTab: SealedBidAuctions})
                    break;
                default:
            }
        }
    }

    updateType = (e) => {
        console.log(e.currentTarget.innerHTML.includes('Sealed Bid Auctions'));
        if (e.currentTarget.innerHTML.includes('Dutch Auctions')) {
            this.setState({activeTab: DutchAuctions});
            this.props.setAuctionType(DUTCH);

        } else if (e.currentTarget.innerHTML.includes('English Auctions')) {
            this.setState({activeTab: EnglishAuctions});
            this.props.setAuctionType(ENGLISH);
        } else if (e.currentTarget.innerHTML.includes('Sealed Bid Auctions')) {

        this.props.setAuctionType(SEALED_BID);
        this.setState({activeTab: SealedBidAuctions});
    }

    };


    render() {
        return(


                    <NavDropdown  id="dropdown-auctions" title ={
                        <Fragment>


                            {this.state.activeTab.icon}
                            {' '}
                            {this.state.activeTab.name}
                        </Fragment>
                    }>

                        <NavDropdown.Item onClick={(e)=>{this.updateType(e)}}>
                            <Row>
                                <Col xs={1}>
                                    {EnglishAuctions.icon}
                                </Col>
                                <Col xs={4}>

                                    {EnglishAuctions.name}
                                </Col>
                            </Row>
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={(e)=>{this.updateType(e)}}>
                            <Row>
                            <Col xs={1}>
                                {DutchAuctions.icon}
                            </Col>
                                <Col xs={2}>

                                    {DutchAuctions.name}
                                </Col>
                            </Row>

                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={(e)=>{this.updateType(e)}}>
                            <Row>
                                <Col xs={1}>
                                    {SealedBidAuctions.icon}
                                </Col>
                                <Col xs={2}>

                                    {SealedBidAuctions.name}
                                </Col>
                            </Row>
                        </NavDropdown.Item>

                    </NavDropdown>

        )
    }


}

const mapStateToProps = (state) => {
    const { auctionType } = state.auctionType;

    return {auctionType};
};


const mapDispatchToProps = (dispatch) => ({
    setAuctionType : (auctionType) =>{
        dispatch(setAuctionType(auctionType))
    }
});


export default  connect(mapStateToProps,mapDispatchToProps)(AuctionsNavItem);