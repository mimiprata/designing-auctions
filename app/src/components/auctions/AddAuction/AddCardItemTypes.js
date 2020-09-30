import {Col} from "react-bootstrap";
import {MDBCard, MDBIcon} from "mdbreact";
import Fab from "@material-ui/core/Fab";
import React from "react";
import './AddAuctionHome.css'


export const AddCardItemTypes = (props)=> {
    const {title, color, text,icon} = props;
    return (
        <Col xs={4} className="cards-body-item-add">
            <MDBCard className="card-class-add" style={{backgroundColor: color}}>
                <Fab color={null} aria-label="add" className="add-auction-button" style={{color: color}}
                     onClick={() => {

                         props.handleClick()
                     }}>
                    {icon}
                </Fab>
                <div className="add-action-text">
                    {title}
                </div>
            </MDBCard>
        </Col>
    )
}