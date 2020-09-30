import React from 'react';
import {
    Col, Row, //Grid
} from "react-bootstrap";
import LoginSide from "./LoginSide";

export const Login = () =>(
    //<Grid fluid>
    <Row style={{height: "100%"}}>
     <Col md={12} >
         <LoginSide/>
     </Col>
    </Row>
);