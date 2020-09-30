import {TRANSACTION_PARAMETERS} from "../constants/common";

const Web3 = require('web3');

const web3= new Web3(new Web3.providers.HttpProvider("http://localhost:8540"));
const englishAuctionEngine= require('../../ethereum/build/EnglishAuctionEngine.json');


export class EnglishAuctionEngineDao{

    deploy(account, passphrase, callback) {
        console.log(account);
        console.log("[ENGLISH AUCTION ENGINE DEPLOY] Unlock Accout....");
        web3.eth.personal.unlockAccount(account, passphrase, null).then(()=>{

            web3.eth.getBalance(account).then((balance)=>{
                console.log("[ENGLISH AUCTION ENGINE DEPLOY] available balance: " + balance);
                console.log("[ENGLISH AUCTION ENGINE DEPLOY] required gas: "+ TRANSACTION_PARAMETERS.GAS * TRANSACTION_PARAMETERS.GAS_PRICE);
                let myContract = new web3.eth.Contract(JSON.parse(englishAuctionEngine.interface));
                myContract.transactionConfirmationBlocks = 1;
                console.log("[ENGLISH AUCTION ENGINE DEPLOY] ....");
                myContract.deploy({
                    data: '0x' +englishAuctionEngine.bytecode
                    //arguments:[account]
                }).send({
                    from: account,
                    gas: 0,
                    gasPrice: 0
                }).on('error', (error)=>{
                    console.log("[ENGLISH AUCTION ENGINE DEPLOY] ERROR")
                }).then((instance)=>{
                    return callback('', instance.options.address);
                })
            })
        })
    }





}
