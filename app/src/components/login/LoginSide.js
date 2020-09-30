import React from 'react';
import './LoginSide.css';
import LoginForm from "./LoginForm";
import {Col} from "react-bootstrap";

const LoginSide = (props) =>
    (
        <div className="background">
                 <Col md={{span:4, offset:7}} className="login-form">
                 <LoginForm/>
                 </Col>
        </div>




    );

export default LoginSide;