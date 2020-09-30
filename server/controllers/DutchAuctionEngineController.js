
import {
    deploy,
    addAuction,
    getAllActiveDutchAuctions, allowBidding, bid,
    getMyAuctions, cancelAuction, getAuction, getMyPastAuctions, getAddReceipts, getBidReceipts
} from "../services/DutchAuctionEngineService";


export class DutchAuctionEngineController {
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
        addAuction(req.query.username, req.body.tokenId, req.body.startingPrice,
            req.body.endingPrice, req.body.offerPriceDecrement, req.body.duration, req.body.gasPrice, req.body.gas,(err, result) => {
                if (err) {
                    res.status(500).send('Error');
                }
                res.status(200).send(result);
            })
    }

    getAllAuctions(req, res) {
        getAllActiveDutchAuctions(req.params.username, (err, result) => {
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


    allowBidding(req,res){
        allowBidding(req.body.username, req.body.auctionId, (err, result)=>{
                if (err) {
                    res.status(500).send(err);
                }
                res.status(200).send(result);
            })

    }

    bid(req, res){
        bid(req.body.username, req.body.auctionId, req.body.value, req.body.gasPrice, req.body.gas, (err, result)=>{
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

    getAuction(req, res){
        getAuction(req.query.username, req.query.auctionId, (err,result)=>{
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        })
    }

    getMyPastAuctions(req,res) {
        getMyPastAuctions(req.params.username, (err,result) =>{
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        })
    }

    getAddReceipts(req, res){
        getAddReceipts(req.params.username, (err,result)=>{
            console.log(result);
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