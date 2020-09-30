import {TRANSACTION_PARAMETERS} from "../constants/common";

const Web3 = require('web3');

const web3= new Web3(new Web3.providers.HttpProvider("http://localhost:8540"));
const adorableTokenAuction= require('../../ethereum/build/AdorableToken.json');


export class AdorableTokenDao{

    deploy(account, passphrase, callback) {
        console.log(account);
        console.log("[ADORABLE TOKEN DEPLOY] Unlock Account....");
        web3.eth.personal.unlockAccount(account, passphrase, null).then(()=>{

            web3.eth.getBalance(account).then((balance)=>{
                console.log("[ADORABLE TOKEN DEPLOY] available balance: " + balance);
                console.log("[ADORABLE TOKEN DEPLOY] required gas: "+ TRANSACTION_PARAMETERS.GAS * TRANSACTION_PARAMETERS.GAS_PRICE);
                let myContract = new web3.eth.Contract(JSON.parse(adorableTokenAuction.interface));
                myContract.transactionConfirmationBlocks = 1;
                console.log("[ADORABLE TOKEN DEPLOY] ....");
                myContract.deploy({
                    data: '0x' +adorableTokenAuction.bytecode
                    //arguments:[account]
                }).send({
                    from: account,
                    gas: 0,
                    gasPrice: 0
                }).on('error', (error)=>{
                    console.log("[DUTCH AUCTION DEPLOY] ERROR")
                }).then((instance)=>{
                    return callback('', instance.options.address);
                })
            })
        })
    }




}
