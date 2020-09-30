import React from "react";
import {Form, FormControl, InputGroup} from "react-bootstrap";
import './DutchAddAuctionForm.css'
import DateTimePicker from "react-datetime-picker";

import ReactCustomFlagSelect from 'react-custom-flag-select';
import "react-custom-flag-select/lib/react-custom-flag-select.min.css";
export const DutchAddAuctionForm = (props)=>{
    console.log(props.tokenId);
    const {name, startingPrice, endingPrice, offerDecrement, startingTime, gas,
        endingTime, handleInputChange, list, handleChangeToken, tokenId, gasPrice} =props;
    return(
            <Form className="dutch-auction-form">
            <Form.Group controlId="validationCustom01">
                <Form.Label>Name</Form.Label>
                {
                    tokenId &&
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
                <Form.Group controlId="validationCustom03">
                <Form.Label>Ending Price</Form.Label>
                    <InputGroup style={{maxHeight: '50px', overflow: 'hidden'}}>
                        <FormControl type="text" name="endingPrice" onChange={handleInputChange}
                                     value={endingPrice}
                                     placeholder="End price"
                                     style={{overflow: 'hidden'}}/>
                        <InputGroup.Append>
                            <InputGroup.Text id="basic-addon2">ETH</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

                <Form.Group controlId="validationCustom05">
                    <Form.Label>Decrement value</Form.Label>
                    <InputGroup style={{maxHeight: '50px', overflow: 'hidden'}}>
                        <FormControl type="text" name="offerDecrement" onChange={handleInputChange}
                                     value={offerDecrement}
                                     placeholder="Decrement value"
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
                    <Form.Label>End Time</Form.Label>
               <br/>
                <DateTimePicker
                onChange={props.handleEndingDate}
                value={endingTime}
                /> </Form.Group>

            </Form>
    )
};

export default DutchAddAuctionForm;