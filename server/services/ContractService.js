import {ContractDao} from "../dao/ContractDao";

const contractDao = new ContractDao();

export function getAllTypesAuction(type,callback){
    contractDao.getAllTypeAuctions(type,(err,res)=>{
        if (err) {
            return callback(err);
        }
        callback(res);
    })
}