import {getUserByAddress, login} from '../services/AuthService';

export class AuthController {

    login(req, res) {

        login(req.body.username, req.body.password, (err, account) => {
            if (err) {
                res.status(500).send({message:"Username or password wrong!"})
            };
            res.status(200).send(account);
        })

    }

    logout(req,res){
        res.status(200).send({username:null, address: null, token: null})
    }

    getUser(req,res){
        getUserByAddress(req.params.account_address, (err, account)=>{
            if (err) {
                res.status(500).send({message:"No user found!"})
            };
            res.status(200).send(account);
        })
    }

}


