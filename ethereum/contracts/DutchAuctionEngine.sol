pragma solidity ^0.4.24;
import "./AdorableToken.sol";
import "./SafeMath.sol";
contract DutchAuctionEngine {
    using SafeMath for uint256;
    enum State {Ready, Started, Ended, Canceled}
    event AuctionCreated( address _owner, uint256 _auctionId, uint256 _tokenId);
    event BidPlaced( address _owner, uint256 _auctionId, uint256 _tokenId);
    struct DutchAuction{

        uint256  startingPrice;
        uint256  endingPrice;
        uint256  decrement;
        uint256  duration;
        uint256  tokenId;

        address   owner;
        uint256  startedAt;
        address  winningBidder;
        uint256  winningBid ;

        address  tokenAddress;
        State auctionState;
    }

    DutchAuction[] public dutchAuctions;

    function createDutchAuction(
        address _tokenAddress,
        uint256 _tokenId,
        uint256 _startingPrice,
        uint256 _endingPrice,
        uint256 _offerPriceDecrement,
        uint256 _duration

    ) public {
        AdorableToken token = AdorableToken(_tokenAddress);
        require(token.ownerOf(_tokenId) == msg.sender);

        require(token.getApproved(_tokenId) == address(this));

        uint256 durationTime = block.number + _duration;

        DutchAuction memory dutchAuction = DutchAuction({
            owner: msg.sender,
            tokenAddress: _tokenAddress,
            tokenId: _tokenId,
            startedAt: block.number,
            duration: durationTime,
            offerPriceDecrement : _offerPriceDecrement,
            startingPrice: _startingPrice,
            endingPrice: _endingPrice,
            auctionState: State.Started,
            winningBid: 0,
            winningBidder: address(0)
            });

        uint256 index = dutchAuctions.push(dutchAuction) - 1;

        emit AuctionCreated( dutchAuction.owner, index, dutchAuction.tokenId);

    }
    modifier onlyOwner(uint256 _auctionId){
        require(msg.sender == dutchAuctions[_auctionId].owner);
        _;
    }

    modifier notOwner(uint256  _auctionId){
        require(msg.sender != dutchAuctions[_auctionId].owner);
        _;
    }

    modifier atState(uint256 _auctionId, State _state) {
        require(dutchAuctions[_auctionId].auctionState == _state);
        _;
    }

    function getCurrentTime(uint256 _auctionId) view public returns (uint256){
        return uint256(block.number - dutchAuctions[_auctionId].startedAt);
    }

    function getRemainingTime(uint256 _auctionId) view public returns (uint256){
        return uint256(dutchAuctions[_auctionId].duration-block.number);
    }

    function biddingOpen(uint256 _auctionId) view public returns (bool isOpen) {
        uint256 currentTime = getCurrentTime(_auctionId);
        if (dutchAuctions[_auctionId].winningBid != 0)
            return false;
        return (currentTime >= 0 && currentTime < dutchAuctions[_auctionId].duration);
    }

    function getCurrentPrice(uint256 _auctionId) public view returns (uint256) {
        if (getCurrentTime(_auctionId) >= dutchAuctions[_auctionId].duration ) {
            return dutchAuctions[_auctionId].endingPrice;
        } else {
            int currentPrice  = int(dutchAuctions[_auctionId].startingPrice) - int((getCurrentTime(_auctionId) * dutchAuctions[_auctionId].decrement));
            if(currentPrice <  int(dutchAuctions[_auctionId].endingPrice))
                return dutchAuctions[_auctionId].endingPrice;
            else return uint128(currentPrice);
        }
    }

    function cancelAuction(uint256 _auctionId) public onlyOwner(_auctionId) {
        dutchAuctions[_auctionId].auctionState = State.Canceled;
        AdorableToken token = AdorableToken(dutchAuctions[_auctionId].tokenAddress);
        token.clearApproval( dutchAuctions[_auctionId].owner,dutchAuctions[_auctionId].tokenId);
    }


    function bid(uint256 _auctionId) payable notOwner(_auctionId) atState(_auctionId,State.Started) public returns (bool) {
        if (biddingOpen(_auctionId))
        {
            AdorableToken token = AdorableToken(dutchAuctions[_auctionId].tokenAddress);
            require(msg.value >= getCurrentPrice(_auctionId));
            dutchAuctions[_auctionId].winningBidder = msg.sender;
            dutchAuctions[_auctionId].winningBid = msg.value;
            dutchAuctions[_auctionId].auctionState = State.Ended;
            dutchAuctions[_auctionId].owner.transfer(msg.value);
            token.transferFrom( dutchAuctions[_auctionId].owner,  dutchAuctions[_auctionId].winningBidder,  dutchAuctions[_auctionId].tokenId);
            token.clearApproval( dutchAuctions[_auctionId].winningBidder,dutchAuctions[_auctionId].tokenId);
            emit BidPlaced(msg.sender, _auctionId, dutchAuctions[_auctionId].tokenId);
            return true;
        }

        return false;

    }
}
