import React from "react";
import {connect} from "react-redux";
import {Col, Row} from "react-bootstrap";
import TypesNavBar from "../../navbar/TypesNavBar";
import {Loading} from "../../Loading";
import MyDutchPendingAuctions from "./MyDutchPendingAuctions";
import MyEnglishPendingAuctions from "./MyEnglishPendingAuctions";
import MySealedBidPendingAuctions from "./MySealedBidPendingAuctions";
import {MyStuffNavBar} from "../../navbar/MyStuffNavBar";


class MyPendingAuctions extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {

    }


    render() {

        return (

            <React.Fragment>
                <Loading
                    show={this.props.loadingMyActiveAuctions}
                    customMessage={'Loading'}
                />
                <TypesNavBar/>
                <MyStuffNavBar/>
                <Row>
                    <Col xs={12}>
                        {
                            this.props.auctionType === 'DUTCH' ?
                                <MyDutchPendingAuctions/>
                                : this.props.auctionType === 'ENGLISH' ?
                                <MyEnglishPendingAuctions/> :
                                <MySealedBidPendingAuctions/>

                        }
                    </Col>
                </Row>
            </React.Fragment>
        );

    }
}

const mapStateToProps = (state) => {

    const {auctionType} = state.auctionType;
    const {loadingMyActiveAuctions} = state.ui;
    return {auctionType, loadingMyActiveAuctions};
};


export default connect(mapStateToProps)(MyPendingAuctions);
