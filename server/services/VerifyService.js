import {AccountDao} from '../dao/AccountDao';
import web3 from "../web3";
import {ContractDao} from "../dao/ContractDao";

const accountDao = new AccountDao();
const contractDao = new ContractDao();
import {VerifyDao} from "../dao/VerifyDao";
import {getAllTypesAuction} from "./ContractService";
import Verify from "../../ethereum/build/MerkleProof";
const verifyDao = new VerifyDao();

export const getVerifyInstance = (contract_address) => {
    return new web3.eth.Contract(JSON.parse(Verify.interface), contract_address)
};

export function deploy(username, callback) {
    accountDao.findCredentialsByUsername(username, (err, account) => {
        if (err) {
            return callback(err);
        }
        console.log(account);

        verifyDao.deploy(account.address, account.passphrase,
            (err, contract_address) => {
                if (err) {
                    return callback(err);
                }
                contractDao.addContractWithOwner(contract_address, account.address, "VERIFY");
                return callback(null, contract_address);
            })
    });
}

export function verify(username, proof1, proof2, root, leaf, callback) {
    let x = [];
    x.push(proof1);
    x.push(proof2);
    getAllTypesAuction('VERIFY', (verifyContract => {
        const instance = getVerifyInstance(verifyContract[0].contract_address);
        accountDao.findCredentialsByUsername(username, (err, account) => {
            if (err) {
                return callback(err);
            }
            web3.eth.personal.unlockAccount(account.address, account.passphrase, null).then(() => {
                instance.methods.verify(x,root,leaf).call({from: account.address})
                    .catch((err) => {
                        callback(err);
                    })
                    .then((result) => {
                        console.log(result);
                        callback(null, result);
                    })
            })
        })
    }))
}

export function verifyAuction(username,  leaf, callback) {
   web3.eth.getTransaction(leaf).then(
       result=> {
           console.log(result.blockNumber);
           web3.eth.getBlock(result.blockNumber).then(result1=>{
               console.log(result1.transactions);
               const x = [];
               result1.transactions.map(item=>{
                   x.push(item);
               });
               ////////
               result1.transactions.map(item=>{
                   x.push(item);
               })
               console.log(x);
               getAllTypesAuction('VERIFY', (verifyContract => {
                   const instance = getVerifyInstance(verifyContract[0].contract_address);
                   accountDao.findCredentialsByUsername(username, (err, account) => {
                       if (err) {
                           return callback(err);
                       }
                       web3.eth.personal.unlockAccount(account.address, account.passphrase, null).then(() => {
                           instance.methods.verify(x,result1.transactionsRoot,leaf).call({from: account.address})
                               .catch((err1) => {
                                   callback(err1);
                               })
                               .then((result2) => {
                                   console.log(result2);
                                   callback(null, result2);
                               })
                       })
                   })
               }))
           })
       }
   )

}