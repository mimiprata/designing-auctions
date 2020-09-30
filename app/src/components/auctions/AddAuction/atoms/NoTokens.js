import {Modal, Row} from "react-bootstrap";
import React from "react";
import {MDBBtn, MDBIcon} from "mdbreact";


export const NoTokens  = ({ show,  href, message, ...props }) => (
    <div className="modal-container" style={{ width: 150 }}>
        <Modal show={show} bsSize={'small'} {...props}>
            {/*<Modal.Header>Oops!

            </Modal.Header>
*/}
            <Modal.Body>
                We're sorry. You don't have any tokens to sell!
            </Modal.Body>
            <Modal.Footer>
                <MDBBtn color="primary" href={href}
                >{message}</MDBBtn>
            </Modal.Footer>
        </Modal>
    </div>
);

NoTokens.defaultProps = {
    show: false
};
