import {AccountDao} from "../dao/AccountDao";


const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

const accountDao = new AccountDao();

export function login(username, password, callback) {
    accountDao.findCredentialsByUsername(username, (err, account) => {
            if (err) {
                return callback('Username Not found');
            }

            const passwordIsValid = bcrypt.compareSync(password, account.password);
            if (!passwordIsValid)  return callback('Password not valid');

            // if user is found and password is valid
            // create a token
            const token = jwt.sign({id: account.id}, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            const account1 = {
                username: account.username,
                address: account.address,
                token : token
            }

            return callback(null, account1)

        }
    )
}

export function getUserByAddress(account_address, callback){
    accountDao.findUserByAddress(account_address, (err, account) => {
        if (err) {
            return callback('Username not found');
        }
        callback(null,{
            username:account.username,
            email:account.email
        })
    })
}