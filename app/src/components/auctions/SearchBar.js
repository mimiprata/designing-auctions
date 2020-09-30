import React from 'react';
import {MDBBtn, MDBFormInline, MDBIcon, MDBInput} from "mdbreact";

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <React.Fragment>
                <div className="search-bar">

                        <MDBInput label="Search" icon="search" containerClass="text-left"/>



                </div>
            </React.Fragment>
        )
    }
}

export default SearchBar;