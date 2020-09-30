import {
    deploy,
    addAuction,
    getAllActiveAuctions,
    getMyAuctions,
    bid,
    finishRevealing,
    startRevealing,
    reveal,
    cancelAuction,
    finalizeAuction,
    getAuction,
    getMyHash,
    getMyPendingAuctions,
    getReveals, hasFinalized,
    getAddReceipts, getBidReceipts, getBids, getMyBid
} from "../services/SealedBidAuctionEngineService";
export class SealedBidAuctionEngineController {
    createAuction(req, res) {
        deploy(req.body.username, (err, result) => {
            if (err) {
                res.status(500).send('Error');
            }
            ;
            console.log("CONTRACT DEPLOYED " + result);
            res.status(200).send(result);
        });
    }

    addAuction(req, res) {
        addAuction(req.query.username, req.body.tokenId, req.body.startingPrice, req.body.endBiddingTime,
            req.body.endRevealingTime, req.body.gasPrice, req.body.gas,
            (err, result) => {
                if (err) {
                    res.status(500).send('Error');
                }
                res.status(200).send(result);
            })
    }

    getAllAuctions(req, res) {
        getAllActiveAuctions(req.params.username, (err, result) => {
            if (err) {
                res.status(500).send('Error');
            }
            res.status(200).send(result);
        })

    }

    getMyAuctions(req,res){
        getMyAuctions(req.params.username, (err,result)=>{
            if (err){
                res.status(500).send('Error');
            }
            res.status(200).send(result);
        })
    }
    bid(req, res){
        bid(req.body.username, req.body.auctionId, req.body.value, req.body.nonce, req.body.gasPrice, req.body.gas, (err, result)=>{
            if (err) {
                res.status(500).send(err);
                console.log(err);
            };
            res.status(200).send(result);
        })
    }
    finishReveal(req,res){
        finishRevealing(req.body.username, req.body.auctionId, (err, result)=>{
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        })

    }

    startReveal(req,res){
        startRevealing(req.body.username, req.body.auctionId, (err, result)=>{
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        })

    }

    cancelAuction(req,res){
        cancelAuction(req.body.username, req.body.auctionId, (err, result)=>{
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        })

    }

    getMyHash(req,res){
        getMyHash(req.query.username, req.query.auctionId, (err, result)=>{
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        })

    }
    reveal(req,res){
        reveal(req.body.username, req.body.auctionId, req.body.amount, req.body.nonce, (err, result)=>{
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        })

    }
    finalizeAuction(req,res){
        finalizeAuction(req.body.username, req.body.auctionId, (err, result)=>{
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        })

    }

    getAuction(req, res){
        getAuction(req.query.username, req.query.auctionId, (err,result)=>{
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        })
    }

    getMyPendingAuctions(req,res){
        getMyPendingAuctions(req.params.username, (err,result)=>{
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        })
    }

    getReveals(req,res){
        getReveals(req.query.username, req.query.auctionId, (err, result)=>{
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        })
    }

    getBids(req,res){
        getBids(req.params.auctionId, (err, result)=>{
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        })
    }

    getMyBid(req,res) {
        getMyBid(req.query.username, req.query.auctionId, (err, result) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        })
    }


    hasFinalized(req,res){
        hasFinalized(req.query.username, req.query.auctionId, (err, result)=>{
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        })
    }
    getAddReceipts(req, res){
        getAddReceipts(req.params.username, (err,result)=>{

            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        })
    }

    getBidReceipts(req, res){
        getBidReceipts(req.params.username, (err,result)=>{
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        })
    }

}
