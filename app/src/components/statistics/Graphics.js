import * as React from "react";
import {Line} from "react-chartjs-2";


export const Graphics = (props)=>{
    return(<Line data={props.data} />)
}
