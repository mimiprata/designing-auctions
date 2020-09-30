import React from 'react';
import {Badge, Col, Row} from "react-bootstrap";
import './AuctionItem.css'
import {MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBIcon} from "mdbreact";
import {API} from "../../../../constans";
import {ENDED, ENDED_SEALEDBID} from "../../../../constans/types";
import {Avatar} from "@material-ui/core";
import * as classes from "@material-ui/core/colors";
import {apiIPFS, apiIPFSLOCAL} from "../../../../constans/config";


export const AuctionItemApartment = (props) =>{

    const {name, price,colorBadge, owner, auctionState, description,auctionType, ipfs_has} = props;

    console.log(auctionState === ENDED );
    return(
        <MDBCard color="floralwhite" text="black"  className="auction-item-card" >
            <div className="auction-state">
                {((auctionType!=="SEALED_BID" && auctionState === ENDED) || auctionState === ENDED_SEALEDBID) &&
                <Badge variant="danger">ENDED</Badge>
                }
            </div>

            <MDBCardBody>


                <div className="wrapper">
                    <a href= {`${apiIPFS}ipfs/${ipfs_has}`}><img //className="token-class"
                        className="apartment-class"
                        src={`${apiIPFS}ipfs/${ipfs_has}`}/>
                    </a>
                </div>
                <br/>
                <MDBCardTitle><h1 style={{fontSize:"2em"}}>{/*Token
                    {' '}*/}
                    {name}</h1></MDBCardTitle>

                <MDBCardText>
                    <div><p>
                        {description}
                    </p>
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