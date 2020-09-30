import React from "react";
import {GenericAlert} from "./atoms/GenericAlert";
import './AlertContainerSealedBid.css'
import {convertToEther} from "../../../utils/util";
import {STARTED_SEALEDBID} from "../../../constans/types";

export const AlertContainerSealedBid = (props) =>{
    return(
        <React.Fragment>
            <div className="sealed-bid-first-info">
                <GenericAlert
                    name={props.priceName}
                    value={`${convertToEther(props.price)} ETH`}
                />
            </div>
            {
                props.endOfBidding &&
                <div className="sealed-bid-second-info">
                    <GenericAlert
                        name="Time Left"
                        value={`${props.endOfBidding} days`}
                    />
                </div>
            }
            {props.hasBid !== 0 && props.actionState===STARTED_SEALEDBID &&
            <div className="sealed-bid-third-info">
                <GenericAlert
                    name="My current bid value"
                    value={`${convertToEther(props.hasBid)} ETH`}
                />
            </div>
            }

        </React.Fragment>

    )}
