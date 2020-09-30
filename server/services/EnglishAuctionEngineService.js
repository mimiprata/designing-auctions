import {AccountDao} from '../dao/AccountDao';
import web3 from "../web3";
import EnglishAuctionEngine from "../../ethereum/build/EnglishAuctionEngine";
import {ContractDao} from "../dao/ContractDao";
import {TRANSACTION_PARAMETERS} from "../constants/common";
import {getAllTypesAuction} from "./ContractService";
import {EnglishAuctionEngineDao} from "../dao/EnglishAuctionEngineDao";
import {convertToDutchDetails} from "./DutchAuctionEngineService";
import {convertToSealedBidDetails} from "./SealedBidAuctionEngineService";
const englishAuctionEngineDao = new EnglishAuctionEngineDao();
const accountDao = new AccountDao();
const contractDao = new ContractDao();

export const getAuctionEngine = (contract_address) => {
    return new web3.eth.Contract(JSON.parse(EnglishAuctionEngine.interface), contract_address)
};

export const convertToEnglishDetails = ( auctionId,highestBid,remainingTime,obj) =>{
    const details = {
        auctionId: auctionId,
        owner_address: obj.owner,
        startingPrice: obj.startingPrice,
        startedAt: obj.startedAt,
        duration: obj.duration,
        assetId: obj.assetId,
        bidsCount: obj.bidsCount,
        auctionState: obj.auctionState,
        highestBidder: obj.highestBidder,
        highestBindingBid: obj.highestBindingBid,
        highestBid: highestBid,
        remainingTime: remainingTime
    };
    return details;
};

export function deploy(username, callback) {
    accountDao.findCredentialsByUsername(username, (err, account) => {
        if (err) {
            return callback(err);
        }
        console.log(account);

        englishAuctionEngineDao.deploy(account.address, account.passphrase,
            (err, contract_address) => {
                if (err) {
                    return callback(err);
                }
                contractDao.addContractWithOwner(contract_address, account.address, "ENGLISH_ENGINE");
                return callback(null, contract_address);
            })
    });
}

export function addAuction(username,tokenId, startingPrice, bidIncrement, duration,gasPrice, gas, callback){
    getAllTypesAuction('ENGLISH_ENGINE', ( (englishContract)=> {
        const instance = getAuctionEngine(englishContract[0].contract_address);
        getAllTypesAuction('ADORABLE_TOKEN', (tokenContract) => {
            accountDao.findCredentialsByUsername(username, (err, account) => {
                if (err) {
                    return callback(err);
                }
                web3.eth.personal.unlockAccount(account.address, account.passphrase, null).then(() => {
                    web3.eth.getBalance(account.address).then((balance) => {
                        console.log(instance);
                        console.log(tokenContract[0].contract_address);
                        instance.methods.createEnglishAuction(
                            tokenContract[0].contract_address,
                            tokenId,
                            startingPrice,
                            bidIncrement,
                            duration
                        ).send({
                            from: account.address,
                            gas: gas,
                            gasPrice: gasPrice
                        })
                            .catch((err) => {
                                console.log(err);
                                callback(err);
                            })
                            .then((result) => {
                                console.log(result);
                                return callback(err, result);
                            })
                    })

                })
            })
        })

    }));


}

export function addAuctionApartament(username,tokenId, startingPrice, bidIncrement, duration,gasPrice, gas, callback){
    getAllTypesAuction('ENGLISH_ENGINE', ( (englishContract)=> {
        const instance = getAuctionEngine(englishContract[0].contract_address);
        getAllTypesAuction('APARTMENT', (tokenContract) => {
            accountDao.findCredentialsByUsername(username, (err, account) => {
                if (err) {
                    return callback(err);
                }
                web3.eth.personal.unlockAccount(account.address, account.passphrase, null).then(() => {
                    web3.eth.getBalance(account.address).then((balance) => {
                        console.log(instance);
                        console.log(tokenContract[0].contract_address);
                        instance.methods.createEnglishAuction(
                            tokenContract[0].contract_address,
                            tokenId,
                            startingPrice,
                            bidIncrement,
                            duration
                        ).send({
                            from: account.address,
                            gas: gas,
                            gasPrice: gasPrice
                        })
                            .catch((err) => {
                                console.log(err);
                                callback(err);
                            })
                            .then((result) => {
                                console.log(result);
                                return callback(err, result);
                            })
                    })

                })
            })
        })

    }));


}

