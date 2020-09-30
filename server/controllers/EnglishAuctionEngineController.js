import {
    deploy,
    addAuction,
    getAllActiveAuctions,
    getMyAuctions,
    bid,
    cancelAuction,
    endAuction,
    finalizeAuction,
    getBids,
    getAuction,
    getMyBid,
    hasFinalized,
    getMyPendingAuctions, getAllFinalized,
    getAddReceipts, getBidReceipts, verifyTrans, addAuctionApartament
} from "../services/EnglishAuctionEngineService";




export class EnglishAuctionEngineController {
    createAuction(req, res) {
        deploy(req.body.username, (err, result) => {
            if (err) {
                res.status(500).send('Error');
            }
            ;
            console.log("CONTRACT DEPLOYED " + result);
            res.status(200).send(result);
        })
    }
    addAuction(req, res) {
        addAuction(req.query.username, req.body.tokenId, req.body.startingPrice, req.body.bidIncrement, req.body.duration,
            req.body.gasPrice, req.body.gas,
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
        bid(req.body.username, req.body.auctionId, req.body.value,req.body.gasPrice, req.body.gas, (err, result)=>{
            if (err) {
                res.status(500).send(err);
                console.log(err);
            };
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

    endAuction(req,res){
        endAuction(req.body.username, req.body.auctionId, (err, result)=>{
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
    getBids(req,res){
        getBids(req.params.auctionId, (err, result)=>{
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

    getMyPendingAuctions(req,res){
        getMyPendingAuctions(req.params.username, (err,result)=>{
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        })
    }
    getAllFinalized(req,res){
        getAllFinalized((err,result)=>{
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
    verifyTrans(req,res){
        verifyTrans(req.params.blockNr, (err, result) =>{
            if (err){
                res.status(500).send(err);
                console.log(err);
            }
            res.status(200).send(result);
        })
    }

    addAuctionApartament(req, res) {
        addAuctionApartament(req.query.username, req.body.tokenId, req.body.startingPrice, req.body.bidIncrement, req.body.duration,
            req.body.gasPrice, req.body.gas,
            (err, result) => {
                if (err) {
                    res.status(500).send('Error');
                }
                res.status(200).send(result);
            })
    }

}



