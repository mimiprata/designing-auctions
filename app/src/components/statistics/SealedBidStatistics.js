import React from "react";
import {connect} from "react-redux";
import { fetchSealedBidAddReceipt, fetchSealedBidBidReceipts
} from "../../redux/actions/statistics";
import {Table} from "./Table";
import {Card} from "react-bootstrap";
import './Statistics.css'

class SealedBidStatistics extends React.Component {
    constructor(props, context) {
        super(props, context);

    }

    componentDidMount() {
        if (this.props.loggedInUser) {
            this.props.fetchSealedBidBidReceipts(this.props.loggedInUser.username);
            this.props.fetchSealedBidAddReceipt(this.props.loggedInUser.username);
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.loggedInUser !== prevProps.loggedInUser) {
            this.props.fetchSealedBidBidReceipts(this.props.loggedInUser.username);
            this.props.fetchSealedBidAddReceipt(this.props.loggedInUser.username);
        }
    }

    render() {
        console.log(this.props.addReceipts, this.props.bidReceipts)
        return (
            <React.Fragment>
                <Card className="panel-statistics">
                    <Card.Header className="panel-statistics-header">{this.props.auctionType}</Card.Header>
                    <Card.Body className="panel-statistics-body">
                <Table
                    addReceipts={this.props.addReceipts}
                    bidReceipts={this.props.bidReceipts}
                />
                    </Card.Body>
                </Card>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    const {addReceipts, bidReceipts} = state.statistics;
    const {auctionType} = state.auctionType;
    const {loggedInUser} = state.authData;
    return {auctionType, addReceipts, bidReceipts, loggedInUser};
};

const mapDispatchToProps = (dispatch) => {
    return ({
        fetchSealedBidAddReceipt: (username) => {
            dispatch(fetchSealedBidAddReceipt(username))
        },
        fetchSealedBidBidReceipts: (username) => {
            dispatch(fetchSealedBidBidReceipts(username))
        },

    });
};

export default connect(mapStateToProps,mapDispatchToProps)(SealedBidStatistics);