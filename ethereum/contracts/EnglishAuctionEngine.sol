
pragma solidity ^0.4.24;
import "./AdorableToken.sol";
import "./SafeMath.sol";

contract EnglishAuctionEngine {

    enum State {Started, Ended, Canceled}
    event AuctionCreated(address _owner, uint256 auctionId, uint256 _tokenId);
    event BidPlaced(address bidder, uint256 _auctionId, uint256 amount);
    event HasFinalized(address bidder, uint256 _auctionId);

    struct EnglishAuction{
        uint256 startedAt;
        uint256  startingPrice;
        uint256 bidIncrement;
        uint256 duration;
        uint256  tokenId;

        address  tokenAddress;

        address  owner;
        State auctionState;
        mapping(address =>uint256)  bids;
        uint256 highestBindingBid;
        address  highestBidder;
        uint256 bidsCount;
    }
    EnglishAuction[] public englishAuctions;

    function createEnglishAuction(
        address _tokenAddress,
        uint256 _tokenId,
        uint256 _startingPrice,
        uint256 _bidIncrement,
        uint256 _duration

    ) public {
        AdorableToken token = AdorableToken(_tokenAddress);
        require(token.ownerOf(_tokenId) == msg.sender);

        require(token.getApproved(_tokenId) == address(this));
        EnglishAuction memory englishAuction = EnglishAuction({
            owner: msg.sender,
            tokenAddress: _tokenAddress,
            tokenId: _tokenId,
            startingPrice:_startingPrice,
            bidIncrement: _bidIncrement,
            duration: _duration,
            auctionState: State.Started,
            startedAt:block.number,
            highestBidder: 0x00,
            highestBindingBid: 0,
            bidsCount: 0
            });

        uint256 index = englishAuctions.push(englishAuction) - 1;
        emit AuctionCreated( englishAuction.owner, index, englishAuction.tokenId);

    }
    modifier onlyOwner(uint256 _auctionId){
        require(msg.sender == englishAuctions[_auctionId].owner);
        _;
    }



    modifier notOwner(uint256  _auctionId){
        require(msg.sender != englishAuctions[_auctionId].owner);
        _;
    }

    modifier atState(uint256 _auctionId, State _state) {
        require(englishAuctions[_auctionId].auctionState == _state);
        _;
    }

    function getRemainingTime(uint256 _auctionId) view public returns (uint256){
        return uint256(englishAuctions[_auctionId].duration-block.number);
    }

    function min(uint256 a, uint256 b) pure internal returns(uint256){
        if (a <= b){
            return a;
        }else{
            return b;
        }
    }

    function placeBid(uint256 _auctionId) public payable notOwner(_auctionId) atState(_auctionId, State.Started) returns(bool){

        require(englishAuctions[_auctionId].auctionState == State.Started);
        require(msg.value+ englishAuctions[_auctionId].bids[msg.sender] >= englishAuctions[_auctionId].startingPrice);

        uint256 currentBid = englishAuctions[_auctionId].bids[msg.sender] + msg.value;

        require(currentBid > englishAuctions[_auctionId].highestBindingBid);

        englishAuctions[_auctionId].bids[msg.sender] = currentBid;
        englishAuctions[_auctionId].bidsCount ++;

        if (currentBid <= englishAuctions[_auctionId].bids[englishAuctions[_auctionId].highestBidder]){
            englishAuctions[_auctionId].highestBindingBid = min(currentBid + englishAuctions[_auctionId].bidIncrement, englishAuctions[_auctionId].bids[englishAuctions[_auctionId].highestBidder]);
        }else{
            englishAuctions[_auctionId].highestBindingBid = min(currentBid, englishAuctions[_auctionId].bids[englishAuctions[_auctionId].highestBidder] + englishAuctions[_auctionId].bidIncrement);
            englishAuctions[_auctionId].highestBidder = msg.sender;
        }
        emit BidPlaced(msg.sender, _auctionId, msg.value);
        return true;

    }

    function endAuction(uint256 _auctionId) public {
        englishAuctions[_auctionId].auctionState = State.Ended;
    }

    function getMyBid(uint256 _auctionId, address _bidder) public view returns (uint256){
        return englishAuctions[_auctionId].bids[_bidder];
    }

    function finalizeAuction(uint256 _auctionId) public {
        require(englishAuctions[_auctionId].auctionState == State.Canceled || englishAuctions[_auctionId].auctionState == State.Ended);

        require(msg.sender == englishAuctions[_auctionId].owner || englishAuctions[_auctionId].bids[msg.sender] > 0);
        address participant;
        uint256 value;

        if(englishAuctions[_auctionId].auctionState == State.Canceled){
            participant = msg.sender;
            value = englishAuctions[_auctionId].bids[msg.sender];
        }else {
            if (msg.sender == englishAuctions[_auctionId].owner){
                participant = englishAuctions[_auctionId].owner;
                value = englishAuctions[_auctionId].highestBindingBid;
            }else  if (msg.sender == englishAuctions[_auctionId].highestBidder) {
                participant = englishAuctions[_auctionId].highestBidder;
                AdorableToken token = AdorableToken(englishAuctions[_auctionId].tokenAddress);
                token.transferFrom(englishAuctions[_auctionId].owner, englishAuctions[_auctionId].highestBidder, englishAuctions[_auctionId].tokenId);
                token.clearApproval( englishAuctions[_auctionId].highestBidder,englishAuctions[_auctionId].tokenId);
                value = englishAuctions[_auctionId].bids[englishAuctions[_auctionId].highestBidder] - englishAuctions[_auctionId].highestBindingBid;
            }  else {
                participant = msg.sender;
                value = englishAuctions[_auctionId].bids[msg.sender];
            }
        }
        participant.transfer(value);
        emit HasFinalized(msg.sender,_auctionId);
    }


    function cancelAuction(uint256 _auctionId) public onlyOwner(_auctionId) {
        AdorableToken token = AdorableToken(englishAuctions[_auctionId].tokenAddress);
        token.clearApproval(englishAuctions[_auctionId].owner,englishAuctions[_auctionId].tokenId);
        englishAuctions [_auctionId].auctionState = State.Canceled;
    }
}
