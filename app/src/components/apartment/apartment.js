import React from 'react';
import {connect} from "react-redux";
import {fetchApartmentDetails} from "../../redux/actions/apartments";
import {Col} from "react-bootstrap";


class Apartment extends React.Component{


    constructor(props, context) {
        super(props, context);
    }


    componentDidMount() {
        console.log("x");
        this.props.fetchApartmentDetails('admin', 0);

    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        return(
            <div>
                <Col xs={12}>
                    {this.props.apartmentDetails.name}
                    <br/>
                        {
                        this.props.apartmentDetails.description
                        }
                        <br/>
                       <img src={`apiIPFSipfs/${this.props.apartmentDetails.ipfs_has}`}/>
                </Col>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { apartmentDetails } = state.apartment;

    return {apartmentDetails};
};


const mapDispatchToProps = (dispatch) => ({
    fetchApartmentDetails : (username, tokenId) =>{
        dispatch(fetchApartmentDetails(username, tokenId))
    }
});


export default  connect(mapStateToProps,mapDispatchToProps)(Apartment);