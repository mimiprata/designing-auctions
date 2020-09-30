
import {AccountDao} from '../dao/AccountDao';
import web3 from "../web3";
import DutchAuctionEngine from "../../ethereum/build/DutchAuctionEngine";
import {ContractDao} from "../dao/ContractDao";
import {TRANSACTION_PARAMETERS} from "../constants/common";
import {getAllTypesAuction} from "./ContractService";
import {DutchAuctionEngineDao} from "../dao/DutchAuctionEngineDao";
const dutchAuctionEngineDao = new DutchAuctionEngineDao();
const accountDao = new AccountDao();
const contractDao = new ContractDao();
export const getAuctionEngine = (contract_address) => {
    return new web3.eth.Contract(JSON.parse(DutchAuctionEngine.interface), contract_address)
};


export const convertToDutchDetails = (currentPrice, remainingTime, auctionId,obj) =>{
    const details = {
        currentPrice:currentPrice,
        remainingTime:remainingTime,
        auctionId: auctionId,
        owner_address: obj.owner,
        endingPrice: obj.endingPrice,
        startingPrice: obj.startingPrice,
        decrement: obj.offerPriceDecrement,
        startedAt: obj.startedAt,
        duration: obj.duration,
        assetId: obj.assetId,
        auctionState: obj.auctionState,
        winningBidder: obj.winningBidder,
        winningBid: obj.winningBid
    };
    return details;
};

export function deploy(username, callback) {
    accountDao.findCredentialsByUsername(username, (err, account) => {
        if (err) {
            return callback(err);
        }
        dutchAuctionEngineDao.deploy(account.address, account.passphrase,
            (err, contract_address) => {
                if (err) {
                    return callback(err);
                }
                contractDao.addContractWithOwner(contract_address, account.address, "DUTCH_ENGINE");
                return callback(null, contract_address);
            })
    });
}

