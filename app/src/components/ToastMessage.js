import {SEVERITY} from "../redux/actions/messages";
import React from 'react';
import { connect } from 'react-redux';
import './ToastMessage.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SUCCESS_MESSAGE_DURATION = 3000; // 3 seconds
const INFO_MESSAGE_DURATION = 5000; // 5 seconds

class ToastMessage extends  React.Component {
    constructor(props) {
        super(props);
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        const { message, severity, meta } = nextProps;

        if (this.props.message != '' && message === '') {
            toast.dismiss();
        } else
        if (severity && message) {
            switch (severity) {
                case SEVERITY.INFO:
                    toast.info(`${message}`, {
                        position: "top-right",
                        autoClose: INFO_MESSAGE_DURATION,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                    break;
                case SEVERITY.ERROR:
                    console.error(`${message}`);
                    toast.error(`${message}`, {
                        position: "top-right",
                        autoClose: false,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    })
                    break;
                case SEVERITY.SUCCESS:
                    toast.success(`${message}`, {
                        position: "top-right",
                        autoClose: SUCCESS_MESSAGE_DURATION,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                    break;
                case SEVERITY.WARNING:
                    console.warn(`${message}`);
                    toast.warn(`${message}`, {
                        position: "top-right",
                        autoClose: false,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                    break;
                default:
                    toast(message);
            }
        }
    }

    render() {
        return(
            <ToastContainer
                className={"custom-toast-container"}
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange
                draggable
                pauseOnHover
            />
        )
    }
}

const mapStateToProps = (state) => {
    const { message, severity } = state.messages;
    return {
        message, severity
    };
};

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ToastMessage);
