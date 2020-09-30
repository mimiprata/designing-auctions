import React, { Component } from "react";
import {BrowserRouter, withRouter} from "react-router-dom";
import {Image, Nav, Navbar, NavItem, NavLink} from "react-bootstrap";
import AuctionsNavItem from "./AuctionsNavItem";
import { persistStore } from 'redux-persist';
import'./NavBar.css';
import store from "../../redux/store";
import {SellWithUs} from "./NavItems";
import logo from "../images/logo.png";
class UserNavBar extends Component {


    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <BrowserRouter>
                <Navbar variant="dark" expand="lg" bg="dark" className="navbar-custom">
                    <Navbar.Brand href="/home">
                        <Image responsive src={logo} alt="logo" width="50px" height="50px"/>
                        <strong className="white-text" >Auctions</strong>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto" activeKey={this.props.location.pathname}>
                            {/*<NavItem >*/}
                                <NavLink href="/myStuff"  >My Auctions
                                </NavLink>
                          {/*  </NavItem>
                            <NavItem >*/}
                           {/* <NavLink href="/whereIBid"  >My Pending Auctions
                            </NavLink>
                             </NavItem>*/}

                            <SellWithUs/>
                            <NavLink href="/statistics">Statistics</NavLink>
                        </Nav>
                        <Nav activeKey={this.props.location.pathname} pullRight>
                            <AuctionsNavItem/>
                            {/*<NavItem>*/}
                                <NavLink href="/wallet">Wallet</NavLink>
                           {/* </NavItem>
                            <NavItem>*/}
                                <NavLink href="/"  onClick={()=>{persistStore(store).purge();}}>Logout
                                </NavLink>
                            {/*</NavItem>*/}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </BrowserRouter>
        );

    }
}


export default withRouter(UserNavBar);