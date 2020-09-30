import React from 'react';
import { Modal } from 'react-bootstrap';
import './Loading.css';
import loading from './images/Double Ring.gif';

export const Loading = ({ show, customMessage, ...props }) => (
    <div className="modal-container" style={{ width: 100 }}>
        <Modal show={show} bsSize={'small'} {...props}>
            <Modal.Body>
                <div className={'loading-img'}>
                    <img src={loading} width={70} height={70} alt="Loading..." />
                    <h4>Loading...</h4>
                </div>
            </Modal.Body>
            {customMessage && <Modal.Footer>{customMessage}</Modal.Footer>}
        </Modal>
    </div>
);

Loading.defaultProps = {
    show: false,
    customMessage: null
};