export function addAuction(username,tokenId, startingPrice, endingPrice, offerPriceDecrement, duration, gasPrice, gas, callback){
    console.log(username, startingPrice);
    getAllTypesAuction('DUTCH_ENGINE', ( (dutchContract)=> {
        const instance = getAuctionEngine(dutchContract[0].contract_address);
                   getAllTypesAuction('ADORABLE_TOKEN', (tokenContract) => {
                       accountDao.findCredentialsByUsername(username, (err, account) => {
                           if (err) {
                               return callback(err);
                           }
                           web3.eth.personal.unlockAccount(account.address, account.passphrase, null).then(() => {
                               web3.eth.getBalance(account.address).then((balance) => {
                                   instance.methods.createDutchAuction(
                                       tokenContract[0].contract_address,
                                       tokenId,
                                       startingPrice,
                                       endingPrice,
                                       offerPriceDecrement,
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



export function getAllActiveDutchAuctions(username, callback){
    getAllTypesAuction('DUTCH_ENGINE', (dutchContract => {
        const instance = getAuctionEngine(dutchContract[0].contract_address);
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
                                            console.log(item);
                                            if (isStillAcceptingBids) {

                                                instance.methods.dutchAuctions(item).call({from: account.address})
                                                    .catch((err) => {
                                                        callback(err);
                                                    })
                                                    .then((auction) => {
                                                        console.log(auction);
                                                        instance.methods.getCurrentPrice(item).call({from: account.address})
                                                            .catch((err) => {
                                                                callback(err);
                                                            })
                                                            .then((currentPrice) => {
                                                                instance.methods.getRemainingTime(item).call({from: account.address})
                                                                    .catch((err) => {
                                                                        callback(err);
                                                                    })
                                                                    .then((remainingTime) => {
                                                                        const res1 = convertToDutchDetails(currentPrice, remainingTime, item, auction);
                                                                        return resolve(res1);
                                                                    })
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


export function allowBidding(username, auctionId, callback) {
    accountDao.findCredentialsByUsername(username, (err, account) => {
        if (err) {
            return callback(err);
        }
                getAllTypesAuction('DUTCH_ENGINE', (dutchContract => {
                    const instance = getAuctionEngine(dutchContract[0].contract_address);
                    web3.eth.personal.unlockAccount(account.address, account.passphrase, null).then(() => {
                    instance.methods.allowBidding(auctionId).send({from: account.address, gas: TRANSACTION_PARAMETERS.GAS, gasPrice: TRANSACTION_PARAMETERS.GAS_PRICE})
                        .catch((err) => {
                            callback(err);
                        })
                        .then((result) => {
                            return callback(err, result);
                        })})
                }))
})

}



export function getMyAuctions(username, callback){
    getAllTypesAuction('DUTCH_ENGINE', (dutchContract => {
        const instance = getAuctionEngine(dutchContract[0].contract_address);
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
                                instance.methods.dutchAuctions(item).call({from: account.address})
                                    .catch((err) => {
                                        callback(err);
                                    })
                                    .then((auction) => {
                                        if (auction.owner.toLowerCase() === account.address.toLowerCase()) {
                                            instance.methods.getCurrentPrice(item).call({from: account.address})
                                                .catch((err) => {
                                                    callback(err);
                                                })
                                                .then((currentPrice) => {
                                                    instance.methods.getRemainingTime(item).call({from: account.address})
                                                        .catch((err) => {
                                                            callback(err);
                                                        })
                                                        .then((remainingTime) => {
                                                            const res1 = convertToDutchDetails(currentPrice, remainingTime, item, auction);
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
        getAllTypesAuction('DUTCH_ENGINE', (dutchContract => {
            const instance = getAuctionEngine(dutchContract[0].contract_address);
            web3.eth.personal.unlockAccount(account.address, account.passphrase, null).then(() => {
                instance.methods.bid(auctionId).send({from: account.address, value: value, gas: gas, gasPrice: gasPrice})
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
        getAllTypesAuction('DUTCH_ENGINE', (sealedBidContract => {
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

export function getAuction(username, auctionId, callback){
    accountDao.findCredentialsByUsername(username, (err, account) => {
        if (err) {
            return callback(err);
        }
        getAllTypesAuction('DUTCH_ENGINE', (dutchContract => {
            const instance = getAuctionEngine(dutchContract[0].contract_address);
            web3.eth.personal.unlockAccount(account.address, account.passphrase, null).then(() => {
                instance.methods.dutchAuctions(auctionId).call({from: account.address})
                    .catch((err) => {
                        callback(err);
                    })
                    .then((auction) => {
                        instance.methods.getCurrentPrice(auctionId).call({from: account.address})
                            .catch((err) => {
                                callback(err);
                            })
                            .then((currentPrice) => {
                                instance.methods.getRemainingTime(auctionId).call({from: account.address})
                                    .catch((err) => {
                                        callback(err);
                                    })
                                    .then((remainingTime) => {
                                        const res1 = convertToDutchDetails(currentPrice, remainingTime, auctionId, auction);
                                        return callback(null, res1);
                                    })
                            })
                    })})
        }))
    })
};


export function getMyPastAuctions(username, callback){
    getAllTypesAuction('DUTCH_ENGINE', (dutchContract => {
        const instance = getAuctionEngine(dutchContract[0].contract_address);
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
                                instance.methods.dutchAuctions(item).call({from: account.address})
                                    .catch((err) => {
                                        callback(err);
                                    })
                                    .then((auction) => {
                                        if (auction.winningBidder.toLowerCase() === account.address.toLowerCase()) {
                                            const res1 = convertToDutchDetails(0, 0, item, auction);
                                            return resolve(res1);
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


export function getAddReceipts(username, callback){

    getAllTypesAuction('DUTCH_ENGINE', (dutchContract => {
        accountDao.findCredentialsByUsername(username, (err, account) => {
            if (err) {
                return callback(err);
            }
            const instance = getAuctionEngine(dutchContract[0].contract_address);

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

    getAllTypesAuction('DUTCH_ENGINE', (dutchContract => {
        accountDao.findCredentialsByUsername(username, (err, account) => {
            if (err) {
                return callback(err);
            }
            const instance = getAuctionEngine(dutchContract[0].contract_address);

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