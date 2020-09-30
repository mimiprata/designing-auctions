import {MDBIcon} from "mdbreact";
import {Button} from "react-bootstrap";
import React from "react";


export const ItemBidHistory = (props)=>{
    const {item,clicked} = props;
    return(
        <div className="history-bids-item">

            <MDBIcon icon="gavel"/> {' '}
            {item.returnValues._creator.toString().substring(0, 9)} :
            {item.returnValues.hash.toString().substring(0, 30)}
            {clicked ?
                <MDBIcon icon="fa-check-circle-o "/>
                :
                <Button color={null} className={'verify-button'} onClick={() => {
                    props.verifyOfferByHash( item.transactionHash)
                }}
                >Verify </Button>
            }

        </div>
    )
}