import React from 'react';
import './Home.css'
import UserNavBar from "../navbar/UserNavBar";
import {withRouter} from "react-router-dom";
import {Button, Col, Container, Row} from "react-bootstrap";
import {AuctionType} from "./AuctionType";
import {DutchAuctions, EnglishAuctions, SealedBidAuctions} from "../navbar/NavItems";
import {DUTCH_DESCRIPTION, ENGLISH_DESCRIPTION, SEALED_BID_DESCRIPTION} from "../../constans/types";
import {setAuctionType} from "../../redux/actions/auctionType";
import {connect} from "react-redux";
import home from '../images/home.png';
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import {MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBContainer} from "mdbreact";

const toTopBtnHandler = (e) => {
    document.body.scrollTop = 0; // For Chrome, Safari and Opera
    document.documentElement.scrollTop = 0; // For IE and Firefox
};

class Home extends React.Component{

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
       /* window.addEventListener("scroll", function () {
           console.log("axxx");
        }, false);*/
    }

    handleScroll = () =>
    {
        console.log("scrolling");
        if (document.getElementById('toTopBtn')) {
            if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
                document.getElementById('toTopBtn').style.display = 'block';
            } else {
                document.getElementById('toTopBtn').style.display = 'none';
            }
        }
    }




    handleClick = (e) =>{
        console.log(e);
        switch (e.currentTarget.id) {
            case 'DUTCH':
                this.props.setAuctionType('DUTCH');
                break;
            case 'ENGLISH':
                this.props.setAuctionType('ENGLISH');
                break;
            case 'SEALED_BID':
                this.props.setAuctionType('SEALED_BID');
                break;
            default:

        }
    };


    render() {

        return(  <div className="background-home-page" onScroll={ () => console.log('scroll')}>
            <UserNavBar/>
            <Container className="themed-container" fluid="xl" >
                <Row>
                    <Col xs={8}>
                       <Row style={{justifyContent:"center", marginTop:"2rem"}}>
                           <div style={{position:"relative", display:"flex", flexDirection:"column", width:"22rem"}}>
                           <AuctionType
                               color={"info-color"}
                               title = {EnglishAuctions}
                               id = "ENGLISH"
                               text=  {ENGLISH_DESCRIPTION}
                               link ="/auctions"
                               handleClick = {this.handleClick}
                           />
                           </div>
                           <div style={{position:"relative", display:"flex", flexDirection:"column", width:"22rem", marginTop:"1rem", marginLeft:"1rem"}}>
                               <AuctionType
                                   handleClick = {this.handleClick}
                                   color={"blue"}
                                   title = {DutchAuctions}
                                   text={DUTCH_DESCRIPTION}
                                   id={'DUTCH'}
                                   link ="/auctions"
                               />
                           </div>
                           <div style={{position:"relative", display:"flex", flexDirection:"column", width:"24rem", marginTop:"1rem"}}>
                               <AuctionType
                                   color={"indigo"}
                                   id={'SEALED_BID'}
                                   title = {SealedBidAuctions}
                                   text = {SEALED_BID_DESCRIPTION}
                                   link = "/auctions"
                                   handleClick = {this.handleClick}
                               />
                           </div>

                     {/*      <AuctionType
                               color={"info-color"}
                               title = {EnglishAuctions}
                               id = "ENGLISH"
                               text=  {ENGLISH_DESCRIPTION}
                               link ="/auctions"
                               handleClick = {this.handleClick}
                           />
                           <div style={{marginLeft:"80px"}}>
                           <AuctionType
                               handleClick = {this.handleClick}
                               color={"blue"}
                               title = {DutchAuctions}
                               text={DUTCH_DESCRIPTION}
                               id={'DUTCH'}
                               link ="/auctions"
                           />
                           </div>
                       </Row>
                        <Row>
                            <AuctionType
                                color={"indigo"}
                                id={'SEALED_BID'}
                                title = {SealedBidAuctions}
                                text = {SEALED_BID_DESCRIPTION}
                                link = "/auctions"
                                handleClick = {this.handleClick}
                            />*/}
                        </Row>
                    </Col>
                    <Col xs={4}>
                        <br/>
                        <br/>
                        <img  src={home} width={800} height={800}/>
                    </Col>
                </Row>
           {/* <Row>
               <Col //xs={12} md={4}

               >
                   <Element id="english" className="element" >

*/}
                 {/*  <AuctionType
                       ref={this.howItWorks}
                       color={"info-color"}
                       title = {EnglishAuctions}
                       id = "ENGLISH"
                       text=  {ENGLISH_DESCRIPTION}
                       link ="/auctions"
                       handleClick = {this.handleClick}
                   />*/}
                 {/*  </Element>

               </Col>
            </Row>*/}
                {/* <Col// xs ={12} md={3}
                   //md={{offset:1}}
               >
                   <AuctionType
                       handleClick = {this.handleClick}
                       color={"blue"}
                       title = {DutchAuctions}
                       text={DUTCH_DESCRIPTION}
                       id={'DUTCH'}
                       link ="/auctions"
                   />
               </Col>

               <Col// xs = {12} md={3}
                  // md={{offset:1}}
               >
                   <AuctionType
                       color={"indigo"}
                       id={'SEALED_BID'}
                       title = {SealedBidAuctions}
                       text = {SEALED_BID_DESCRIPTION}
                       link = "/auctions"
                       handleClick = {this.handleClick}
                   />
               </Col>
            </Row>*/}
                {/*<Row>
                    <img  src={home}/>
                </Row>*/}
              {/*  <Button
                    onClick={toTopBtnHandler}
                    id="toTopBtn"
                    type="submit"
                    className="btn btn-default">
                    <span className="glyphicon glyphicon-chevron-up"/>
                </Button>*/}
            </Container>
        </div>)
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


export default  connect(mapStateToProps,mapDispatchToProps)(withRouter(Home));