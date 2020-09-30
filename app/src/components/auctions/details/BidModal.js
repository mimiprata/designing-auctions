import {Col, Form, InputGroup, Modal, Row} from "react-bootstrap";
import React from "react";
import {MDBBtn} from "mdbreact";


export const BidModal = (props) =>{
    const {show, onHide, value, gas, gasPrice} = props;
    return(
        <Modal
            show={show}
            onHide={onHide}
        >
            <Modal.Header>
                <Modal.Title >Place your bid</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Row className="bid-row">
                    <Col xs={12}>
                        <Form className="bid-value">
                            <Form.Group>
                                <InputGroup style={{maxHeight: '50px', overflow: 'hidden'}}>
                                <Form.Control
                                    required
                                    type="text"
                                    value={value}
                                    placeHolder="Place your bid"
                                    onChange={(e)=>{props.handleChange(e)}}
                                />
                                <InputGroup.Append>
                                    <InputGroup.Text id="basic-addon2">ETH</InputGroup.Text>
                                </InputGroup.Append>
                                </InputGroup>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col xs={12}>
                        <Form className="bid-value">
                            <Form.Group>
                                <InputGroup style={{maxHeight: '50px', overflow: 'hidden'}}>
                                <Form.Control
                                    required
                                    type="text"
                                    value={gasPrice}
                                    placeHolder="Gas Price"
                                    onChange={(e)=>{props.handleGasPrice(e)}}
                                />
                                <InputGroup.Append>
                                    <InputGroup.Text id="basic-addon2">GWEI</InputGroup.Text>
                                </InputGroup.Append>
                                </InputGroup>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col xs={12}>
                        <Form className="bid-value">

                            <Form.Group>
                                <Form.Control
                                    required
                                    type="text"
                                    value={gas}
                                    placeHolder="Gas"
                                    onChange={(e)=>{props.handleGas(e)}}
                                />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col xs={12}>
                        <MDBBtn

                            color="orange"
                            onClick={props.handleBidClick}
                        >
                            Bid now!
                        </MDBBtn>
                    </Col>
                </Row>

            </Modal.Body>
        </Modal>
    )
}