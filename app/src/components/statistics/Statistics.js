import React from "react";
import {connect} from "react-redux";
import {Col, Row} from "react-bootstrap";
import TypesNavBar from "../navbar/TypesNavBar";
import {Loading} from "../Loading";
import {MyStuffNavBar} from "../navbar/MyStuffNavBar";
import MyEnglishActiveAuctions from "../myAuctions/MyEnglishActiveAuctions";
import MySealedBidActiveAuctions from "../myAuctions/MySealedBidActiveAuctions";
import DutchStatistics from "./DutchStatistics";
import EnglishStatistics from "./EnglishStatistics";
import SealedBidStatistics from "./SealedBidStatistics";
import StatisticsItem from "./StatisticsItem";
import UserNavBar from "../navbar/UserNavBar";


class Statistics extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {

    }


    render() {

        return (

            <React.Fragment>
                <Loading
                    show={this.props.loadingStatistics}
                    customMessage={'Loading'}
                />
                <UserNavBar/>

                <Row>
                    <Col xs={12}>
                        {

                           <StatisticsItem/>

                        }
                    </Col>
                </Row>
            </React.Fragment>
        );

    }
}

const mapStateToProps = (state) => {

    const {auctionType} = state.auctionType;
    const {loadingStatistics} = state.ui;
    return {auctionType, loadingStatistics};
};


export default connect(mapStateToProps)(Statistics);