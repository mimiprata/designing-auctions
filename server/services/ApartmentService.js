import {AccountDao} from "../dao/AccountDao";
import {ContractDao} from "../dao/ContractDao";
import {ApartmentDao} from "../dao/ApartmentDao";
import web3 from "../web3";
import {getAllTypesAuction} from "./ContractService";
import {TRANSACTION_PARAMETERS} from "../constants/common";
import Apartment from "../../ethereum/build/Apartment";
const accountDao = new AccountDao();
const contractDao = new ContractDao();
const apartmentDao = new ApartmentDao();

const GAS = 0;
const GAS_PRICE = 0;
export const convertToTokenDetails = (tokenId,obj, available) =>{
    const details = {
        tokenId:tokenId,
        name: obj.name,
        description: obj.description,
        available:available,
        ipfs_has:obj.ipfs_hash
    };
    return details;
};

export const  getToken = (contract_address) => {
    return new web3.eth.Contract(JSON.parse(Apartment.interface), contract_address)
};

export function deploy(username, callback) {
    accountDao.findCredentialsByUsername(username, (err, account) => {
        if (err) {
            return callback(err);
        }
        console.log(account);

        apartmentDao.deploy(account.address, account.passphrase,
            (err, contract_address) => {
                if (err) {
                    return callback(err);
                }
                contractDao.addContractWithOwner(contract_address, account.address, "APARTMENT");
                return callback(null, contract_address);
            })
    })
}



export function addToken(username, name, description,ipfs_hash, callback){
    accountDao.findCredentialsByUsername(username, (err, account) => {
        if (err) {
            return callback(err);
        }
        web3.eth.personal.unlockAccount(account.address, account.passphrase, null).then(() => {
            web3.eth.getBalance(account.address).then((balance) => {
                getAllTypesAuction('APARTMENT', (res)=>{
                    console.log(res);
                    const instance = getToken(res[0].contract_address);
                    instance.methods._mintToken(account.address, name, description,ipfs_hash).send({from: account.address,  gas: GAS, gasPrice: GAS_PRICE})
                        .catch((err) => {
                            callback(err);
                        })
                        .then((result) => {
                            return callback(err, result);
                        })
                });
            })

        })
    });

}

export function getTokenDetails(username, tokenId, callback){
    accountDao.findCredentialsByUsername(username, (err, account) => {
        if (err) {
            return callback(err);
        }
        web3.eth.personal.unlockAccount(account.address, account.passphrase, null).then(() => {
            web3.eth.getBalance(account.address).then((balance) => {
                getAllTypesAuction('APARTMENT', (res)=>{
                    const instance = getToken(res[0].contract_address);
                    instance.methods.tokens(tokenId).call({from: account.address})
                        .catch((err) => {
                            console.log(err);
                            callback(err);
                        })
                        .then((token) => {
                            console.log(token);
                            instance.methods.getApproved(tokenId).call({from: account.address})
                                .catch((err) => {
                                    console.log(err);
                                    callback(err);
                                })
                                .then((result) => {
                                    console.log(result);
                                    if(result.toString().substring(0,9) !== "0x0000000")
                                        return callback(null,convertToTokenDetails(tokenId, token, false));
                                    else return callback(null,convertToTokenDetails(tokenId, token, true));

                                })
                        })
                });
            })

        })
    });
}

export function approveContract(type,username, tokenId, callback){
    console.log(type);
    getAllTypesAuction(type, (contract)=>{
        accountDao.findCredentialsByUsername(username, (err, account) => {
            if (err) {
                return callback(err);
            }
            web3.eth.personal.unlockAccount(account.address, account.passphrase, null).then(() => {
                web3.eth.getBalance(account.address).then((balance) => {
                    getAllTypesAuction('APARTMENT', (res)=>{
                        const instance = getToken(res[0].contract_address);
                        instance.methods.approve(contract[0].contract_address,tokenId).send({from: account.address, gas: TRANSACTION_PARAMETERS.GAS, gasPrice: TRANSACTION_PARAMETERS.GAS_PRICE})
                            .catch((err) => {
                                console.log(err);
                                callback(err);
                            })
                            .then((result) => {
                                return callback(err, result);
                            })
                    });
                })

            })
        });
    })


}

