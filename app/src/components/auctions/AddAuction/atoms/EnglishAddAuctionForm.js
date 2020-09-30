import React from "react";
import {Form, FormControl, InputGroup} from "react-bootstrap";
import './DutchAddAuctionForm.css'
import ReactCustomFlagSelect from "react-custom-flag-select";
import DateTimePicker from "react-datetime-picker";

export const EnglishAddAuctionForm = (props)=>{
    const {name, startingPrice, bidIncrement, startingTime, endingTime, handleInputChange, tokenId, handleChangeToken, list, gasPrice, gas} =props;

    return(
        <Form className="dutch-auction-form">
            <Form.Group controlId="validationCustom01">
                <Form.Label>Token</Form.Label>
               {/* <Form.Control
                    required
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={handleInputChange}
                />*/}
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
                <Form.Label>Bid increment</Form.Label>
                <InputGroup style={{maxHeight: '50px', overflow: 'hidden'}}>
                    <FormControl type="text" name="bidIncrement" onChange={handleInputChange}
                                 value={bidIncrement}
                                 placeholder="Increment value"
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
           {/* <Form.Group controlId="validationCustom04">
                <Form.Label>Starting Time</Form.Label>
                <Form.Control
                    required
                    type="text"
                    name="startingTime"
                    value={startingTime}
                    placeholder="Starting Time"
                    onChange={handleInputChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>*/}
            <Form.Label>Ending Time</Form.Label>
            <Form.Group controlId="validationCustom05">

                <DateTimePicker
                    onChange={props.handleEndingDate}
                    value={endingTime}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

        </Form>
    )
};

export default EnglishAddAuctionForm;