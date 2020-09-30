import {
    addToken,
    approveContract,
    deploy,
    getApproved, getMyTokens,
    getOwnerOf,
    getTokenDetails
} from "../services/ApartmentService";


export class ApartmentController {

    createAdorableToken(req, res) {
        deploy(req.body.username,  (err, result) => {
            if (err) {
                res.status(500).send('Error');
            };
            console.log("CONTRACT DEPLOYED " + result);
            res.status(200).send(result);
        });
    }

    addToken(req, res){
        addToken(req.body.username, req.body.name, req.body.description, req.body.ipfs_hash, (err,result)=>{
            if (err) {
                res.status(500).send('Error');
            };
            res.status(200).send(result);
        })
    }

    getTokenDetails(req,res){
        getTokenDetails(req.query.username, req.query.tokenId, (err,result)=>{
            if(err){
                res.status(500).send('Error');
            }
            res.status(200).send(result);
        })
    }

    getApprovedForToken(req,res){
        getApproved(req.query.username, req.query.tokenId, (err,result)=>{
            if(err){
                res.status(500).send('Error');
            }
            res.status(200).send(result);
        })
    }

    approveToken(req,res){
        approveContract(req.body.type,req.body.username,req.body.tokenId, (err,result)=>{
            if(err){
                res.status(500).send('Error');
            }
            res.status(200).send(result);
        })
    }

    getOwnerOf(req,res){
        getOwnerOf(req.query.username, req.query.tokenId, (err,result)=>{
            if(err){
                res.status(500).send('Error');
            }
            res.status(200).send(result);
        })
    }

    getMyTokens(req,res){
        getMyTokens(req.params.username, (err, result)=>{
            if(err){
                res.status(500).send('Error');
            }
            res.status(200).send(result);
        })
    }
}