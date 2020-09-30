import React from 'react';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody, MDBIcon,
    MDBInput
} from "mdbreact";
import './LoginForm.css'
import {fetchLoggedInUser} from "../../redux/actions/auth";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
class LoginForm extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            username:'',
            password:''
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.loggedInUser !==null){
            this.props.history.push(`/home`);
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    emptyFields = () => {
      this.setState({
          username:'',
          password:''
      })
    };

    login = (e) =>{
        e.preventDefault();
        e.target.className += " was-validated";
        this.props.fetchLoggedInUser(this.state.username, this.state.password);

        //this.redirectToTarget();
    };

    redirectToTarget = () =>{
        console.log(this.props.loggedInUser);
        if(this.props.loggedInUser !== null ) {
            this.props.history.push(`/home`)
        }
    };

    render() {
            return (
                <div className="login-form">
                    <MDBCard>
                        <MDBCardBody className="mx-4">
                            <div className="text-center">
                                <h3 className="dark-grey-text mb-5">
                                    <strong><MDBIcon icon="users"   size="5x"/></strong>
                                </h3>
                            </div>
                            <form
                                className="needs-validation"
                                onSubmit={this.login}

                            >
                                    {
                                        this.props.error &&
                                        <div className="error">
                                        <MDBIcon icon="exclamation-circle" />
                                        {' ' + this.props.error}
                                        </div>

                                    }
                            <MDBInput
                                value={this.state.username}
                                name="username"
                                label="Your username"
                                group
                                type="text"
                                required
                                validate
                                error="wrong"
                                success="right"

                                onChange={this.handleInputChange}
                            />
                            <MDBInput
                                value={this.state.password}
                                name="password"
                                label="Your password"
                                group
                                type="password"
                                validate
                                containerClass="mb-0"
                                onChange={this.handleInputChange}
                                required
                            />

                            <div className="text-center mb-3">
                                <MDBBtn
                                    type="submit"
                                    gradient="blue"
                                    rounded
                                    className="btn-block z-depth-1a"
                                >
                                    Sign in
                                </MDBBtn>
                            </div>
                            </form>

                        </MDBCardBody>

                    </MDBCard>
                </div>
            );

    }
}

const mapStateToProps = (state) => {
    const { loggedInUser, error } = state.authData;

    return {loggedInUser, error};
};


const mapDispatchToProps = (dispatch) => ({
    fetchLoggedInUser : (username, password) =>{
        dispatch(fetchLoggedInUser(username,password))
    }
});

export default  connect(mapStateToProps,mapDispatchToProps)(withRouter(LoginForm));