/*
export function cancelApproval(username, tokenId, callback){
    accountDao.findCredentialsByUsername(username, (err, account) => {
        if (err) {
            return callback(err);
        }
        web3.eth.personal.unlockAccount(account.address, account.passphrase, null).then(() => {
            web3.eth.getBalance(account.address).then((balance) => {
                getAllTypesAuction('ADORABLE_TOKEN', (res)=>{
                    const instance = getToken(res[0].contract_address);
                    instance.methods.cancelApproval(account.address,tokenId).send({from: account.address})
                        .catch((err) => {
                            console.log(err);
                            callback(err);
                        })
                        .then((result) => {
                            return callback(err, result);
                        })
                });
            })

        })
    });
}

*/

export function getApproved(username, tokenId, callback)
{
    accountDao.findCredentialsByUsername(username, (err, account) => {
        if (err) {
            return callback(err);
        }
        web3.eth.personal.unlockAccount(account.address, account.passphrase, null).then(() => {
            web3.eth.getBalance(account.address).then((balance) => {
                getAllTypesAuction('APARTMENT', (res)=>{
                    const instance = getToken(res[0].contract_address);
                    instance.methods.getApproved(tokenId).call({from: account.address})
                        .catch((err) => {
                            console.log(err);
                            callback(err);
                        })
                        .then((result) => {
                            return callback(err, result);
                        })
                });
            })

        })
    });
}

export function getOwnerOf(username, tokenId, callback){
    accountDao.findCredentialsByUsername(username, (err, account) => {
        if (err) {
            return callback(err);
        }
        web3.eth.personal.unlockAccount(account.address, account.passphrase, null).then(() => {
            web3.eth.getBalance(account.address).then((balance) => {
                getAllTypesAuction('APARTMENT', (res)=>{
                    const instance = getToken(res[0].contract_address);
                    instance.methods.ownerOf(tokenId).call({from: account.address})
                        .catch((err) => {
                            callback(err);
                        })
                        .then((result) => {
                            return callback(err, result);
                        })
                });
            })

        })
    });
}

export function getMyTokens(username, callback){
    getAllTypesAuction('APARTMENT', (tokenContract => {
        const instance = getToken(tokenContract[0].contract_address);
        accountDao.findCredentialsByUsername(username, (err, account) => {
            if (err) {return callback(err);}
            web3.eth.personal.unlockAccount(account.address, account.passphrase, null).then(() => {
                instance.methods.getTotalTokens().call({from: account.address})
                    .catch((err) => {
                        callback(err);
                    })
                    .then((result) => {
                        let myTokens = [];
                        let i;
                        for (i = 0; i < result; i++) {
                            myTokens.push(i);
                        }
                        let promises = [];
                        myTokens.forEach((item) => {
                            promises.push(new Promise((resolve, reject) => {
                                instance.methods.ownerOf(item).call({from: account.address})
                                    .catch((err) => {
                                        callback(err);
                                    })
                                    .then((address) => {
                                        if (address.toLowerCase() === account.address.toLowerCase()) {
                                            instance.methods.tokens(item).call({from: account.address})
                                                .catch((err) => {
                                                    callback(err);
                                                })
                                                .then((token) => {
                                                    instance.methods.getApproved(item).call({from: account.address})
                                                        .catch((err) => {
                                                            console.log(err);
                                                            callback(err);
                                                        })
                                                        .then((result) => {
                                                            let res1 ;
                                                            if(result.toString().substring(0,9) !== "0x0000000")
                                                                res1=convertToTokenDetails(item, token, false);
                                                            else res1=convertToTokenDetails(item, token, true);
                                                            return resolve(res1);
                                                        })
                                                })
                                        } else return resolve('No');
                                    })

                            }));
                        });
                        Promise.all(promises)
                            .then((result) => {
                                console.log(result);
                                const filteredResult = result.filter(res => res !== 'No');
                                callback(null, filteredResult)
                            })
                    })
            })
        })
    }))
    }