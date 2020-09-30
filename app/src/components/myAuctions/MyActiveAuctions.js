import React from "react";
import {connect} from "react-redux";
import MyDutchActiveAuctions from "./MyDutchActiveAuctions";
import MySealedBidActiveAuctions from "./MySealedBidActiveAuctions";
import MyEnglishActiveAuctions from "./MyEnglishActiveAuctions";
import {Col, Row} from "react-bootstrap";
import TypesNavBar from "../navbar/TypesNavBar";
import {Loading} from "../Loading";
import {MyStuffNavBar} from "../navbar/MyStuffNavBar";


class MyActiveAuctions extends React.Component {

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
                                <MyDutchActiveAuctions/>
                                : this.props.auctionType === 'ENGLISH' ?
                                <MyEnglishActiveAuctions/> :
                                <MySealedBidActiveAuctions/>

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


export default connect(mapStateToProps)(MyActiveAuctions);
