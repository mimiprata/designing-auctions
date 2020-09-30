import {deploy, verify, verifyAuction} from "../services/VerifyService";

export class VerifyController {
    createVerify(req, res) {
        deploy(req.body.username, (err, result) => {
            if (err) {
                res.status(500).send('Error');
            }
            ;
            console.log("CONTRACT DEPLOYED " + result);
            res.status(200).send(result);
        });
    }

    verify(req, res){
        verify(req.body.username, req.body.proof1, req.body.proof2, req.body.root, req.body.leaf, (err, result)=>{
            if (err){
                res.status(500).send('Error');

            }
            res.status(200).send(result);
        })
    }

    verifyAuction(req, res){
        verifyAuction(req.body.username, req.body.leaf, (err, result)=>{
            if (err){
                res.status(500).send('Error');

            }
            res.status(200).send(result);
        })
    }
}