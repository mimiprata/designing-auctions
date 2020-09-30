import React from 'react';
import './AlertContainer.css'
import {GenericAlert} from "./atoms/GenericAlert";
import {convertToEther} from "../../../utils/util";


export const AlertContainer = (props) =>{
    return(
        <React.Fragment>
            <div className="first-info">
                <GenericAlert
                    name={props.startingPriceName}
                    value={`${convertToEther(props.startingPrice)} ETH`}
                />
            </div>
        <div className="second-info">
            <GenericAlert
                name={props.priceName}
                value={`${convertToEther(props.price)} ETH`}
            />
        </div>
        <div className="third-info">
            <GenericAlert
                name = "Number of bids"
                value={props.nrOfBids}
            />
            </div>
            {
                props.timeLeft &&
                <div className="fourth-info">
                    <GenericAlert
                        name="Time Left"
                        value={props.timeLeft}
                    />
                </div>
            }
                {props.hasBid !== 0 &&
                    <div className="fifth-info">
                    <GenericAlert
                    name="My current bid value"
                    value={`${convertToEther(props.hasBid)} ETH`}
                />
                    </div>
                }

        </React.Fragment>

    )}
