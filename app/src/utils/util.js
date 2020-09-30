import moment from "moment";

var Web3 = require('web3');

export const convertToEther = (value) =>{
    if(value)
    return Web3.utils.fromWei(value.toString(), 'ether');
};

export const convertToWei = (value)=>{
    if(value)
        return Web3.utils.toWei(value,'ether');
};

export const convertToWeiFromGwei = (value)=>{
    if(value)
        return Web3.utils.toWei(value,'gwei');
};

export const convertToGweiFromWei = (value)=>{
    if(value)
        return Web3.utils.fromWei(value,'gwei');
};
export const convertToTime = (value)=>{
    if(value)
        return moment().startOf('year')
            .seconds(value*15 )
            .format('DDD:HH:mm ');
      /* return moment().endOf('day')
           .seconds(value*15)
           .fromNow(true)*/
};

//HH:mm

export const getOneWeekFromNow= ()=>{
    return new Date(moment().add(7,'days') );
}

export const getOneWeekFromNowPlus2Days= ()=>{
    return new Date(moment().add(9,'days') );
}