import React from 'react';
import {Badge, Col, Row} from "react-bootstrap";
import './AuctionItem.css'
import { MDBCard, MDBCardBody,  MDBCardText, MDBCardTitle, MDBIcon} from "mdbreact";
import {API} from "../../../../constans";
import {CANCELED, CANCELED_SEALEDBID, ENDED, ENDED_SEALEDBID} from "../../../../constans/types";
import {Avatar} from "@material-ui/core";
import * as classes from "@material-ui/core/colors";


export const AuctionItem = (props) =>{

    const {name, price,colorBadge, owner, auctionState, description,auctionType} = props;

    console.log(auctionState === ENDED );
    return(
        <MDBCard color="floralwhite" text="black"  className="auction-item-card" >
            <div className="auction-state">
                {((auctionType!=="SEALED_BID" && auctionState === ENDED || auctionType!=="SEALED_BID" && auctionState === CANCELED) || (auctionState === ENDED_SEALEDBID ||auctionState ===  CANCELED_SEALEDBID)) &&
                <Badge variant="danger">ENDED</Badge>
                }
            </div>

            <MDBCardBody>


                <div className="wrapper">
                   <img className="token-class" src={`${API.AVATAR(name)}`}/>
                </div>
                <br/>
                <MDBCardTitle><h1 style={{fontSize:"2em"}}>Token
                    {' '}
                    {name}</h1></MDBCardTitle>

                <MDBCardText>
                    <div><h4>
                        {description}
                    </h4>
                    </div>
                    <div className="owner-card">
                        <Col xs={6}>
                            <div className="owner-card-user">{owner &&owner.username}
                            </div>

                        <div className="owner-card-title">
                        Owner
                        </div>
                        </Col>
                        <Col xs={6} className="owner-card-avatar">
                            <Avatar  className="green">{owner && owner.username.substring(0,1).toUpperCase()}</Avatar>
                           {/* <img className="avatar-class" src={`${API.AVATAR(owner)}`}/>*/}
                        </Col>

                    </div>
                </MDBCardText>

            </MDBCardBody>
        </MDBCard>
    )
}