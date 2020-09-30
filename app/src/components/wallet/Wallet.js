import React from "react";
import UserNavBar from "../navbar/UserNavBar";
import {connect} from "react-redux";
import {fetchMyBalance, fetchMyTokens} from "../../redux/actions/token";
import WalletItem from "./WalletItem";
import './Wallet.css'
import DutchAuctionModal from "../auctions/AddAuction/atoms/DutchAuctionModal";
import EnglishAuctionModal from "../auctions/AddAuction/atoms/EnglishAuctionModal";
import SealedBidAuctionModal from "../auctions/AddAuction/atoms/SealedBidAuctionModal";
import {addDutchAuction, addEnglishAuction, addSealedBidAuction} from "../../redux/actions/auction";
import {Receipt} from "../auctions/AddAuction/atoms/Receipt";
import {Loading} from "../Loading";
import eth from '../images/Ethereum_logo_2014.svg'
import {resetToastMessage, setToastMessage, SEVERITY} from "../../redux/actions/messages";

class Wallet extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.props.resetMessage();
        this.state={showOptions:false,
            showEnglish:false,
            showDutch:false,
            showSealedBid:false,
            tokenName:''
        }
    }

    componentDidMount() {
      if(this.props.loggedInUser) {
          this.props.fetchMyTokens(this.props.loggedInUser.username);
          this.props.fetchMyBalance(this.props.loggedInUser.username);
      }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.loggedInUser !== prevProps.loggedInUser){
            this.props.fetchMyTokens(this.props.loggedInUser.username);
            this.props.fetchMyBalance(this.props.loggedInUser.username);
        }
        if(this.props.errorAdd !== prevProps.errorAdd){
            this.props.showToastMessage(this.props.errorAdd, SEVERITY.ERROR);
        }
    }

    showOptions = () =>{
        this.setState({showOptions:true})
    };

    handleEnglishClick = (name) =>{
        this.setState({showEnglish: true, tokenName:name});
    };
    handleDutchClick = (name) =>{
        this.setState({showDutch: true, tokenName:name});
    };
    handleSealedBidClick = (name) =>{
        this.setState({showSealedBid: true, tokenName:name});
    };

    closeDutchModal=() =>{
        this.setState({showDutch:false});
    };
    closeEnglishModal= () =>{
        this.setState({showEnglish:false});
    };
    closeSealedBidModal= () =>{
        this.setState({showSealedBid: false});
    };
     toFixed = (x) =>{
        if (Math.abs(x) < 1.0) {
            var e = parseInt(x.toString().split('e-')[1]);
            if (e) {
                x *= Math.pow(10,e-1);
                x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
            }
        } else {
            var e = parseInt(x.toString().split('+')[1]);
            if (e > 20) {
                e -= 20;
                x /= Math.pow(10,e);
                x += (new Array(e+1)).join('0');
            }
        }
        return x;
    }



    render() {
        console.log(this.props.myBalance)
        return(

            <React.Fragment>
                <UserNavBar/>
                <div>
                    <div className="my-balance">
                        My Balance: <br/>
                        <img src={eth} width="20px" height="20px"/>
                        {
                            this.toFixed(this.props.myBalance)
                        }
                    </div>
                </div>
                {

                    <div className="cards-body">

                            {
                    this.props.myTokens &&
                        this.props.myTokens.map((item)=> {
                            return <div className="cards-body-item">
                            <WalletItem
                                name={item.name}
                                description={item.description}
                                available={item.available}
                                handleEnglishClick={this.handleEnglishClick}
                                handleDutchClick={this.handleDutchClick}
                                handleSealedBidClick={this.handleSealedBidClick}
                                closeDutchModal={this.closeDutchModal}
                                closeEnglishModal={this.closeEnglishModal}
                                closeSealedBidModal={this.closeSealedBidModal}
                            />
                            </div>
                        })
                            }

                            </div>

                }
                <DutchAuctionModal
                    show={this.state.showDutch}
                    onHide={this.closeDutchModal}
                    tokenList={this.props.myTokens.filter((item)=>item.available)}
                    loggedInUser={this.props.loggedInUser}
                    create={this.props.addDutchAuction}
                    tokenName={this.state.tokenName}
                />
                <EnglishAuctionModal
                    show={this.state.showEnglish}
                    onHide={this.closeEnglishModal}
                    tokenList={this.props.myTokens.filter((item)=>item.available)}
                    loggedInUser={this.props.loggedInUser}
                    create={this.props.addEnglishAuction}
                    tokenName={this.state.tokenName}

                />
                <SealedBidAuctionModal
                    show={this.state.showSealedBid}
                    onHide={this.closeSealedBidModal}
                    tokenList={this.props.myTokens.filter((item)=>item.available)}
                    create={this.props.addSealedBidAuction}
                    loggedInUser={this.props.loggedInUser}
                    tokenName={this.state.tokenName}

                />
                {
                    this.props.responseAdd ?
                    < Receipt
                    show={this.props.responseAdd !== ""}
                    transactionHash={this.props.responseAdd && this.props.responseAdd.transactionHash}
                    gasUsed={this.props.responseAdd && this.props.responseAdd.gasUsed}
                    blockNumber={this.props.responseAdd && this.props.responseAdd.blockNumber}
                    href='/auctions'
                    message='See all auctions'
                    /> :
                        null

                }
                <Loading
                    show={this.props.loadingActiveAuctions}
                    customMessage={'Loading'}
                />
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    const {loggedInUser} = state.authData;
    const {myTokens, myBalance} = state.token;
    const {loadingActiveAuctions} = state.ui;
    const {responseAdd, errorAdd}= state.auction;
    return {loggedInUser, myTokens, responseAdd, loadingActiveAuctions, myBalance, errorAdd};
};

const mapDispatchToProps = (dispatch) => ({
    fetchMyTokens: (username) => {
        dispatch(fetchMyTokens(username))
    },addSealedBidAuction : (username,auctionDetails)=>{
        dispatch(addSealedBidAuction(username,auctionDetails))
    },
    addDutchAuction : (username,auctionDetails)=>{
        dispatch(addDutchAuction(username,auctionDetails))
    },
    addEnglishAuction : (username,auctionDetails)=>{
        dispatch(addEnglishAuction(username,auctionDetails))
    },
    fetchMyBalance : (username) =>{
        dispatch(fetchMyBalance(username))
    },
    showToastMessage: (message, severity) => {
        dispatch(setToastMessage(message, severity));
    },
    resetMessage: ()=>{
        dispatch(resetToastMessage());
    }

});

export default connect(mapStateToProps,mapDispatchToProps)(Wallet);