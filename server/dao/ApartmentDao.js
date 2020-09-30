import {TRANSACTION_PARAMETERS} from "../constants/common";

const Web3 = require('web3');

const web3= new Web3(new Web3.providers.HttpProvider("http://localhost:8540"));
const apartment= require('../../ethereum/build/Apartment.json');


export class ApartmentDao{

    deploy(account, passphrase, callback) {
        console.log(account);
        console.log("[APARTMENT DEPLOY] Unlock Account....");
        web3.eth.personal.unlockAccount(account, passphrase, null).then(()=>{

            web3.eth.getBalance(account).then((balance)=>{
                console.log("[APARTMENT TOKEN DEPLOY] available balance: " + balance);
                console.log("[APARTMENT TOKEN DEPLOY] required gas: "+ TRANSACTION_PARAMETERS.GAS * TRANSACTION_PARAMETERS.GAS_PRICE);
                let myContract = new web3.eth.Contract(JSON.parse(apartment.interface));
                myContract.transactionConfirmationBlocks = 1;
                console.log("[APARTMENT TOKEN DEPLOY] ....");
                myContract.deploy({
                    data: '0x' +apartment.bytecode
                    //arguments:[account]
                }).send({
                    from: account,
                    gas: 0,
                    gasPrice: 0
                }).on('error', (error)=>{
                    console.log("[APARTMENT DEPLOY] ERROR")
                }).then((instance)=>{
                    return callback('', instance.options.address);
                })
            })
        })
    }





}
