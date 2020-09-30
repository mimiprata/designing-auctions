import {AccountDao} from '../dao/AccountDao';
import web3 from "../web3";
import SealedBidAuctionEngine from "../../ethereum/build/SealedBidEngine";
import {ContractDao} from "../dao/ContractDao";
import {TRANSACTION_PARAMETERS} from "../constants/common";
import {getAllTypesAuction} from "./ContractService";
import {SealedBidAuctionEngineDao} from "../dao/SealedBidAuctionEngineDao";
const sealedBidAuctionEngineDao = new SealedBidAuctionEngineDao();
const accountDao = new AccountDao();
const contractDao = new ContractDao();




export const convertToSealedBidDetails = ( auctionId,remainingBiddingTime, remainingRevealingTime,obj) =>{
    const details = {
        auctionId: auctionId,
        owner_address: obj.owner,
        startingPrice: obj.startingPrice,
        startedAt: obj.startedAt,
        endOfBidding: obj.endOfBidding,
        endOfRevealing: obj.endOfRevealing,
        assetId: obj.assetId,
        bidsCount: obj.bidsCount,
        auctionState: obj.auctionState,
        winningBidder: obj.winningBidder,
        winningBid: obj.winningBid,
        remainingBiddingTime: remainingBiddingTime,
        remainingRevealingTime : remainingRevealingTime
    };
    return details;
};


export const getAuctionEngine = (contract_address) => {
    return new web3.eth.Contract(JSON.parse(SealedBidAuctionEngine.interface), contract_address)
};



export function deploy(username, callback) {
    accountDao.findCredentialsByUsername(username, (err, account) => {
        if (err) {
            return callback(err);
        }
        console.log(account);

        sealedBidAuctionEngineDao.deploy(account.address, account.passphrase,
            (err, contract_address) => {
                if (err) {
                    return callback(err);
                }
                contractDao.addContractWithOwner(contract_address, account.address, "SEALED_BID_ENGINE");
                return callback(null, contract_address);
            })
    });
}




export function addAuction(username,tokenId, startingPrice, endBiddingTime, endRevealingTime, gasPrice, gas, callback){
    console.log(gasPrice);
    getAllTypesAuction('SEALED_BID_ENGINE', ( (sealedBidContract)=> {
        const instance = getAuctionEngine(sealedBidContract[0].contract_address);
        getAllTypesAuction('ADORABLE_TOKEN', (tokenContract) => {
            accountDao.findCredentialsByUsername(username, (err, account) => {
                if (err) {
                    return callback(err);
                }
                web3.eth.personal.unlockAccount(account.address, account.passphrase, null).then(() => {
                    web3.eth.getBalance(account.address).then((balance) => {
                        console.log(instance);
                        console.log(tokenContract[0].contract_address);
                        instance.methods.createSealedBidAuction(
                            tokenContract[0].contract_address,
                            tokenId,
                            startingPrice,
                            endBiddingTime,
                            endRevealingTime
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
    getAllTypesAuction('SEALED_BID_ENGINE', (sealedBidContract => {
        const instance = getAuctionEngine(sealedBidContract[0].contract_address);
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

                                            instance.methods.sealedBidAuctions(item).call({from: account.address})
                                                .catch((err) => {
                                                    callback(err);
                                                })
                                                .then((auction) => {
                                                    instance.methods.getRemainingTime(item).call({from: account.address})
                                                        .catch((err) => {
                                                            callback(err);
                                                        })
                                                        .then((remainingTime) => {
                                                            const res1 = convertToSealedBidDetails(item, remainingTime[0], remainingTime [1],auction);
                                                            return resolve(res1);
                                                        })
                                                })
                                        } else return resolve('No');
                                    })
                            }))
                        })
                        Promise.all(promises)
                            .then((result) => {
                                console.log(result);
                                const filteredResult=result.filter(res => res !== 'No');
                                callback(null, filteredResult)

                            })
                    })
            })


        })
    }))

}




