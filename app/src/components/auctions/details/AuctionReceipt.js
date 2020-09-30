import {Modal} from "react-bootstrap";
import {MDBBtn} from "mdbreact";
import React from "react";


export const AuctionReceipt  = ({ show, transactionHash, gasUsed, blockNumber,  message, ...props }) => (
    <div className="modal-container" style={{ width: 150 }}>
        <Modal show={show} bsSize={'small'} {...props} onHide={props.onHide}>
            <Modal.Header>
                Success!

            </Modal.Header>

            <Modal.Body>
                Transaction hash : {transactionHash.substring(0,10)}
                <br/>
                Gas used : {gasUsed}
                <br/>
                Block number : {blockNumber}
            </Modal.Body>
            <Modal.Footer>
                <MDBBtn color="success" onClick={()=>{props.onHide()}}
                >{message}</MDBBtn>
            </Modal.Footer>
        </Modal>
    </div>
);

AuctionReceipt.defaultProps = {
    show: false
};
