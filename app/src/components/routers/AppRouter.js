
import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import {Login} from "../login/Login";
import Home from "../home/Home";
import AuctionsHome from "../auctions/AuctionsHome";
import AddAuctionHome from "../auctions/AddAuction/AddAuctionHome";
import MyActiveAuctions from "../myAuctions/MyActiveAuctions";
import Auction from "../auctions/details/Auction";
import Wallet from "../wallet/Wallet"
import MyPendingAuctions from "../myAuctions/MyPendingAuctions/MyPendingAuctions";
import Apartment from '../apartment/apartment'
import ToastMessage from "../ToastMessage";
import Statistics from "../statistics/Statistics";

export const AppRouter = () => (
    <React.Fragment>
        <ToastMessage/>
    <BrowserRouter>

            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/home" component={Home} />
                <Route path="/auctions" component={AuctionsHome}/>
                <Route path="/activeAuction" component={Auction}/>
                <Route path="/addAuction" component={AddAuctionHome}/>
                <Route path="/myStuff" component={MyActiveAuctions}/>
                <Route path="/wallet" component={Wallet}/>
                <Route path="/whereIBid" component={MyPendingAuctions}/>
                <Route path="/apartment" component={Apartment}/>
                <Route path="/statistics" component={Statistics}/>
                <Route path="/statistics/graph" component={Apartment}/>
            </Switch>

    </BrowserRouter>
    </React.Fragment>
);