export function getMyHash(username, auctionId, callback){
    getAllTypesAuction('SEALED_BID_ENGINE', (dutchContract => {
        const instance = getAuctionEngine(dutchContract[0].contract_address);
        accountDao.findCredentialsByUsername(username, (err, account) => {
            if (err) {
                console.log(err);
                return callback(err);
            }
            web3.eth.personal.unlockAccount(account.address, account.passphrase, null).then(() => {
                instance.methods.getHashForUser(auctionId, account.address).call({from: account.address})
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

export function getMyAuctions(username, callback){
    getAllTypesAuction('SEALED_BID_ENGINE', (dutchContract => {
        const instance = getAuctionEngine(dutchContract[0].contract_address);
        accountDao.findCredentialsByUsername(username, (err, account) => {
            if (err) { return callback(err);}

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
                            console.log(item);
                            promises.push(new Promise((resolve, reject) => {


                                instance.methods.sealedBidAuctions(item).call({from: account.address})
                                    .catch((err) => {
                                        callback(err);
                                    })
                                    .then((auction) => {
                                        console.log(auction);
                                        if (auction.owner.toLowerCase() === account.address.toLowerCase()) {
                                            instance.methods.sealedBidAuctions(item).call({from: account.address})
                                                .catch((err) => {
                                                    callback(err);
                                                })
                                                .then((auction) => {
                                                    instance.methods.getRemainingTime(item).call({from: account.address})
                                                        .catch((err) => {
                                                            callback(err);
                                                        })
                                                        .then((remainingTime) => {
                                                            const res1 = convertToSealedBidDetails(item, remainingTime[0], remainingTime[1], auction);
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

export function bid(username, auctionId, value, nonce,gasPrice,gas, callback) {
    accountDao.findCredentialsByUsername(username, (err, account) => {
        if (err) {
            return callback(err);
        }
        getAllTypesAuction('SEALED_BID_ENGINE', (sealedBidContract => {
            const instance = getAuctionEngine(sealedBidContract[0].contract_address);
            web3.eth.personal.unlockAccount(account.address, account.passphrase, null).then(() => {
                const hash =web3.utils.soliditySha3({type: 'uint256',value: value}, {type:'uint256', value: nonce});
                console.log(hash);
                instance.methods.bid(auctionId,hash).send({from: account.address, value: value, gas: gas, gasPrice: gasPrice})
                    .catch((err) => {
                        callback(err);
                    })
                    .then((result) => {
                        return callback(err, result);
                    })})
        }))
    })

}


export function startRevealing(username, auctionId, callback) {
    accountDao.findCredentialsByUsername(username, (err, account) => {
        if (err) {
            return callback(err);
        }
        getAllTypesAuction('SEALED_BID_ENGINE', (sealedBidContract => {
            const instance = getAuctionEngine(sealedBidContract[0].contract_address);
            web3.eth.personal.unlockAccount(account.address, account.passphrase, null).then(() => {
                instance.methods.startRevealPeriod(auctionId).send({from: account.address, gas: TRANSACTION_PARAMETERS.GAS, gasPrice: TRANSACTION_PARAMETERS.GAS_PRICE})
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
        getAllTypesAuction('SEALED_BID_ENGINE', (sealedBidContract => {
            const instance = getAuctionEngine(sealedBidContract[0].contract_address);
            web3.eth.personal.unlockAccount(account.address, account.passphrase, null).then(() => {
                instance.methods.cancelAuction(auctionId).send({from: account.address, gas: TRANSACTION_PARAMETERS.GAS, gasPrice: TRANSACTION_PARAMETERS.GAS_PRICE})
                    .catch((err) => {
                        callback(err);
                    })
                    .then((result) => {
                        return callback(err, result);
                    })})
        }))
    })

}


export function finishRevealing(username, auctionId, callback) {
    accountDao.findCredentialsByUsername(username, (err, account) => {
        if (err) {
            return callback(err);
        }
        getAllTypesAuction('SEALED_BID_ENGINE', (sealedBidContract => {
            const instance = getAuctionEngine(sealedBidContract[0].contract_address);
            web3.eth.personal.unlockAccount(account.address, account.passphrase, null).then(() => {
                instance.methods.finishRevealPeriod(auctionId).send({from: account.address, gas: TRANSACTION_PARAMETERS.GAS, gasPrice: TRANSACTION_PARAMETERS.GAS_PRICE})
                    .catch((err) => {
                        callback(err);
                    })
                    .then((result) => {
                        return callback(err, result);
                    })})
        }))
    })

}

export function reveal(username, auctionId, amount, nonce, callback){
    accountDao.findCredentialsByUsername(username, (err, account) => {
        if (err) {
            return callback(err);
        }
        getAllTypesAuction('SEALED_BID_ENGINE', (sealedBidContract => {
            const instance = getAuctionEngine(sealedBidContract[0].contract_address);
            web3.eth.personal.unlockAccount(account.address, account.passphrase, null).then(() => {
                instance.methods.reveal(auctionId,amount,nonce).send({from: account.address, gas: TRANSACTION_PARAMETERS.GAS, gasPrice: TRANSACTION_PARAMETERS.GAS_PRICE})
                    .catch((err) => {
                        callback(err);
                    })
                    .then((result) => {
                        return callback(err, result);
                    })})
        }))
    })
}

export function getReveals(username, auctionId,callback){
    let hasBid = false;
    getAllTypesAuction('SEALED_BID_ENGINE', (sealedBidContract => {
        accountDao.findCredentialsByUsername(username, (err, account) => {
            if (err) {
                return callback(err);
            }
        const instance = getAuctionEngine(sealedBidContract[0].contract_address);
        instance.getPastEvents('HasRevealed', {fromBlock:0, toBlock: 'latest'}, (err,result)=>{
            if (err) callback(err);
            result.length >0 &&
            result.forEach((item)=>{
                if (item.returnValues.participant.toLowerCase() === account.address.toLowerCase() && item.returnValues._auctionId ===auctionId)
                        hasBid=true;
            });
            callback(null, hasBid);
        })
    })
}))
}

export function hasFinalized(username, auctionId,callback){
    let hasFinalized = false;
    getAllTypesAuction('SEALED_BID_ENGINE', (sealedBidContract => {
        accountDao.findCredentialsByUsername(username, (err, account) => {
            if (err) {
                return callback(err);
            }
            const instance = getAuctionEngine(sealedBidContract[0].contract_address);
            instance.getPastEvents('HasFinalized', {fromBlock:0, toBlock: 'latest'}, (err,result)=>{
                if (err) callback(err);
                result.length >0 &&
                result.forEach((item)=>{
                    if (item.returnValues.participant.toLowerCase() === account.address.toLowerCase() && item.returnValues._auctionId ===auctionId)
                        hasFinalized=true;
                });
                callback(null, hasFinalized);
            })
        })
    }))
}

export function getBids(_auctionId,callback){
    let bidsForSpecificAuction= [];
    getAllTypesAuction('SEALED_BID_ENGINE', (englishContract => {
        const instance = getAuctionEngine(englishContract[0].contract_address);
        instance.getPastEvents('BidPlaced', {fromBlock:0, toBlock: 'latest'}, (err,result)=>{
            if (err) callback(err);
            result.length >0 &&
            result.forEach((item)=>{
                console.log(item);
                if(item.returnValues._auctionId === _auctionId){
                    bidsForSpecificAuction.push(item);
                }
            });

            callback(null, bidsForSpecificAuction);
        })
    }))
}

export function finalizeAuction(username, auctionId, callback) {
    accountDao.findCredentialsByUsername(username, (err, account) => {
        if (err) {
            return callback(err);
        }
        getAllTypesAuction('SEALED_BID_ENGINE', (sealedBidContract => {
            const instance = getAuctionEngine(sealedBidContract[0].contract_address);
            web3.eth.personal.unlockAccount(account.address, account.passphrase, null).then(() => {
                console.log(account.address, auctionId);
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

export function getAuction(username, auctionId, callback){
    accountDao.findCredentialsByUsername(username, (err, account) => {
        if (err) {
            return callback(err);
        }
        getAllTypesAuction('SEALED_BID_ENGINE', (sealedBidContract => {
            const instance = getAuctionEngine(sealedBidContract[0].contract_address);
            web3.eth.personal.unlockAccount(account.address, account.passphrase, null).then(() => {
                instance.methods.sealedBidAuctions(auctionId).call({from: account.address})
                    .catch((err) => {
                        callback(err);
                    })
                    .then((result) => {
                        instance.methods.getRemainingTime(auctionId).call({from: account.address})
                            .catch((err) => {
                                callback(err);
                            })
                            .then((remainingTime) => {

                                return callback(err, convertToSealedBidDetails(auctionId,remainingTime[0], remainingTime[1], result));
                            })
                    })})
        }))
    })
}


export function getMyPendingAuctions(username, callback){
    console.log(username);
    getAllTypesAuction('SEALED_BID_ENGINE', (dutchContract => {
        const instance = getAuctionEngine(dutchContract[0].contract_address);
        accountDao.findCredentialsByUsername(username, (err, account) => {
            if (err) { return callback(err);}

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
                            console.log(item);
                            promises.push(new Promise((resolve, reject) => {
                                instance.methods.getHashForUser(item, account.address).call({from: account.address})
                                    .catch((err) => {
                                        callback(err);
                                    })
                                    .then((hash) => {
                                        console.log(hash);
                                        if (hash.toString().substring(0,9) !== "0x0000000") {
                                            instance.methods.sealedBidAuctions(item).call({from: account.address})
                                                .catch((err) => {
                                                    callback(err);
                                                })
                                                .then((auction) => {
                                                    instance.methods.getRemainingTime(item).call({from: account.address})
                                                        .catch((err) => {
                                                            callback(err);
                                                        })
                                                        .then((remainingTime) => {
                                                            const res1 = convertToSealedBidDetails(item, remainingTime[0], remainingTime[1], auction);
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

export function getMyBid(username, auctionId, callback){
    getAllTypesAuction('SEALED_BID_ENGINE', (englishContract => {
        const instance = getAuctionEngine(englishContract[0].contract_address);
        accountDao.findCredentialsByUsername(username, (err, account) => {
            if (err) {
                console.log(err);
                return callback(err);
            }
            web3.eth.personal.unlockAccount(account.address, account.passphrase, null).then(() => {
                instance.methods.getBalanceOf(auctionId, account.address).call({from: account.address})
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


export function getAddReceipts(username, callback){

    getAllTypesAuction('SEALED_BID_ENGINE', (sealedBidContract => {
        accountDao.findCredentialsByUsername(username, (err, account) => {
            if (err) {
                return callback(err);
            }
            const instance = getAuctionEngine(sealedBidContract[0].contract_address);

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

    getAllTypesAuction('SEALED_BID_ENGINE', (sealedBidContract => {
        accountDao.findCredentialsByUsername(username, (err, account) => {
            if (err) {
                return callback(err);
            }
            const instance = getAuctionEngine(sealedBidContract[0].contract_address);

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

                        callback(null, result)

                    })
            })

        })
    }))
}

