import { MDBCard,  MDBIcon} from "mdbreact";
import {Col, Row} from "react-bootstrap";
import React from "react";
import Fab from "@material-ui/core/Fab";


export const AddCardItem = (props)=>{
    const {title, color, text} = props;
    return(

            <MDBCard className="card-class" style={{backgroundColor: color}}>
                <Fab color={null} aria-label="add" className="add-auction-button" style={{color:color}}
                     onClick={()=>{props.handleClick()}}
                    href="/addAuction"

                >
                    <MDBIcon icon="plus" />
                </Fab>
                <div className="add-action-text">
                    Start your own auction!
                </div>
            </MDBCard>

    )
}