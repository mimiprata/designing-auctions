import {Nav, Navbar} from "react-bootstrap";
import React from "react";
import {withRouter} from "react-router-dom";
import './NavBar.css'

 const MyStuffNavBar1 = (props) =>{
    return(
        <Navbar bg="light" variant="light" className="navbar-custom-2">
        <Nav fill variant="tabs"  activeKey={props.location.pathname}>

                <Nav.Link href="/myStuff">My auctions</Nav.Link>


                <Nav.Link  href="/whereIBid" >My pending auctions</Nav.Link>

        </Nav>
        </Navbar>
    )
};

 export const MyStuffNavBar =withRouter(MyStuffNavBar1);