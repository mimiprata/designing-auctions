import React from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import './Table.css'
import paginationFactory from 'react-bootstrap-table2-paginator';
import  filterFactory, { textFilter} from "react-bootstrap-table2-filter";

export const Table = (props) =>{
    const {addReceipts, bidReceipts} = props;
    let data = [];
    addReceipts &&
    addReceipts.map((item)=>{
        data.push({
            transactionHash: item.hash,
            gas: item.gas,
            gasPrice: item.gasPrice,
            from : item.from,
            type: 'ADD',
            blockNumber: item.blockNumber
        })
        data.push({
            transactionHash: item.hash,
            gas: item.gas,
            gasPrice: item.gasPrice,
            from : item.from,
            type: 'BID',
            blockNumber: item.blockNumber
        })
        data.push({
            transactionHash: item.hash,
            gas: item.gas,
            gasPrice: item.gasPrice,
            from : item.from,
            type: 'BID',
            blockNumber: item.blockNumber
        })
        data.push({
            transactionHash: item.hash,
            gas: item.gas,
            gasPrice: item.gasPrice,
            from : item.from,
            type: 'BID',
            blockNumber: item.blockNumber
        })
    });
    bidReceipts &&
    bidReceipts.map((item)=>{
        data.push({
            transactionHash: item.hash,
            gas: item.gas,
            gasPrice: item.gasPrice,
            from : item.from,
            type: 'BID',
            blockNumber: item.blockNumber
        })
        data.push({
            transactionHash: item.hash,
            gas: item.gas,
            gasPrice: item.gasPrice,
            from : item.from,
            type: 'BID',
            blockNumber: item.blockNumber
        })
        data.push({
            transactionHash: item.hash,
            gas: item.gas,
            gasPrice: item.gasPrice,
            from : item.from,
            type: 'BID',
            blockNumber: item.blockNumber
        })
    });
    const columns = [{
        dataField: 'transactionHash',
        text: 'Transaction Hash'
    }, {
        dataField: 'blockNumber',
        text: 'Block Number',
        sort: true
    }, {
        dataField: 'from',
        text: 'Address',
    }, {
        dataField: 'gas',
        text: 'Gas',
        sort: true
    }, {
        dataField: 'gasPrice',
        text: 'Gas Price/Gwei',
        sort: true
    }, {
        dataField: 'type',
        text: 'Action',
        filter: textFilter(),
        sort: true
    },{
        dataField: 'marketPlace',
        text: 'Market Place',
        filter: textFilter(),
        sort: true
    }];

    return(
        <BootstrapTable
            keyField="id-table-statistics"
            className="id-table-statistics"
            data={ data }
            columns={ columns }
            filter={ filterFactory() }
            pagination={ paginationFactory() }
        />
    )
}
