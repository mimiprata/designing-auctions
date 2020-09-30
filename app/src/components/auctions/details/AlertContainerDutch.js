import React from 'react';
import './AlertContainerDutch.css'
import {GenericAlert} from "./atoms/GenericAlert";
import {convertToEther} from "../../../utils/util";


export const AlertContainerDutch = (props) =>{
    return(
        <React.Fragment>
            <div className="first-info-dutch">
                <GenericAlert
                    name={props.priceName}
                    value={`${convertToEther(props.price)} ETH`}
                />
            </div>
            <div className="second-info-dutch">
                <GenericAlert
                    name = "Stated at "
                    value={`${convertToEther(props.startedAt)} ETH`}
                />
            </div>
            {
                props.timeLeft &&
                <div className="third-info-dutch">
                    <GenericAlert
                        name="Time Left "
                        value={props.timeLeft}
                    />
                </div>
            }
        </React.Fragment>
    )
}