export function getAllActiveAuctions(username, callback){
    getAllTypesAuction('ENGLISH_ENGINE', (englishContract => {
        const instance = getAuctionEngine(englishContract[0].contract_address);
        accountDao.findCredentialsByUsername(username, (err, account) => {
            if (err) {return callback(err);}
            web3.eth.personal.unlockAccount(account.address, account.passphrase, null).then(() => {
                instance.methods.getTotalAuctions().call({from: account.address})
                    .catch((err) => {
                        callback(err);
                    })
                    .then((result) => {
                        let myAuctions =[];
                        let i;
                        for(i=0;i<result;i++)
                        {
                            myAuctions.push(i);
                        }
                        let promises = [];
                        myAuctions.forEach((item)=> {
                            console.log(item);
                            promises.push(new Promise((resolve, reject) => {

                                instance.methods.isStillAcceptingBids(item).call({from: account.address})
                                    .catch((err) => {
                                        callback(err);
                                    })
                                    .then((isStillAcceptingBids) => {
                                        if (isStillAcceptingBids) {

                                            instance.methods.englishAuctions(item).call({from: account.address})
                                                .catch((err) => {
                                                    callback(err);
                                                })
                                                .then((auction) => {
                                                    instance.methods.getHighestBid(item).call({from: account.address})
                                                        .catch((err) => {
                                                            callback(err);
                                                        })
                                                        .then((highestBid) => {
                                                            instance.methods.getRemainingTime(item).call({from: account.address})
                                                                .catch((err) => {
                                                                    callback(err);
                                                                })
                                                                .then((remainingTime) => {
                                                                    const res1 = convertToEnglishDetails(item, highestBid, remainingTime, auction);
                                                                    return resolve(res1);
                                                                })
                                                        })
                                                })
                                        } else return resolve('No');
                                    })
                            }))
                        });
                        Promise.all(promises)
                            .then((result) => {
                                const filteredResult=result.filter(res => res !== 'No');
                                callback(null, filteredResult)
                            })
                    })
            })
        })
    }))
}


