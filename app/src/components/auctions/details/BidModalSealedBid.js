import {Col, Form, FormControl, FormGroup, FormLabel, InputGroup, Modal, Row} from "react-bootstrap";
import React from "react";
import {MDBBtn} from "mdbreact";


export const BidModalSealedBid = (props) => {
    const {show, onHide, value, nonce, gasPrice, gas} = props;
    return (
        <Modal
            show={show}
            onHide={onHide}
        >
            <Modal.Header>
                <Modal.Title>Place your bid</Modal.Title>
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
                                    placeholder="Place your bid"
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
                             {/*   <FormLabel>
                                    Enter a number you will remember!
                                </FormLabel>*/}
                                <FormControl
                                    required
                                    type="text"
                                    placeholder="Enter a secret key you will remember"
                                    value={nonce}
                                    onChange={(e) => {
                                        props.handleChangeNonce(e)
                                    }}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="bid-row">
                        <Col xs={12}>
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

                        </Col>
                    </Row>
                    <Row className="bid-row">
                        <Col xs={12}>

                                <Form.Group>
                                    <Form.Control
                                        required
                                        type="text"
                                        value={gas}
                                        placeHolder="Gas"
                                        onChange={(e)=>{props.handleGas(e)}}
                                    />
                                </Form.Group>
                        </Col>
                    </Row>
                </Form>
                <Row className="bid-row" >
                    <Col xs={4}/>
                    <Col xs={8}>
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