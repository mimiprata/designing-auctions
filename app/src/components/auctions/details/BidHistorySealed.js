import {Button, Modal} from "react-bootstrap";
import React from "react";
import { MDBIcon} from "mdbreact";
import './BidHistorySealed.css'
import {ItemBidHistory} from "./ItemBidHistory";
/*

export const BidHistorySealed = (props) => {
    const {show, onHide, historyBids, responseVerify, clicked} = props;

    const historyBidsPlus={
        ...historyBids,
        checked:false
    };


    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
        >
            <Modal.Header>
                <Modal.Title>History</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="bid-history-container">
                    <div className="bid-history">
                        {
                            historyBidsPlus.map((item) => {
                                console.log(item.transactionHash)
                                return <div className="history-bids-item" key={item.transactionHash}>

                                    <MDBIcon icon="gavel"/> {' '}
                                    {item.returnValues._creator.toString().substring(0, 9)} :
                                    {item.returnValues.hash.toString().substring(0, 30)}
                                    {clicked ?
                                        <MDBIcon icon="fa-check-circle-o "/>
                                        :
                                        <Button color={null} className={'verify-button'} onClick={() => {
                                            props.verifyOfferByHash( item.transactionHash)
                                        }}
                                        >Verify </Button>
                                    }

                                </div>
                                /!*return <ItemBidHistory
                                   item={item}
                                   clicked={clicked}
                                   verifyOfferByHash={props.verifyOfferByHash}
                                />*!/
                            })

                        }
                    </div>

                </div>
            </Modal.Body>
        </Modal>)
}*/


class BidHistorySealed extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.state={
            historyBidsPlus: ''

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.historyBids.length !== prevProps.historyBids.length){
            let y= [];
            this.props.historyBids.map((item)=>{
                y.push({...item,checked:false})
            })
            this.setState({historyBidsPlus:y});
          //  this.setState({historyBidsPlus: {...this.props.historyBids, checked:false}});
        }
    }

    componentDidMount() {
        let y= [];
        this.props.historyBids.map((item)=>{
            y.push({...item,checked:false})
        })
        this.setState({historyBidsPlus:y}); }

    render(){
        const {show, onHide, historyBids, responseVerify, clicked} = this.props;
        console.log(historyBids, this.state.historyBidsPlus);
        return (<Modal
            show={show}
            onHide={onHide}
            size="lg"
        >
            <Modal.Header>
                <Modal.Title>History</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="bid-history-container">
                    <div className="bid-history">
                        {
                            this.state.historyBidsPlus &&  this.state.historyBidsPlus.map((item) => {
                                console.log(item.transactionHash)
                                return <div className="history-bids-item" key={item.transactionHash}>

                                        <MDBIcon icon="gavel"/> {' '}
                                        {item.returnValues._creator.toString().substring(0, 9)} :
                                        {item.returnValues.hash.toString().substring(0, 30)}
                                        {item.checked ?
                                            <React.Fragment className='icon-green'>
                                                {' '} <MDBIcon className='icon-green' far icon="check-circle" /> </React.Fragment>

                                            :
                                            <Button color={null} className={'verify-button'} onClick={() => {
                                                let x = this.state.historyBidsPlus.slice();
                                                 x.map(item1=>{
                                                     if(item1.transactionHash===item.transactionHash){
                                                         item1.checked = true;
                                                     }
                                                 });
                                                 this.setState({historyBidsPlus:x});
                                                this.props.verifyOfferByHash( item.transactionHash)
                                            }}
                                            >Verify </Button>
                                        }

                                    </div>

                            })

                        }
                    </div>

                </div>
            </Modal.Body>
        </Modal>)
    }
}

export default BidHistorySealed;