import React from "react";
import {Form, FormControl, InputGroup} from "react-bootstrap";
import './DutchAddAuctionForm.css'
import ReactCustomFlagSelect from "react-custom-flag-select";
import DateTimePicker from "react-datetime-picker";

export const SealedBidAddAuctionForm = (props)=>{
    const {name, startingPrice, startingTime, revealTime, endingTime, handleInputChange, handleChangeToken, tokenId, list, gasPrice, gas} =props;
    console.log(list);
    return(
        <Form className="dutch-auction-form">
            <Form.Group controlId="validationCustom01">
                <Form.Label>Token</Form.Label>
                {/*<Form.Control
                    required
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={handleInputChange}
                />*/}
                {
                    (list.length>0) &&
                    <ReactCustomFlagSelect
                        value={tokenId}
                        name={"name"}
                        optionList={list}
                        onChange={handleChangeToken}
                        customStyleContainer={{border: 'none'}}
                        customStyleOptionListContainer={{
                            objectFit: 'cover',
                            maxHeight: '200px',
                            overflow: 'auto',
                            marginTop: '5%',
                            left: '50%',
                            zIndex: '999'
                        }}
                    />
                }
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationCustom02">
                <Form.Label>Start Price</Form.Label>
                <InputGroup style={{maxHeight: '50px', overflow: 'hidden'}}>
                    <FormControl type="text" name="startingPrice" onChange={handleInputChange}
                                 value={startingPrice}
                                 placeholder="Start price"
                                 style={{overflow: 'hidden'}}/>
                    <InputGroup.Append>
                        <InputGroup.Text id="basic-addon2">ETH</InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationCustom02">
                <Form.Label>Gas Price</Form.Label>
                <InputGroup style={{maxHeight: '50px', overflow: 'hidden'}}>
                    <FormControl type="text" name="gasPrice" onChange={handleInputChange}
                                 value={gasPrice}
                                 placeholder="Gas price"
                                 style={{overflow: 'hidden'}}/>
                    <InputGroup.Append>
                        <InputGroup.Text id="basic-addon2">GWEI</InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationCustom02">
                <Form.Label>Gas</Form.Label>
                <InputGroup style={{maxHeight: '50px', overflow: 'hidden'}}>
                    <FormControl type="text" name="gas" onChange={handleInputChange}
                                 value={gas}
                                 placeholder="Gas"
                                 style={{overflow: 'hidden'}}/>
                </InputGroup>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationCustom05">
                <Form.Label>End Bidding Time</Form.Label>
            <br/>
            <DateTimePicker
                onChange={props.handleEndingDate}
                value={endingTime}
            />
            </Form.Group>

            <Form.Group controlId="validationCustom05">
                <Form.Label>End Revealing Time</Form.Label>
            <br/>
            <DateTimePicker
                onChange={props.handleRevealDate}
                value={revealTime}
            />
            </Form.Group>
        </Form>
    )
};

export default SealedBidAddAuctionForm;