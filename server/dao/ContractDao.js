
var pool= require('../MySQLConnect');


export class ContractDao {
    addContractWithOwner(contract_address, owner_address, type) {
        pool.getConnection(function(err,connection){
            if (err) {
                connection.release();
                throw err;
            }
            const sql = `INSERT INTO contracts ( contract_address, owner_address, type) 
                            VALUES ( '${contract_address}', '${owner_address}', '${type}')`;

            connection.query(sql,function(){
                connection.release();
            });
            connection.on('error', function(err) {
                throw err;
            });
        });

    }

    getAllTypeAuctions(type,callback){
        pool.getConnection(function(err,connection){
            if (err) {
                console.log(err);
                connection.release();
                throw err;
            }
        const sql = `SELECT * FROM contracts where contracts.type = "${type}"`;
            connection.query(sql,function(error,result){
                connection.release();
                if(!error)
                    callback(err, JSON.parse(JSON.stringify(result)));
            });
            connection.on('error', function(err) {
                throw err;
            });
        });
    }

}