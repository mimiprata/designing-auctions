import React, {Fragment} from 'react';
import { MDBCard, MDBCardBody, MDBCardHeader, MDBIcon} from "mdbreact";
import './AuctionType.css'

export const AuctionType = (props) => {
    const {color, title, text, link, id} = props;
    return (
        <MDBCard color={color} text="white" className="type-of-auction">
            <MDBCardHeader style={{height:"90px"}}>
                <div className="type-of-auction-icon">
                    {title.icon}
                </div>
                <div>
                    {title.name}
                </div>
            </MDBCardHeader>
            <MDBCardBody>
                <div className="type-of-auction-text">
                    {text}
                </div>
                <a href={link}
                   id={id}
                   className='type-of-auction-button'
                   onClick={(e) => {
                       props.handleClick(e)
                   }}
                >
                    <h5 className='white-text'>
                        Explore
                        <MDBIcon icon='angle-double-right' className='ml-2'/>
                    </h5>
                </a>
            </MDBCardBody>
        </MDBCard>
    );
}