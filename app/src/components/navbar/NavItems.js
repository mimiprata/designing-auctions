import {MDBIcon} from "mdbreact";
import React from "react";
import {Nav, NavItem, NavLink} from "react-bootstrap";


export const Logout  ={
    name: "Logout"
};

export const MyAuctions = {
    name: "My Auctions"
};

export const EnglishAuctions = {
    name: "English Auctions",
    icon: <MDBIcon icon="gavel" />
};

export const DutchAuctions = {
    name: "Dutch Auctions",
    icon: <MDBIcon far icon="clock" />
};

export const SealedBidAuctions = {
    name: "Sealed Bid Auctions",
    icon: <MDBIcon far icon="envelope" />
}

export const SellWithUs = () => {
    return (
        <NavLink href="/addAuction">Sell With Us!
        </NavLink>
    );
}