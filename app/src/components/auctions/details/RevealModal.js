import {Col, Form, FormControl, FormGroup, FormLabel, InputGroup, Modal, Row} from "react-bootstrap";
import React from "react";
import {MDBBtn} from "mdbreact";


export const RevealModal = (props) => {
    const {show, onHide, value, nonce} = props;
    return (
        <Modal
            show={show}
            onHide={onHide}
        >
            <Modal.Header>
                <Modal.Title>Reveal your bid</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="bid-value">
                    <Row className="bid-row">
                        <Col xs={12}>

                            {/* <Form.Group>
                                <Form.Control
                                    required
                                    type="text"
                                    value={value}
                                    placeHolder="Place your bid"
                                    onChange={(e)=>{props.handleChange(e)}}
                                />

                            </Form.Group>*/}
                            <InputGroup className="mb-3">
                                <FormControl
                                    required
                                    type="text"
                                    value={value}
                                    placeholder="Your bid value"
                                    onChange={(e) => {
                                        props.handleChange(e)
                                    }}
                                    aria-describedby="basic-addon2"
                                />
                                <InputGroup.Append>
                                    <InputGroup.Text id="basic-addon2">ETH</InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>

                        </Col>
                    </Row>
                    <Row  className="bid-row">
                        <Col xs={12}>
                            <FormGroup>
                                <FormLabel>
                                   Enter the secret key
                                </FormLabel>
                                <FormControl
                                    required
                                    type="text"
                                    value={nonce}
                                    onChange={(e) => {
                                        props.handleChangeNonce(e)
                                    }}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
                <Row className="bid-row" >
                    <Col xs={3}/>
                    <Col xs={9}>
                        <MDBBtn

                            color="orange"
                            onClick={props.revealSealedBid}
                        >
                            Reveal now!
                        </MDBBtn>
                    </Col>
                </Row>

            </Modal.Body>
        </Modal>
    )
}