export function getMyAuctions(username, callback){
    getAllTypesAuction('ENGLISH_ENGINE', (englishContract => {
        const instance = getAuctionEngine(englishContract[0].contract_address);
        accountDao.findCredentialsByUsername(username, (err, account) => {
            if (err) {return callback(err);}
            web3.eth.personal.unlockAccount(account.address, account.passphrase, null).then(() => {
                instance.methods.getTotalAuctions().call({from: account.address})
                    .catch((err) => {
                        callback(err);
                    })
                    .then((result) => {
                        let myAuctions = [];
                        let i;
                        for (i = 0; i < result; i++) {
                            myAuctions.push(i);
                        }
                        let promises = [];
                        myAuctions.forEach((item) => {
                            promises.push(new Promise((resolve, reject) => {
                                instance.methods.englishAuctions(item).call({from: account.address})
                                    .catch((err) => {
                                        callback(err);
                                    })
                                    .then((auction) => {
                                        if (auction.owner.toLowerCase() === account.address.toLowerCase()) {
                                            instance.methods.getHighestBid(item).call({from: account.address})
                                                .catch((err) => {
                                                    callback(err);
                                                })
                                                .then((highestBid) => {
                                                    instance.methods.getRemainingTime(item).call({from: account.address})
                                                        .catch((err) => {
                                                            callback(err);
                                                        })
                                                        .then((remainingTime) => {
                                                            const res1 = convertToEnglishDetails(item, highestBid,remainingTime, auction);
                                                            return resolve(res1);
                                                        })
                                                })
                                        } else return resolve('No');
                                    })

                            }));
                        })
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


export function bid(username, auctionId, value, gasPrice, gas, callback) {
    accountDao.findCredentialsByUsername(username, (err, account) => {
        if (err) {
            return callback(err);
        }
        getAllTypesAuction('ENGLISH_ENGINE', (englishContract => {
            const instance = getAuctionEngine(englishContract[0].contract_address);
            web3.eth.personal.unlockAccount(account.address, account.passphrase, null).then(() => {
                instance.methods.placeBid(auctionId).send({from: account.address, value: value, gas: gas, gasPrice: gasPrice})
                    .catch((err) => {
                        callback(err);
                    })
                    .then((result) => {
                        return callback(err, result);
                    })})
        }))
    })

}

export function cancelAuction(username, auctionId, callback) {
    accountDao.findCredentialsByUsername(username, (err, account) => {
        if (err) {
            return callback(err);
        }
        getAllTypesAuction('ENGLISH_ENGINE', (englishContract => {
            const instance = getAuctionEngine(englishContract[0].contract_address);
            web3.eth.personal.unlockAccount(account.address, account.passphrase, null).then(() => {
                instance.methods.cancelAuction(auctionId).send({
                    from: account.address,
                    gas: TRANSACTION_PARAMETERS.GAS,
                    gasPrice: TRANSACTION_PARAMETERS.GAS_PRICE
                })
                    .catch((err) => {
                        callback(err);
                    })
                    .then((result) => {
                        return callback(err, result);
                    })
            })
        }))
    })
}
    export function endAuction(username, auctionId, callback) {
        accountDao.findCredentialsByUsername(username, (err, account) => {
            if (err) {
                return callback(err);
            }
            getAllTypesAuction('ENGLISH_ENGINE', (englishContract => {
                const instance = getAuctionEngine(englishContract[0].contract_address);
                web3.eth.personal.unlockAccount(account.address, account.passphrase, null).then(() => {
                    instance.methods.endAuction(auctionId).send({from: account.address, gas: TRANSACTION_PARAMETERS.GAS, gasPrice: TRANSACTION_PARAMETERS.GAS_PRICE})
                        .catch((err) => {
                            callback(err);
                        })
                        .then((result) => {
                            return callback(err, result);
                        })})
            }))
        })
}



export function finalizeAuction(username, auctionId, callback) {
    accountDao.findCredentialsByUsername(username, (err, account) => {
        if (err) {
            return callback(err);
        }
        getAllTypesAuction('ENGLISH_ENGINE', (englishContract => {
            const instance = getAuctionEngine(englishContract[0].contract_address);
            web3.eth.personal.unlockAccount(account.address, account.passphrase, null).then(() => {
                instance.methods.finalizeAuction(auctionId).send({from: account.address, gas: TRANSACTION_PARAMETERS.GAS, gasPrice: TRANSACTION_PARAMETERS.GAS_PRICE})
                    .catch((err) => {
                        callback(err);
                    })
                    .then((result) => {
                        return callback(err, result);
                    })})
        }))
    })

}



export function getBids(_auctionId,callback){
    let bidsForSpecificAuction= [];
    getAllTypesAuction('ENGLISH_ENGINE', (englishContract => {
        const instance = getAuctionEngine(englishContract[0].contract_address);
        instance.getPastEvents('BidPlaced', {fromBlock:0, toBlock: 'latest'}, (err,result)=>{
            if (err) callback(err);
            result.length >0 &&
            result.forEach((item)=>{
                if(item.returnValues._auctionId === _auctionId){
                    bidsForSpecificAuction.push(item);
                }
            });

            callback(null, bidsForSpecificAuction);
        })
    }))
}

export function getAuction(username, auctionId, callback){
    accountDao.findCredentialsByUsername(username, (err, account) => {
        if (err) {
            return callback(err);
        }
        getAllTypesAuction('ENGLISH_ENGINE', (englishContract => {
            const instance = getAuctionEngine(englishContract[0].contract_address);
            web3.eth.personal.unlockAccount(account.address, account.passphrase, null).then(() => {
                instance.methods.englishAuctions(auctionId).call({from: account.address})
                    .catch((err) => {
                        callback(err);
                    })
                    .then((auction) => {
                        instance.methods.getHighestBid(auctionId).call({from: account.address})
                            .catch((err) => {
                                callback(err);
                            })
                            .then((highestBid) => {
                                instance.methods.getRemainingTime(auctionId).call({from: account.address})
                                    .catch((err) => {
                                        callback(err);
                                    })
                                    .then((remainingTime) => {
                                        const res1 = convertToEnglishDetails(auctionId, highestBid, remainingTime, auction);
                                        return callback(null, res1);
                                    })
                            })
                    })
            })
        }))
    })
}


export function getMyBid(username, auctionId, callback){
    getAllTypesAuction('ENGLISH_ENGINE', (englishContract => {
        const instance = getAuctionEngine(englishContract[0].contract_address);
        accountDao.findCredentialsByUsername(username, (err, account) => {
            if (err) {
                console.log(err);
                return callback(err);
            }
            web3.eth.personal.unlockAccount(account.address, account.passphrase, null).then(() => {
                instance.methods.getMyBid(auctionId, account.address).call({from: account.address})
                    .catch((err) => {
                        console.log(err);
                        callback(err);
                    })
                    .then((result) => {
                        return callback(err, result);
                    })
            })
        })
    }))
}

export function verifyTrans (blockNr, callback){
    let boolean = true;
    web3.eth.getBlock(blockNr).then( (res) =>{
        web3.eth.getBlockTransactionCount(blockNr).then(
            res1=>{
                let y = [res, res1];
                callback(null, y)
            }
        )

    })
        .catch((err)=>{
            console.log(err);
            callback(err);
        })
}

export function hasFinalized(username, auctionId,callback){
    let hasFinalized = false;
    getAllTypesAuction('ENGLISH_ENGINE', (sealedBidContract => {
        accountDao.findCredentialsByUsername(username, (err, account) => {
            if (err) {
                return callback(err);
            }
            const instance = getAuctionEngine(sealedBidContract[0].contract_address);
            instance.getPastEvents('Finalized', {fromBlock:0, toBlock: 'latest'}, (err,result)=>{
                if (err) callback(err);
                result.length >0 &&
                result.forEach((item)=>{
                    if (item.returnValues.bidder.toLowerCase() === account.address.toLowerCase() && item.returnValues._auctionId ===auctionId)
                        hasFinalized=true;
                });
                callback(null, hasFinalized);
            })
        })
    }))
}

export function getMyPendingAuctions(username, callback){
    getAllTypesAuction('ENGLISH_ENGINE', (englishContract => {
        const instance = getAuctionEngine(englishContract[0].contract_address);
        accountDao.findCredentialsByUsername(username, (err, account) => {
            if (err) {return callback(err);}
            web3.eth.personal.unlockAccount(account.address, account.passphrase, null).then(() => {
                instance.methods.getTotalAuctions().call({from: account.address})
                    .catch((err) => {
                        callback(err);
                    })
                    .then((result) => {
                        let myAuctions = [];
                        let i;
                        for (i = 0; i < result; i++) {
                            myAuctions.push(i);
                        }
                        let promises = [];
                        myAuctions.forEach((item) => {
                            promises.push(new Promise((resolve, reject) => {
                                instance.methods.getMyBid(item, account.address).call({from: account.address})
                                    .catch((err) => {
                                        callback(err);
                                    })
                                    .then((bid) => {
                                        console.log(bid);
                                        if (bid !== 0) {
                                            instance.methods.englishAuctions(item).call({from: account.address})
                                                .catch((err) => {
                                                    callback(err);
                                                })
                                                .then((auction) => {
                                                    instance.methods.getHighestBid(item).call({from: account.address})
                                                        .catch((err) => {
                                                            callback(err);
                                                        })
                                                        .then((highestBid) => {
                                                            instance.methods.getRemainingTime(item).call({from: account.address})
                                                                .catch((err) => {
                                                                    callback(err);
                                                                })
                                                                .then((remainingTime) => {
                                                                    const res1 = convertToEnglishDetails(item, highestBid, remainingTime,auction);
                                                                    return resolve(res1);
                                                                })
                                                        })
                                                })
                                        } else return resolve('No');
                                    })

                            }));
                        })
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

export function getAllFinalized(callback){
    getAllTypesAuction('ENGLISH_ENGINE', (sealedBidContract => {
            const instance = getAuctionEngine(sealedBidContract[0].contract_address);
            instance.getPastEvents('Finalized', {fromBlock:0, toBlock: 'latest'}, (err,result)=>{
                if (err) callback(err);

                callback(null, result);
            })

    }))
}

export function getAddReceipts(username, callback){

    getAllTypesAuction('ENGLISH_ENGINE', (englishContract => {
        accountDao.findCredentialsByUsername(username, (err, account) => {
            if (err) {
                return callback(err);
            }
            const instance = getAuctionEngine(englishContract[0].contract_address);

            instance.getPastEvents('AuctionCreated', {fromBlock: 0, toBlock: 'latest'}, (err, result) => {
                if (err) callback(err);
                let promises = [];
                result.length > 0 &&
                result.forEach((item) => {
                    promises.push(new Promise((resolve, reject) => {
                        web3.eth.getTransaction(item.transactionHash).then(
                            (res) => {
                                return resolve(res);
                            }
                        )
                    }))

                })
                Promise.all(promises)
                    .then((result) => {
                        console.log(result);

                        callback(null, result)

                    })
            })

        })
    }))
}

export function getBidReceipts(username, callback){

    getAllTypesAuction('ENGLISH_ENGINE', (englishContract => {
        accountDao.findCredentialsByUsername(username, (err, account) => {
            if (err) {
                return callback(err);
            }
            const instance = getAuctionEngine(englishContract[0].contract_address);

            instance.getPastEvents('BidPlaced', {fromBlock: 0, toBlock: 'latest'}, (err, result) => {
                if (err) callback(err);
                let promises = [];
                result.length > 0 &&
                result.forEach((item) => {
                    promises.push(new Promise((resolve, reject) => {
                        web3.eth.getTransaction(item.transactionHash).then(
                            (res) => {
                                return resolve(res);
                            }
                        )
                    }))

                })
                Promise.all(promises)
                    .then((result) => {
                        console.log(result);

                        callback(null, result)

                    })
            })

        })
    }))
}