import {Modal, Row} from "react-bootstrap";
import React from "react";
import {MDBBtn, MDBIcon} from "mdbreact";


export const Receipt  = ({ show, transactionHash, gasUsed, blockNumber, href, message, ...props }) => (
    <div className="modal-container" style={{ width: 150 }}>
        <Modal show={show} bsSize={'small'} {...props}>
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
               <MDBBtn color="success" href={href}
               >{message}</MDBBtn>
           </Modal.Footer>
        </Modal>
    </div>
);

Receipt.defaultProps = {
    show: false
};
