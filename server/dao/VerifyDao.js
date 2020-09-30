import {TRANSACTION_PARAMETERS} from "../constants/common";

const Web3 = require('web3');

const web3= new Web3(new Web3.providers.HttpProvider("http://localhost:8540"));
const verify= require('../../ethereum/build/MerkleProof.json');

export class VerifyDao{

    deploy(account, passphrase, callback) {
        console.log(account);
        console.log("[VERIFY DEPLOY] Unlock Accout....");
        web3.eth.personal.unlockAccount(account, passphrase, null).then(()=>{

            web3.eth.getBalance(account).then((balance)=>{
                console.log("[VERIFY DEPLOY] available balance: " + balance);
                console.log("[VERIFY DEPLOY] required gas: "+ TRANSACTION_PARAMETERS.GAS * TRANSACTION_PARAMETERS.GAS_PRICE);
                let myContract = new web3.eth.Contract(JSON.parse(verify.interface));
                myContract.transactionConfirmationBlocks = 1;
                console.log("[VERIFY DEPLOY] ....");
                myContract.deploy({
                    data: '0x' +verify.bytecode
                    //arguments:[account]
                }).send({
                    from: account,
                    gas: 0,
                    gasPrice: 0
                }).on('error', (error)=>{
                    console.log("[VERIFY DEPLOY] ERROR")
                }).then((instance)=>{
                    return callback('', instance.options.address);
                })
            })
        })
    }





}
